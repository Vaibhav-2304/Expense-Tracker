import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import AddExpenseDialog from "./components/AddExpenseDialog.jsx";
import EditExpenseDialog from "../../components/EditExpenseDialog.jsx";
import Tile from "../../components/ExpenseList.jsx";
import HamburgerMenu from "./components/Hamburger.jsx";
import DropDownButton from "../../components/DropDownButton.jsx";
import Footer from "../Footer/Footer.jsx";
import Expense from "../../services/expense_api.js";
import DeleteDialog from "../../components/DeleteExpenseDialog.jsx";
import { getImage } from "../../components/category_images";
import {getPastWeekDays, filterData, sortData, getPast7DaysSpending, getCurrentMonthExpenses } from "./components/helper";
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
  const [pastWeekTotal, setPastWeekTotal] = useState(0);
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Amount Spent in last 7 Days (Total : ₹" + pastWeekTotal + ")",
      },
    },
  };

  // const [currentPage, setCurrentPage] = useState(1);
  const [isAddExpenseOpen, setisAddExpenseOpen] = useState(false);
  const [allExpenseData, setAllExpenseData] = useState([]);
  const [currentMonthData , setCurrentMonthData] = useState([]);
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
    const currMonthData = getCurrentMonthExpenses(allExpenseData);
    setCurrentMonthData(currMonthData.list);
    setDisplayData(currMonthData.list);
    setCurrentMonthTotal(currMonthData.total);

    const lastWeekDetail = getPast7DaysSpending(allExpenseData);
    setPastWeekData(lastWeekDetail.list);
    setPastWeekTotal(lastWeekDetail.total);

  }, [allExpenseData]);

  function handleFilter(category){
    let newData = filterData(category, currentMonthData);
    setDisplayData(newData);
  } 

  function handleSort(basedOn){
    let newData = sortData(basedOn, currentMonthData);
    setDisplayData(newData);
  }

  const [expenseToBeDeleted, setExpenseToBeDeleted] = useState(null);
  const [expenseToBeEdited, setExpenseToBeEdited] = useState(null);

  //-------------------------------------------------------------------------------------------------

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
      <div>
        <header className="p-4 text-slate-800 flex items-center justify-between">
          <HamburgerMenu userName="Dummy" />
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-slate-700">
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
              initialOption="All"
              optionList={[
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
              initialOption="Date ( ↓ )"
              optionList={["Date ( ↓ )", "Amount ( ↓ )"]}
              onChange={handleSort}
              label={"Sort By : "}
            />
          </div>

          <span className="flex items-center align-middle justify-center mr-2 text-l text-gray-700 font-semibold">
            Current Month Expense : ₹{currentMonthTotal}
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
                  setExpenseToBeEdited(expense);
              }}
              onDelete={() => {
                setExpenseToBeDeleted(expense);
              }}
            />
          ))}

        </div>
      </div>
      <EditExpenseDialog
        expenseToBeEdited = {expenseToBeEdited}
        setExpenseToBeEdited = {setExpenseToBeEdited}
        setHardRefresh={setHardRefresh}
      />
      <DeleteDialog
        expenseToBeDeleted={expenseToBeDeleted}
        setExpenseToBeDeleted={setExpenseToBeDeleted}
        setHardRefresh={setHardRefresh}
      />
      <AddExpenseDialog
        isOpen={isAddExpenseOpen}
        onClose={closeDialog}
        setHardRefresh={setHardRefresh}
      />
      <Footer />
    </div>
  );
}

export default HomePage;
