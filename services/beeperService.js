var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonBeeper.js";
import { v4 as uuidv4 } from "uuid";
import { BeeperStatus } from "../lists - enums/statusEnum.js";
import { DateTime } from 'luxon';
export const beeperCreateUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperId = uuidv4();
    const creationTime = DateTime.now().toJSDate();
    const status = BeeperStatus[BeeperStatus.manufactured];
    const newBeeper = {
        name,
        id: beeperId,
        status: status,
        creationTime: creationTime
    };
    beepers.push(newBeeper);
    yield writeUserToJsonFile(beepers);
    return (newBeeper.id);
});
export const beeperListUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    return beepers;
});
export const beeperUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeper = beepers.find((b) => b.id === id);
    if (!beeper) {
        throw new Error("beeper not found.");
    }
    return beeper;
});
export const updateBeeperStatusToDetonated = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeper = beepers.find((b) => b.id === id);
    if (beeper) {
        beeper.status = BeeperStatus.detonated.toString();
        beeper.explodingTime = new Date();
        yield writeUserToJsonFile(beepers);
    }
});
export const beeperUpdateUser = (id, lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeper = beepers.find((b) => b.id === id);
    if (!beeper) {
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
    yield writeUserToJsonFile(beepers);
    return beeper.status.toString();
});
export const beeperDeleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeper = beepers.findIndex((b) => b.id === id);
    if (!beeper) {
        throw new Error("beeper not found.");
    }
    beepers.splice(beeper, 1);
    yield writeUserToJsonFile(beepers);
});
export const beepersByStatusUser = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beepersByStatus = beepers.filter((b) => b.status === status);
    if (beepersByStatus.length === 0) {
        throw new Error("beepers not found.");
    }
    return beepersByStatus;
});
