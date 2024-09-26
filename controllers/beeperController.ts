import { Request, Response } from "express";
import { beeperCreateUser, beeperListUser, beeperUser, beeperUpdateUser, beeperDeleteUser, beepersByStatusUser} from "../services/beeperService.js";
import { Beeper } from "../models/types.js";

// addBeeper, 
export const addBeeper = async(req: Request, res: Response):Promise<void> => {
    const {name} = req.body;
    
    const beeperId = await beeperCreateUser(name);
    res.status(201).json({beeperid: beeperId})
}


// getAlBeepers, 
export const getAlBeepers = async(req: Request, res: Response):Promise<Beeper[]|undefined> =>{
    const beeberList = await beeperListUser();
    res.status(200).json({beeberlist: beeberList})
}

// getBeeper, 
export const getBeeperById = async(req: Request, res: Response):Promise<void> =>{
    const beeperId = req.params.id;
    
    const thisBeeber = await beeperUser(beeperId);
    res.status(200).json({thisbeeber: thisBeeber})
}


// updateBeeper, 
export const updateBeeper = async(req: Request, res: Response):Promise<void> => {
    const beeperId = req.params.id;

    const statusBeeper = await beeperUpdateUser(beeperId);
    res.status(200).send("Status is updated to ${statusBeeper}")
}

// deleteBeeper, 
export const deleteBeeper = async(req: Request, res: Response):Promise<void> => {
    const beeperId = req.params.id;

    await beeperDeleteUser(beeperId);
    res.status(200).send("The beeper removed successful")
} 

// getBeepersByStatus 
export const getBeepersByStatus = async(req: Request, res: Response):Promise<Beeper[]|undefined> =>{
    const Status = req.params.status;

    const BeeberList = await beepersByStatusUser(Status);
    res.status(200).json({Beeberlist: BeeberList})
}
