import PropTypes from "prop-types";
import Expense from "../services/expense_api";

const DeleteDialog = ({
  expenseToBeDeleted,
  setExpenseToBeDeleted,
  setHardRefresh,
}) => {
  if (expenseToBeDeleted == null) {
    return null;
  }

  const handleDelete = async () => {
    await new Expense().deleteExpense(expenseToBeDeleted._id).then(() => {
      setHardRefresh((prev) => !prev); // Refresh the data
      setExpenseToBeDeleted(null); // Close the dialog
    });
  };

  const handleClose = () => {
    setExpenseToBeDeleted(null); // Close the dialog
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl transform scale-105 m-8">
        <div className="p-2 flex-grow border-2 border-slate-700 rounded-lg shadow-lg mb-4">
          <div className="flex justify-start">
            <h3 className="text-xl font-bold">{expenseToBeDeleted.title} : </h3>
            <div className="w-4"></div>
            <p className="text-gray-600 text-lg font-semibold">₹{expenseToBeDeleted.amount}</p>
          </div>
          <p className="text-gray-600 text-lg font-semibold mt-2">{expenseToBeDeleted.date}</p>
        </div>
        <p className="mb-4">Are you sure you want to <span className="font-semibold">DELETE</span> this item?</p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteDialog.propTypes = {
  expenseToBeDeleted: PropTypes.any,
  setExpenseToBeDeleted: PropTypes.func.isRequired,
  setHardRefresh: PropTypes.func.isRequired,
};

export default DeleteDialog;
