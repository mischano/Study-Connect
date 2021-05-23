import Group from '../models/group.js';

export const getGroup = async (req, res) => {
    const { id: _id} = req.params;

    const group = await Group.findOne({ _id: mongoose.Types.ObjectId(_id) });
    res.json({ group });
}

