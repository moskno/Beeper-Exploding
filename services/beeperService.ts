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

export const updateBeeperStatusToDetonated = async (id: string): Promise<void> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeper = beepers.find((b) => b.id === id);
    
    if (beeper) {
        beeper.status = BeeperStatus.detonated.toString();
        beeper.explodingTime = new Date(); 
        await writeUserToJsonFile(beepers);
    }
};

export const beeperUpdateUser = async(id: string, lat?: number, lon?: number): Promise<string | null> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeper = beepers.find((b) => b.id === id);
    if(!beeper){
        return null;
      }
    
      switch (beeper.status) {
        case BeeperStatus.manufactured.toString():
            beeper.status = BeeperStatus.assembled.toString();
            break;
        case BeeperStatus.assembled.toString():
            beeper.status = BeeperStatus.shipped.toString();
            break;
        case BeeperStatus.shipped.toString():
            beeper.status = BeeperStatus.deployed.toString();
            break;
        case BeeperStatus.deployed.toString():
            if (lat !== undefined && lon !== undefined) {
                beeper.latitude = lat;
                beeper.longitude = lon;
            }
            break;
        default:
            return null;
    }    
    await writeUserToJsonFile(beepers);    
    return beeper.status.toString();
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
