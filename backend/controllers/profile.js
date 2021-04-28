import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Profile from '../models/profile.js';

export const signin = async (req, res) =>
{
    const { email, password } = req.body;

    try {
        let existingProfile;
        existingProfile = await Profile.findOne({ email });

        if(!existingProfile) return res.status(404).json({ message: "User doesnt exit"});

        const isPasswordCorrect = await bcrypt.compare(password, existingProfile.password);

        if(!isPasswordCorrect) return res.stats(400).json({ message: "Invalid credentials"});

        const token = jwt.sign({ email: existingProfile.email, id: existingProfile._id}, 'test', { expiresIn: "1h"});

        res.status(200).json( { result: existingProfile, token});
    } catch (error) {
        res.status(500).json({ message : 'Something went wrong'});
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingProfile = await Profile.findOne({ email });

        if(existingProfile) return res.status(400).json({ message: "User already exists"});

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password, 12);
        let result;
        result = await Profile.create({ email, password: hashedPassword, name: `${ firstName } ${ lastName }`});

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: "1h"});

        res.status(200).json( { result: result, token});

    } catch (error) {
        res.status(500).json({ message : 'Something went wrong'});
    }



}