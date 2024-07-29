import mongoose from "mongoose";
import { FinishedOptions } from "stream";


// define what the schema will look like
interface FinancialRecord {
    userId: string;
    amount: number;
    date: Date;
    description: string;
    category: string;
    paymentMethod: string;
    imageURL: string;
    publicId: string;
}

// create new schema for mongo to use via mongoose
const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    imageURL: { type: String, required: false },
    publicId: { type: String, required: false },
});

const FinancialRecord = mongoose.model<FinancialRecord>("FinancialRecord", financialRecordSchema);

export default FinancialRecord;
