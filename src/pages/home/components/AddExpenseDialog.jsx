import { useState } from "react";
import PropTypes from "prop-types";
import DropDownButton from "../../../components/DropDownButton.jsx";
import Expense from "../../../services/expense_api";

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


const AddExpenseDialog = ({ isOpen, onClose, setHardRefresh}) => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("food");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();

  const handleAdd = async () => {
    let newDate = formatDateToDDMMYYYY(date)
    await new Expense().addExpense(title, newDate, amount, category).then(() => {
      setHardRefresh((prev) => !prev); // Refresh the data
      onClose(); // Close the dialog after adding
    });
  };

  if (!isOpen) return null; // If the dialog is not open, don't render it

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-8">
        <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
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
          <DropDownButton initialOption={categoryOptions[0]} optionList={categoryOptions} onChange={setCategory} label={"Select Category : "}/>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

AddExpenseDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setHardRefresh: PropTypes.func.isRequired,
};

export default AddExpenseDialog;
