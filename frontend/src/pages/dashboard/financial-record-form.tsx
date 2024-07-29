import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";


export const FinancialRecordForm = () => {

    // get value of user input
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const {addRecord } = useFinancialRecords();

        
    const { user } = useUser();
        
    // handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // create new record object
        const newRecord = {
          userId: user?.id ?? "",
          date: new Date(),
          description: description,
          //convert amount to float
          amount: parseFloat(amount),
          category: category,
          paymentMethod: paymentMethod,
        };
        //call server and add new record to database
        addRecord(newRecord);

        //clear form
        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");
}
  // build form to add info
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Description:</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Category:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Grocery">Grocery</option>
            <option value="Restuarant">Restuarant</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Insurance">Insurance</option>
            <option value="Loan Repayments">Loan Repayments</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label>Payment Method:</label>
          <select
            required
            className="input"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Bank AutoPay">Bank AutoPay</option>
          </select>
        </div>
        <div>
        <button type="button" className="button">
          Add Image
        </button>
        <button type="button" className="button">
          Add Location
        </button>
        </div>
        <div>
        <button type="submit" className="button2">
          Add To MERNMoney
        </button>
        
        

        </div>
      </form>
    </div>
  );
};
