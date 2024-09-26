var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { beeperCreateUser, beeperListUser, beeperUser, beeperUpdateUser, beeperDeleteUser, beepersByStatusUser } from "../services/beeperService.js";
export const addBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const beeperId = yield beeperCreateUser(name);
        res.status(201).json({ beeperid: beeperId });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add beeper" });
    }
});
export const getAlBeepers = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperList = yield beeperListUser();
        res.status(200).json({ beeperlist: beeperList });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve beepers" });
    }
});
export const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const thisBeeper = yield beeperUser(beeperId);
        if (!thisBeeper) {
            res.status(404).json({ message: "Beeper not found" });
            return;
        }
        res.status(200).json({ thisbeeper: thisBeeper });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve beeper" });
    }
});
export const updateBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const statusBeeper = yield beeperUpdateUser(beeperId);
        if (!statusBeeper) {
            res.status(404).json({ message: "Beeper not found" });
            return;
        }
        res.status(200).send(`Status is updated to ${statusBeeper}`);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update beeper status" });
    }
});
export const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const result = yield beeperDeleteUser(beeperId);
        // if (!result) {
        //     res.status(404).json({ message: "Beeper not found" });
        //     return;
        // }
        res.status(200).send("The beeper removed successfully");
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete beeper" });
    }
});
export const getBeepersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Status = req.params.status;
        const beeperList = yield beepersByStatusUser(Status);
        if (beeperList.length === 0) {
            res.status(404).json({ message: "No beepers found for this status" });
            return;
        }
        res.status(200).json({ beeperlist: beeperList });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve beepers by status" });
    }
});
