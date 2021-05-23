import Group from '../models/group.js';
import db from '../server.js'
import mongoose from 'mongoose';

export const getGroup = async (req, res) => {
    const { id: _id} = req.params;

    const group = await Group.findOne({ _id: mongoose.Types.ObjectId(_id) });
    res.json({ group });
}

export const makeGroup = async (req, res) => {

    const { name, members} = req.body;

    var groups = db.collection("groups")
    
    try {
        const group = await groups.insertOne({ name, members });

        res.json(group.insertedId);

    } catch (error) {
        res.status(500).json({ message : 'Something went wrong'});
    }
}

