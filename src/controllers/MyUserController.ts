import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body
        const user = await User.findOne({ auth0Id });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({
            success: true,
            data: newUser.toObject(),
            message: 'User created successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating user'
        });
    }
};

export default {
    createCurrentUser
};