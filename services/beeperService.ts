import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonBeeper.js";
import { v4 as uuidv4 } from "uuid";
import { BeeperStatus } from "../lists - enums/statusEnum.js";
import { Beeper } from "../models/types.js";
import { DateTime } from 'luxon';

import { time } from "console";
import { stat } from "fs";



export const beeperCreateUser = async(name: string):Promise<string> => {
    const beepers: Beeper[] = await readFromJsonFile();

    const beeperId: string = uuidv4();
    const creationTime: Date = DateTime.now().toJSDate();
    const status: string = BeeperStatus[BeeperStatus.manufactured];
    
    
    const newBeeper:Beeper = {
        name,
        id: beeperId,
        status: status,
        creationTime: creationTime
    }

    beepers.push(newBeeper);

    await writeUserToJsonFile(beepers);
    return(newBeeper.id)
};


export const beeperListUser = async (): Promise<Beeper[]> => {
    const beepers: Beeper[] = await readFromJsonFile();

    return beepers;
};


export const beeperUser = async (id: string): Promise<Beeper> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeper = beepers.find((b) => b.id === id);
    if(!beeper){
      throw new Error("beeper not found.");
    }
    return beeper;
};


export const beeperUpdateUser = async(id: string): Promise<string | null> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeper = beepers.find((b) => b.id === id);
    if(!beeper){
        return null;
      }
    
      beeper.status = BeeperStatus.deployed as unknown as string; // Type assertion to string
    
    await writeUserToJsonFile(beepers);

    const status: BeeperStatus = BeeperStatus.manufactured;
    
    return status.toString();
};


export const beeperDeleteUser = async(id: string): Promise<void> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeper = beepers.findIndex((b) => b.id === id);
    if(!beeper){
        throw new Error("beeper not found.");
      }

    beepers.splice(beeper, 1);
    
    await writeUserToJsonFile(beepers);
};


export const beepersByStatusUser = async(status: string): Promise<Beeper[]> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beepersByStatus = beepers.filter((b) => b.status === status);
    if(beepersByStatus.length === 0){
      throw new Error("beepers not found.");
    }
    return beepersByStatus;
};
