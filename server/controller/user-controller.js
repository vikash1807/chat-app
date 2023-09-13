import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (request, response) => {
    try {
        const { name, email, picture, password } = request.body;
        const oldUser = await User.findOne({ email });
        if (oldUser) return response.status(200).json("User already exists");
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = { name: request.body.name, email: request.body.email, picture: request.body.picture, password: hashedPassword };
        const newUser = new User(user);

        await newUser.save();
        return response.status(200).json("Signup successfull");
    } catch (error) {
        return response.status(500).json("Something went wrong");
    }
};

export const loginUser = async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
        return response.status(200).json("Email does not match");
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY);
            response.status(200).json({ accessToken: accessToken, email: user.email, name: user.name, picture: user.picture });
        } else {
            return response.status(200).json("Password does not match");
        }
    } catch (error) {
        return response.status(500).json("Error while login the user");
    }
}

export const getUsers = async (request, response) => {
    try {
        const user = await User.find({});
        return response.status(200).json(user);

    } catch (error) {
        response.status(500).json(error);
    }
}

