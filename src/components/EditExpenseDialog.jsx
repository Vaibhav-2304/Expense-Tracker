import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DropDownButton from "./DropDownButton.jsx";
import Expense from "../services/expense_api.js";

var categoryOptions = [
  "food",
  "transport",
  "entertainment",
  "health",
  "groceries",
  "bills",
];

function formatDateToDDMMYYYY(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}


const EditExpenseDialog = ({ expenseToBeEdited, setExpenseToBeEdited, setHardRefresh }) => {
  // Initialize state with the values from expenseToBeEdited or default values
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("food");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Use useEffect to update the state when expenseToBeEdited changes
  useEffect(() => {
    if (expenseToBeEdited) {
      setDate(expenseToBeEdited.date.split("-").reverse().join("-"));
      setTitle(expenseToBeEdited.title);
      setAmount(expenseToBeEdited.amount);
      setCategory(expenseToBeEdited.category);
    }
  },[expenseToBeEdited]);

  const handleEdit = async () => {
    let newDate = formatDateToDDMMYYYY(date);

    await new Expense().updateExpense(expenseToBeEdited._id, title, newDate, amount, category).then(() => {
      setHardRefresh((prev) => !prev); // Refresh the data
      setExpenseToBeEdited(null); // Close the dialog after adding
    });
  };

  const handleClose = () => {
    setExpenseToBeEdited(null);
  };

  if (expenseToBeEdited == null) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-8">
        <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., Grocery Shopping"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date of Transaction
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., 50.00"
          />
        </div>
        <div className="mb-4">
          <DropDownButton initialOption={expenseToBeEdited.category} optionList={categoryOptions} onChange={setCategory} label={"Select Category : "} />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleEdit}
            className="bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
EditExpenseDialog.propTypes = {
    expenseToBeEdited: PropTypes.any,
    setExpenseToBeEdited: PropTypes.func.isRequired,
  setHardRefresh: PropTypes.func.isRequired,
};

export default EditExpenseDialog;
