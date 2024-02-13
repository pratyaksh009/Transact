import express from "express";
import { UserAuth } from "../Middlewares/UserAuth.js";
import { Account, User } from "../db.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const accountRouter = express.Router();

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
};

// Validate amount input
const validateAmount = (amount) => {
    const numAmount = parseInt(amount, 10);
    return !isNaN(numAmount) && numAmount > 0;
};

accountRouter.get("/balance", UserAuth, async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const account = await Account.findOne({ userId: user._id });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            balance: account.balance,
        });
    } catch (error) {
        next(error);
    }
});

accountRouter.post("/transfer", UserAuth, async (req, res, next) => {
    const { transferFrom, transferTo, amount } = req.body;

    if (!transferTo || !amount) {
        return res.status(400).json({ message: "Transfer data incomplete" });
    }

    if (!validateAmount(amount)) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const fromAccount = await Account.findOne({
            userId: transferFrom,
        }).session(session);

        if (!fromAccount) {
            await session.abortTransaction();
            return res
                .status(404)
                .json({ message: "Sender account not found" });
        }

        if (fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: transferTo }).session(
            session
        );

        if (!toAccount) {
            await session.abortTransaction();
            return res
                .status(404)
                .json({ message: "Recipient account not found" });
        }

        await Account.updateOne(
            { userId: transferFrom },
            { $inc: { balance: -amount } }
        ).session(session);
        await Account.updateOne(
            { userId: transferTo },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();
        res.json({ message: "Transfer Successful" });
    } catch (error) {
        next(error);
    }
});

accountRouter.use(errorHandler);

export { accountRouter };
