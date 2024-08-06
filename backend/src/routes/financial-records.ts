import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";
import SharedAccessModel from "../schema/shared-access";

// create 
const router = express.Router();

// use a peram to get all financial records by user id
router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const requesterId = req.headers['requester-id'] as string;

        if (userId !== requesterId) {
            const sharedAccess = await SharedAccessModel.findOne({ ownerId: userId, sharedWithId: requesterId });
            if (!sharedAccess) {
                return res.status(403).send("Access denied");
            }
        }

        const records = await FinancialRecordModel.find({ userId: userId });
        if (records.length === 0) {
            return res.status(404).send("No records found for this user");
        } 
        // send 200 if user has records
        res.status(200).send(records);
    } catch (error) {
        // send 500 is there is a service error
        res.status(500).send(error);
    }

});

router.post("/", async (req: Request, res: Response) => {
    try {
        // get the record body object
        const newRecordBody = req.body
        // create a new record
        const newRecord = new FinancialRecordModel(newRecordBody);
        // save the record
        const savedRecord = await newRecord.save();
        // send the saved record
        res.status(200).send(savedRecord);
    } catch (error) {
        // send 500 if there is a service error
        res.status(500).send(error);
    }
});

// use a peram to update a financial record by id
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await FinancialRecordModel.findByIdAndUpdate(
        id,
        newRecordBody,
        { new: true }
        );

        if (!record) return res.status(404).send();
    
        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(id);
        if (!record) return res.status(404).send();
        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;