import { userSchema } from "./Zod/UserModel.js";

export function ValidateUser(req, res, next) {
    const userInput = {
        userId: req.body.email,
        password: req.body.password,
        userName: `${req.body.firstName} ${req.body.lastName}`,
    };

    const validation = userSchema.safeParse(userInput);
    if (!validation.success) {
        console.log("Invalid credentials:", validation.error.errors);
        res.status(400).send("Invalid user credentials");
        return;
    } else {
        next();
    }
}
