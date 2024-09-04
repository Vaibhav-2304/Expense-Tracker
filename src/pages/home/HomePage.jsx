import { useEffect, useState } from "react";
import expenseData from "./components/data.json";
import { Bar } from "react-chartjs-2";
import TransactionDialog from "./components/TransactionDialog";
import Tile from "./components/ExpenseList";
import HamburgerMenu from "./components/Hamburger";
import DropDownButton from "./components/DropDownButton";
import Footer from "../Footer/Footer";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import billImage from "./../../assets/bill.png";
import entertainmentImage from "./../../assets/entertainment.png";
import foodImage from "./../../assets/food.png";
import grocriesImage from "./../../assets/grocries.png";
import healthImage from "./../../assets/health.png";
import transportImage from "./../../assets/transport.png";

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

function getImage(category) {
  if (category == "bill") {
    return billImage;
  }
  if (category == "entertainment") {
    return entertainmentImage;
  }
  if (category == "food") {
    return foodImage;
  }
  if (category == "grocries") {
    return grocriesImage;
  }
  if (category == "health") {
    return healthImage;
  }
  if (category == "transport") {
    return transportImage;
  }
}

function getPastWeekDays() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const currentDay = today.getDay(); // Get the current day index (0-6)

  const result = [];

  for (let i = 0; i < 7; i++) {
    // Calculate the day index for each day in the past week
    const dayIndex = (currentDay - i + 7) % 7;
    result.push(daysOfWeek[dayIndex]);
  }

  result.reverse();

  return result;
}

function HomePage() {
  const data = {
    labels: getPastWeekDays(),
    datasets: [
      {
        label: "Amount($)",
        data: [10, 2.5, 12, 15, 60, 25, 20],
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
        text: "Amount Spent in last 7 Days",
      },
    },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [isAddExpenseOpen, setisAddExpenseOpen] = useState(false);

  const openDialog = () => setisAddExpenseOpen(true);
  const closeDialog = () => setisAddExpenseOpen(false);

  useEffect(() => {
    console.log(expenseData.length);
  }, []);

  //-------------------------------------------------------------------------------------------------

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
      <div>
        <header className="p-4 text-slate-800 flex items-center justify-between">
          <HamburgerMenu />
          <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
            Expense Tracker
          </h1>
          <div className="w-12 h-12"></div>
        </header>
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="w-full md:w-3/4 lg:w-1/2 lg:h-[50vh] bg-white rounded-lg shadow-lg p-4 ">
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
              onChange={() => {}}
              label={"Filter Category : "}
            />
            <DropDownButton
              options={["Date", "Amount"]}
              onChange={() => {}}
              label={"Sort By : "}
            />
          </div>

          <span className="flex items-center align-middle justify-center mr-2 text-l text-gray-700 font-semibold">
            Current Month Expense
          </span>

          {expenseData.map((expense, idx) => (
            <Tile
              key={expense.id} // Assuming each expense has a unique `id`
              index={idx+1}
              imageSrc={getImage(expense.category)} // Replace with a valid image source
              title={expense.title}
              amount={expense.amount}
              onEdit={() => {
                // Implement the edit functionality here
              }}
              onDelete={() => {
                // Implement the delete functionality here
              }}
            />
          ))}

          <div className="flex items-center align-middle justify-center mb-4">
            <Pagination
              pageSize={5}
              onChange={() => {}}
              current={currentPage}
              total={10}
              prevIcon={<span className="text-gray-700">{"<"}</span>}
              nextIcon={<span className="text-gray-700">{">"}</span>}
          
            />
          </div>
         
        </div>
      </div>

      <TransactionDialog
        isOpen={isAddExpenseOpen}
        onClose={closeDialog}
        onAdd={() => {}}
      />
      <Footer />
    </div>
  );
}

export default HomePage;
