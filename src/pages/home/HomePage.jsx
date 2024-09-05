import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import TransactionDialog from "./components/TransactionDialog.jsx";
import Tile from "./components/ExpenseList.jsx";
import HamburgerMenu from "./components/Hamburger.jsx";
import DropDownButton from "./components/DropDownButton.jsx";
import Footer from "../Footer/Footer.jsx";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Expense from "../../services/expense_api.js";

import { getImage, getPastWeekDays, options, filterData, sortData, getPast7DaysSpending } from "./components/helper";
import Lottie from "react-lottie-player";
import walletAnimation from "../../assets/wallet.json";

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

function HomePage() {

  const [pastWeekData, setPastWeekData] = useState([0,0,0,0,0,0,0]);

  const data = {
    labels: getPastWeekDays(),
    datasets: [
      {
        label: "Amount(₹)",
        data: pastWeekData,
        backgroundColor: "rgba(2, 6, 23, 0.8)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  // const [currentPage, setCurrentPage] = useState(1);
  const [isAddExpenseOpen, setisAddExpenseOpen] = useState(false);
  const [allExpenseData, setAllExpenseData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [hardRefresh, setHardRefresh] = useState(false);

  const openDialog = () => setisAddExpenseOpen(true);
  const closeDialog = () => setisAddExpenseOpen(false);

  async function fetchData() {
    await new Expense().getExpense().then((allExpense) => {
      setAllExpenseData(allExpense.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, [hardRefresh]);

  useEffect(() => {
    setDisplayData(sortData('Date ( ↓ )', allExpenseData));
    setPastWeekData(getPast7DaysSpending(allExpenseData));
  }, [allExpenseData]);

  function handleFilter(category){
    setDisplayData(filterData(category, allExpenseData));
  } 

  function handleSort(basedOn){
    let newData = sortData(basedOn, allExpenseData);
    console.log(newData);
    setDisplayData(newData);
  }

  //-------------------------------------------------------------------------------------------------

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
      <div>
        <header className="p-4 text-slate-800 flex items-center justify-between">
          <HamburgerMenu />
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold text-slate-700">
              Expense Tracker
            </h1>
            <Lottie
              play
              animationData={walletAnimation}
              loop
              style={{ width: 100, height: 100 }}
              speed={2}
            />
          </div>
          <div className="w-12 h-12"></div>
        </header>
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="w-full md:w-3/4 lg:w-1/2 lg:h-[50vh] bg-white rounded-lg shadow-lg p-4">
          <Bar data={data} options={options} />
        </div>
      </div>

      <div className="flex align-middle items-center justify-center">
        <button
          className="bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline"
          onClick={openDialog}
        >
          Add Expense
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full md:w-3/4 lg:w-3/5 bg-white rounded-lg shadow-lg mx-2">
          <div className="flex flex-col sm:flex-row sm:justify-between m-2">
            <DropDownButton
              options={[
                "All",
                "food",
                "transport",
                "entertainment",
                "health",
                "groceries",
                "bills",
              ]}
              onChange={handleFilter}
              label={"Filter Category : "}
            />

            <DropDownButton
              options={["Date ( ↓ )", "Amount ( ↓ )"]}
              onChange={handleSort}
              label={"Sort By : "}
            />
          </div>

          <span className="flex items-center align-middle justify-center mr-2 text-l text-gray-700 font-semibold">
            Current Month Expense
          </span>

          {displayData.map((expense, idx) => (
            <Tile
              key={expense._id} // Assuming each expense has a unique `id`
              index={idx+1}
              imageSrc={getImage(expense.category)} // Replace with a valid image source
              title={expense.title}
              amount={expense.amount}
              date = {expense.date}
              onEdit={() => {
                // Implement the edit functionality here
              }}
              onDelete={() => {
                // Implement the delete functionality here
              }}
            />
          ))}

          {/* <div className="flex items-center align-middle justify-center mb-4">
            <Pagination
              pageSize={5}
              onChange={() => {}}
              current={currentPage}
              total={10}
              prevIcon={<span className="text-gray-700">{"<"}</span>}
              nextIcon={<span className="text-gray-700">{">"}</span>}
            />
          </div> */}
        </div>
      </div>

      <TransactionDialog
        isOpen={isAddExpenseOpen}
        onClose={closeDialog}
        setHardRefresh={setHardRefresh}
      />
      <Footer />
    </div>
  );
}

export default HomePage;
