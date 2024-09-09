  export function getPastWeekDays() {
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

  export const options = {
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

  export function getCurrentMonthExpenses(expenses) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    const currentYear = currentDate.getFullYear();

    const currentMonthExpenses = expenses.filter(expense => {
        const [, month, year] = expense.date.split('-').map(Number);
        return month === currentMonth && year === currentYear;
    });

    currentMonthExpenses.sort((a, b) => {
      const dateA = a.date.split("-").reverse().join("-"); // Convert DD-MM-YYYY to YYYY-MM-DD
      const dateB = b.date.split("-").reverse().join("-");
    
      return new Date(dateB) - new Date(dateA);
    });

    console.log(currentMonthExpenses);

    const totalAmount = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    return {
      "list" : currentMonthExpenses,
      "total" : totalAmount
    }
}

  export function getPast7DaysSpending(dataList) {
    const result = [];
    let total = 0;
    const today = new Date();
  
    // Loop through the past 7 days (including today)
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
  
      // Format date as DD-MM-YYYY
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
  
      // Calculate total spending on this date
      const totalAmount = dataList
        .filter(item => item.date === formattedDate)
        .reduce((sum, item) => sum + item.amount, 0);
  
      result.push(totalAmount);
      total = total + totalAmount;
    }
  
    return {
      "list" : result,
      "total" : total
    };
  }

  export function filterData(category, allExpensData){
    if(category=='All'){
      return allExpensData;
    }

    var filteredList = [];
    for(let i=0; i<allExpensData.length; i++){
      if(allExpensData[i].category==category){
        filteredList.push(allExpensData[i]);
      }
    }

    return [...filteredList].sort((a, b) => {
      const dateA = a.date.split("-").reverse().join("-"); // Convert DD-MM-YYYY to YYYY-MM-DD
      const dateB = b.date.split("-").reverse().join("-");
    
      return new Date(dateB) - new Date(dateA);
    });

  }

  export function sortData(basedOn, allExpenseData) {
    if(basedOn=='Date ( ↓ )'){
      return [...allExpenseData].sort((a, b) => {
        const dateA = a.date.split("-").reverse().join("-"); // Convert DD-MM-YYYY to YYYY-MM-DD
        const dateB = b.date.split("-").reverse().join("-");
      
        return new Date(dateB) - new Date(dateA);
      });
    }
    else{
      return [...allExpenseData].sort((a, b) => {return b.amount - a.amount;});
    }
  }