import express, { json } from "express";
import bcrypt from "bcrypt";
import { Account, User } from "../db.js";
import { ValidateUser } from "../Middlewares/ValidateUser.js";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
// import dotenv from "dotenv";
import { UserAuth } from "../Middlewares/UserAuth.js";

// Load environment variables from .env file
// dotenv.config();

const router = express.Router();
// router.use(cors());
router.use(json());
const JWT_SECRET = config.JWT_SECRET;
// --------------------------------------------------------------------------------------------sign-in------------------------------------------------------------------------------

router.post("/sign-in", async (req, res) => {
    const userId = req.body.email;
    const password = req.body.password;

    try {
        // Find the user by userId
        const user = await User.findOne({ userId });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Passwords match, proceed with sign-in logic

            // Generate a JWT token
            const token = jwt.sign(
                { userId: user.userId },
                JWT_SECRET // Use the JWT_SECRET from your environment variables
            );

            // Send the token in the response
            res.status(200).json({
                message: "Sign-in successful",
                token: token,
            });
        } else {
            // Passwords do not match
            return res.status(401).json({ message: "Password does not match" });
        }
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// -------------------------------------------------------------------------------------------sign-up-------------------------------------------------------------------------------

router.post("/sign-up", ValidateUser, async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userId = req.body.email;
    const password = req.body.password;

    // const userName = `${req.body.firstName} ${req.body.lastName}`;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists / invalid input" });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            userId,
            firstName,
            lastName,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // initialising some dummy balance at every  sign-up
        const accountUserId = newUser._id;
        await Account.create({
            userId: accountUserId,
            balance: 1 + Math.random() * 10000,
        });

        // ---------------------------------------another method for creating an entry--------------------------------------------------------------------------------------
        //    const user = await User.create({
        //        username: req.body.username,
        //        password: req.body.password,
        //        firstName: req.body.firstName,
        //        lastName: req.body.lastName,
        //    });

        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        const token = jwt.sign(
            {
                userId: newUser.userId,
            },
            JWT_SECRET
        );
        res.status(201).json({
            message: "User registered successfully",
            token: token,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ---------------------------------------------------------------------------------update-username----------------------------------------------------------------------------------------

router.put("/update-username", UserAuth, async (req, res) => {
    const userId = req.body.email;
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;

    try {
        // Find the user by userId
        const user = await User.findOne({ userId });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's firstName and lastName in the database
        await User.updateOne(
            { userId },
            { $set: { firstName: newFirstName, lastName: newLastName } }
        );

        res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
        console.error("Error updating username:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ---------------------------------------------------------------------------update-password-----------------------------------------------------------------------------------------------

router.put("/update-password", UserAuth, async (req, res) => {
    // Implement password update logic
    const userId = req.body.email;
    const newPassword = req.body.password;

    try {
        // Find the user by userId
        const user = await User.findOne({ userId });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password before updating it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await User.updateOne(
            { userId },
            { $set: { password: hashedPassword } }
        );

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
//    -----------------------------------------------get users -----------------------------------------------------
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || ""; //we take the input through query params

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                },
            },
            {
                lastName: {
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user.userId,
            _id: user._id,
        })),
    });
});

// -------------------------------------------info-------------------------------------------------------------

router.get("/currentInfo", UserAuth, async (req, res) => {
    const userId = req.userId;
    // console.log("in INFO userID is : " + userId);
    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log("INFO user : " + user);

        res.json(user);
    } catch (e) {
        console.log(e);
    }
});

router.get("/info", UserAuth, async (req, res) => {
    const _id = req.query._id;
    const firstName = req.query.firstName;
    try {
        const user = await User.findOne({ _id, firstName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (e) {
        console.log(e);
    }
});

export { router as userRouter };
