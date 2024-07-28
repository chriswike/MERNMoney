"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financial_record_1 = __importDefault(require("../schema/financial-record"));
// create 
const router = express_1.default.Router();
// use a peram to get all financial records by user id
router.get("/getAllByUserId/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const records = yield financial_record_1.default.find({ userId: userId });
        if (records.length === 0) {
            return res.status(404).send("No records found for this user");
        }
        // send 200 if user has records
        res.status(200).send(records);
    }
    catch (error) {
        // send 500 is there is a service error
        res.status(500).send(error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the record body object
        const newRecordBody = req.body;
        // create a new record
        const newRecord = new financial_record_1.default(newRecordBody);
        // save the record
        const savedRecord = yield newRecord.save();
        // send the saved record
        res.status(200).send(savedRecord);
    }
    catch (error) {
        // send 500 if there is a service error
        res.status(500).send(error);
    }
}));
// use a peram to update a financial record by id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = yield financial_record_1.default.findByIdAndUpdate(id, newRecordBody, { new: true });
        if (!record)
            return res.status(404).send();
        res.status(200).send(record);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const record = yield financial_record_1.default.findByIdAndDelete(id);
        if (!record)
            return res.status(404).send();
        res.status(200).send(record);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = router;
