// this is the apps state manager for all functions that alter their state

import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
    // get the mongodb id
    _id?: string;
    userId: string;
    amount: number;
    date: Date;
    description: string;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordsContextType {
    // create an array to store the records
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}

// create context to store the records
export const FinancialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined);



// create a provider to wrap the app in
export const FinancialRecordsProvider = ({ children }: { children: React.ReactNode }) => {
    // create a state to store the records
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const { user } = useUser();

    const fetchRecords = async () => {
        if (!user) return;
        const response = await fetch(
            `http://localhost:3000/financial-records/getAllByUserID/${user.id}`
        );
    
        if (response.ok) {
            const records = await response.json();
            console.log(records);
            setRecords(records);
        }
        };
    
        useEffect(() => {
        fetchRecords();
        }, [user]);

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch(`http://localhost:3000/financial-records/`, {
            method: "POST",
            // convert the record to a json string so it can be sent to express
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
            
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                console.log(records);
                // ...prev spreads previos arraey emelments inot a new one 
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };

    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
        const response = await fetch(
            `http://localhost:3000/financial-records/${id}`,
            {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
    
        try {
            if (response.ok) {
            const newRecord = await response.json();
            setRecords((prev) =>
                prev.map((record) => {
                if (record._id === id) {
                    return newRecord;
                } else {
                    return record;
                }
                })
            );
            }
        } catch (err) {}
        };
    
        const deleteRecord = async (id: string) => {
        const response = await fetch(
            `http://localhost:3000/financial-records/${id}`,
            {
            method: "DELETE",
            }
        );
    
        try {
            if (response.ok) {
            const deletedRecord = await response.json();
            setRecords((prev) =>
                prev.filter((record) => record._id !== deletedRecord._id)
            );
            }
        } catch (err) {}
        };
    
    // return the provider
    return (
        <FinancialRecordsContext.Provider value={{records, addRecord, updateRecord, deleteRecord}}>
            {children}
        </FinancialRecordsContext.Provider>
    )
}
// create a hook to use the context
export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(
        FinancialRecordsContext
    );

    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider");
    }

    return context;
};

