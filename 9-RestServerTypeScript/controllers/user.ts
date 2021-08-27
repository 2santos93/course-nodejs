import { Request, Response } from "express";
import User from "../models/User";

const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if(!user) res.status(400).json({error:"user not found"}); 
    res.json({user});
}

const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    return res.json({users});
}

const createUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
console.log(email)
    const user = new User({email, password});
    await user.save();

    res.json({message: 'createUser'});
}

const updateUser = async(req: Request, res: Response) => {

    const {id} = req.params;
    const {password, email} = req.body;

    const user = await User.findByPk(id);

    await user?.update({password, email});

    res.json({user});
}

const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    await User.destroy({
        where: {
            id
        }
    })
    res.json({message: 'deleted user'});
}

export {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};