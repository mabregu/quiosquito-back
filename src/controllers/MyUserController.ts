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

const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;

        await user.save();
        
        res.send(user);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: 'Error updating user'
        });
    }
}

export default {
    createCurrentUser,
    updateCurrentUser
};