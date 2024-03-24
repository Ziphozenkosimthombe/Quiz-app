import express from 'express';
import {getUsers, deleteUserById} from '../models/User.models';


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        
        const users = await getUsers();
        console.log(users)
        return res.status(200).json({ message: users });
    } catch (error) {
        console.log(`Error on getting all users: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
       await deleteUserById(id)
        res.status(200).json({ message: 'User deleted successfully' });
        
    } catch (error) {
        console.log(`Error on deleting user: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}