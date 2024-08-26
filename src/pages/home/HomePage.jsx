import React, { useEffect, useState } from "react";
import expenseData from "./components/data.json";
import { Bar } from "react-chartjs-2";
import TransactionDialog from "./components/TransactionDialog";
import Tile from "./components/ExpenseList";
import "./style.css";

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
        label: "Amount Spent ($)",
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
        text: "Amount Spent on Various Items",
      },
    },
  };

  const [isAddExpenseOpen, setisAddExpenseOpen] = useState(false);

  const openDialog = () => setisAddExpenseOpen(true);
  const closeDialog = () => setisAddExpenseOpen(false);

  useEffect(() => {
    console.log(expenseData.length);
  }, []);

  //-------------------------------------------------------------------------------------------------

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-50 flex flex-col">
        <div className="w-11/12 h-[50%] bg-gradient-to-r from-green-200 to-blue-300 triangle"></div>
        <div className="w-3/4 h-[80%] bg-gradient-to-r from-green-200 to-blue-300 equilateral-triangle self-end"></div>
      </div>

      <div class="flex items-center justify-center">
        <div class="mr-8">
          <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer">
            <div class="w-6 h-4 flex flex-col justify-between">
              <span class="block w-full h-1 bg-black rounded-sm"></span>
              <span class="block w-full h-1 bg-black rounded-sm"></span>
              <span class="block w-full h-1 bg-black rounded-sm"></span>
            </div>
          </div>
        </div>

        <div class="text-3xl font-semibold text-slate-600">Expense Tracker</div>
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="w-full md:w-3/4 lg:w-1/2 lg:h-[50vh] bg-white rounded-lg shadow-lg p-4">
          <Bar data={data} options={options} />
        </div>
      </div>

      <div className="flex align-middle items-center justify-center">
        <button
          className="bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={openDialog}
        >
          Add Expense
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full md:w-3/4 lg:w-3/5 bg-white rounded-lg shadow-lg">
          {expenseData.map((expense) => (
            <Tile
              key={expense.id} // Assuming each expense has a unique `id`
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
        </div>
      </div>

      <TransactionDialog
        isOpen={isAddExpenseOpen}
        onClose={closeDialog}
        onAdd={() => {}}
      />
    </div>
  );
}

export default HomePage;
