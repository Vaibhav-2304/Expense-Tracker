import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Footer from "../Footer/Footer";
import Expense from "../../services/expense_api";
import DropDownButton from "../../components/DropDownButton";
import Tile from "./components/Tile";

import {
  getPast5Years,
  getSpendingLast5Years,
  filterExpensesByYear
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

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function PreviousYearDataPage() {
  const [allExpenseData, setAllExpenseData] = useState([]);
  const [past5YearData, setPast5YearData] = useState([0, 0, 0, 0, 0]);
  const [displayData, setDisplayData] = useState([]);
  const [dropDownOptions, setDropDownOptions] = useState([]);

  async function fetchData() {
    await new Expense().getExpense().then((allExpense) => {
      setAllExpenseData(allExpense.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPast5YearData(getSpendingLast5Years(allExpenseData));

    const temp = [...getPast5Years()].reverse();
    setDropDownOptions(temp);

    console.log(temp[0]);

    setDisplayData(filterExpensesByYear(allExpenseData, temp[0]));

  }, [allExpenseData]);

  const data = {
    labels: getPast5Years(),
    datasets: [
      {
        label: "Amount(₹)",
        data: past5YearData,
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
          "Amount Spent in last 5 Years",
      },
    },
  };

  function handleFilter(monthName) {
    setDisplayData(filterExpensesByYear(allExpenseData, monthName));
  }

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
        <div>
          <h1 className="flex items-center align-middle justify-center text-2xl font-semibold text-slate-700 pt-4 mx-4">
            Expense Tracker : Previous Years Data
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
                  label={"Filter by year : "}
                />
              )}
            </div>

            {displayData.map((amount, idx) => (
              <Tile
                key={idx} // Assuming each expense has a unique `id`
                index={idx + 1}
                monthName={months[idx]}
                totalAmount={amount}               
              />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default PreviousYearDataPage;
