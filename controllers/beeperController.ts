import { Request, Response } from "express";
import { beeperCreateUser, beeperListUser, beeperUser, beeperUpdateUser, beeperDeleteUser, beepersByStatusUser} from "../services/beeperService.js";
import { Beeper } from "../models/types.js";


export const addBeeper = async(req: Request, res: Response):Promise<void> => {
    try{
        const {name} = req.body;
    
        const beeperId = await beeperCreateUser(name);
        res.status(201).json({beeperid: beeperId})
    } catch (error){
        res.status(500).json({message: "Failed to add beeper"});
    }
}


export const getAlBeepers = async(res: Response):Promise<void> =>{
    try {
        const beeperList = await beeperListUser();
        res.status(200).json({ beeperlist: beeperList });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve beepers" });
    }
}


export const getBeeperById = async(req: Request, res: Response):Promise<void> =>{
    try{
        const beeperId = req.params.id;
    
        const thisBeeper = await beeperUser(beeperId);
        if(!thisBeeper){
            res.status(404).json({message: "Beeper not found"});
            return;
        }
        res.status(200).json({thisbeeper: thisBeeper})
    } catch (error){
        res.status(500).json ({message: "Failed to retrieve beeper"});
    }
}


export const updateBeeper = async(req: Request, res: Response):Promise<void> => {
    try {
        const beeperId = req.params.id;
        const statusBeeper = await beeperUpdateUser(beeperId);
        if (!statusBeeper) {
            res.status(404).json({ message: "Beeper not found" });
            return
        }
        res.status(200).send(`Status is updated to ${statusBeeper}`);
        
    } catch (error) {
        res.status(500).json({ message: "Failed to update beeper status" });
    }
}


export const deleteBeeper = async(req: Request, res: Response):Promise<void> => {
    try{
        const beeperId = req.params.id;
        const result = await beeperDeleteUser(beeperId);
        // if (!result) {
        //     res.status(404).json({ message: "Beeper not found" });
        //     return;
        // }
        res.status(200).send("The beeper removed successfully")
    } catch (error) {
        res.status(500).json({message: "Failed to delete beeper"});
    }
} 

export const getBeepersByStatus = async(req: Request, res: Response):Promise<void> =>{
    try{
        const Status = req.params.status;

        const beeperList = await beepersByStatusUser(Status);
        if (beeperList.length === 0) {
            res.status(404).json({ message: "No beepers found for this status" });
            return;
        }
        res.status(200).json({beeperlist: beeperList})
    } catch (error) {
        res.status(500).json({message: "Failed to retrieve beepers by status"});
    }
}
