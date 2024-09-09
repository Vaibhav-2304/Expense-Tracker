import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Footer from "../Footer/Footer";
import Expense from "../../services/expense_api";
import Tile from "../../components/ExpenseList";
import DropDownButton from "../../components/DropDownButton";
import EditExpenseDialog from "../../components/EditExpenseDialog.jsx";
import DeleteDialog from "../../components/DeleteExpenseDialog.jsx";
import { getImage } from "../../components/category_images";
import {
  getPastMonthsPrefixes,
  getPast12MonthsSpending,
  filterDataByMonth
} from "./components/helper";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PreviousMonthDataPage() {
  const [allExpenseData, setAllExpenseData] = useState([]);
  const [past12MonthsSpending, setPast12MonthsSpending] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [past12MonthsTotal, setpast12MonthsTotal] = useState(0);
  const [pastMonthList, setPastMonthList] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [expenseToBeDeleted, setExpenseToBeDeleted] = useState(null);
  const [expenseToBeEdited, setExpenseToBeEdited] = useState(null);
  const [hardRefresh, setHardRefresh] = useState(false);
  const [dropDownOptions, setDropDownOptions] = useState([]);

  async function fetchData() {
    await new Expense().getExpense().then((allExpense) => {
      setAllExpenseData(allExpense.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, [hardRefresh]);

  useEffect(() => {
    const graphData = getPast12MonthsSpending(allExpenseData);
    setPast12MonthsSpending(graphData.list);
    setpast12MonthsTotal(graphData.total);

    const past12MonthList = getPastMonthsPrefixes();
    setPastMonthList(past12MonthList);

    const reversedData = [...past12MonthList].reverse();
    setDropDownOptions(reversedData);

    setDisplayData(filterDataByMonth(reversedData[0], allExpenseData));
  }, [allExpenseData]);

  const data = {
    labels: pastMonthList,
    datasets: [
      {
        label: "Amount(₹)",
        data: past12MonthsSpending,
        backgroundColor: "rgba(2, 6, 23, 0.8)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          "Amount Spent in last 12 Months (Total : ₹" + past12MonthsTotal + ")",
      },
    },
  };

  function handleFilter(monthName) {
    setDisplayData(filterDataByMonth(monthName, allExpenseData));
  }

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
        <div>
          <h1 className="flex items-center align-middle justify-center text-2xl font-semibold text-slate-700 pt-4 mx-4">
            Expense Tracker : Previous Months Data
          </h1>
        </div>

        <div className="flex justify-center items-center p-4">
          <div className="w-full md:w-3/4 lg:w-1/2 lg:h-[50vh] bg-white rounded-lg shadow-lg p-4">
            <Bar data={data} options={options} />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full md:w-3/4 lg:w-3/5 bg-white rounded-lg shadow-lg mx-2">
            <div className="m-2">
              {dropDownOptions.length > 0 && (
                <DropDownButton
                  initialOption={dropDownOptions[0]}
                  optionList={dropDownOptions}
                  onChange={handleFilter}
                  label={"Filter by month : "}
                />
              )}
            </div>

            {displayData.map((expense, idx) => (
              <Tile
                key={expense._id} // Assuming each expense has a unique `id`
                index={idx + 1}
                imageSrc={getImage(expense.category)} // Replace with a valid image source
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
                onEdit={() => {
                  setExpenseToBeEdited(expense);
                }}
                onDelete={() => {
                  setExpenseToBeDeleted(expense);
                }}
              />
            ))}
          </div>
        </div>

        <Footer />
        <EditExpenseDialog
          expenseToBeEdited={expenseToBeEdited}
          setExpenseToBeEdited={setExpenseToBeEdited}
          setHardRefresh={setHardRefresh}
        />
        <DeleteDialog
          expenseToBeDeleted={expenseToBeDeleted}
          setExpenseToBeDeleted={setExpenseToBeDeleted}
          setHardRefresh={setHardRefresh}
        />
      </div>
    </>
  );
}

export default PreviousMonthDataPage;
