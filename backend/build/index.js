"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const financial_records_1 = __importDefault(require("./routes/financial-records"));
const cors_1 = __importDefault(require("cors"));
// load environment variables from .env file
dotenv_1.default.config();
// create express app
const app = (0, express_1.default)();
// create entry port
const PORT = process.env.PORT || 3000;
// use express.json() to parse the request body
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const MONGODB_URI = process.env.MONGODB_URI;
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    // if there is an error, log it and exit the process
    .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
});
// use the financial records router to make api calls
app.use("/financial-records", financial_records_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
