export var BeeperStatus;
(function (BeeperStatus) {
    BeeperStatus[BeeperStatus["manufactured"] = 0] = "manufactured";
    BeeperStatus[BeeperStatus["assembled"] = 1] = "assembled";
    BeeperStatus[BeeperStatus["shipped"] = 2] = "shipped";
    BeeperStatus[BeeperStatus["deployed"] = 3] = "deployed";
    BeeperStatus[BeeperStatus["detonated"] = 4] = "detonated";
})(BeeperStatus || (BeeperStatus = {}));
