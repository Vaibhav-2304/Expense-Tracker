import React, {useEffect, useState} from "react";
import data from "./components/data.json";
import { Bar } from "react-chartjs-2";
import TransactionDialog from "./components/TransactionDialog";
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
  const data = {
    labels: [
      "Burger",
      "Bus Ticket",
      "Movie Ticket",
      "Pizza",
      "Electricity Bill",
      "Pharmacy",
      "Sushi",
      "Gasoline",
      "Clothes",
      "Salad",
    ],
    datasets: [
      {
        label: "Amount Spent ($)",
        data: [10, 2.5, 12, 15, 60, 25, 20, 40, 80, 8],
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

  function fun(){}


  //-------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="flex align-middle justify-center mt-4 text-3xl font-semibold text-slate-600">
        Expense Tracker
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="w-full md:w-3/4 lg:w-1/2 h-[50vh] bg-white rounded-lg shadow-lg p-4">
          <Bar data={data} options={options} />
        </div>
      </div>

      <div className="flex align-middle items-center justify-center">
      <button className="bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={openDialog} >
        Add Expense
      </button>
      </div>

    <TransactionDialog isOpen={isAddExpenseOpen} onClose={fun} onAdd ={fun}/>

      </>
     
  );
}

export default HomePage;
