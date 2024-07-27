import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";

export const Dashboard = () => {
    // get users name from clerk
    const {user} = useUser(); 
    return <div className="dashboard-container">
        <h1>Welcome to MERNMoney {user?.firstName}! </h1>
        <FinancialRecordForm />
        <FinancialRecordList />
    </div>
};