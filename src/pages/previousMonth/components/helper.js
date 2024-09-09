export function getPastMonthsPrefixes() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const result = [];
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth(); // 0-based index for month

    for (let i = 0; i < 12; i++) {
        result.unshift(monthNames[currentMonth]);
        currentMonth--;

        if (currentMonth < 0) {
            currentMonth = 11; // Wrap around to December
        }
    }

    return result;
}

export function getPast12MonthsSpending(dataList) {
    const result = [];
    let total = 0;
    const today = new Date();
  
    // Loop through the past 12 months (including the current month)
    for (let i = 11; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
  
        // Calculate total spending in this month
        const totalAmount = dataList
            .filter(item => {
                const [, itemMonth, itemYear] = item.date.split('-').map(Number);
                return itemMonth === Number(month) && itemYear === year;
            })
            .reduce((sum, item) => sum + item.amount, 0);
  
        result.push(totalAmount);
        total += totalAmount;
    }
  
    return {
        "list": result,
        "total": total
    };
}

export function filterDataByMonth(monthName, allExpenses){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = monthNames.indexOf(monthName);

    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth(); // 0-based index (0 = January, 11 = December)

    // Determine if the month is from the current year or the previous year
    const year = monthIndex <= currentMonthIndex ? currentYear : currentYear - 1;
    // Format the month as MM
    const MM = String(monthIndex + 1).padStart(2, '0');

    const monthYear = MM + '-' + year.toString();

    const filteredData =  allExpenses.filter(expense => {
        // Extract MM-YYYY from the expense date
        const [, month, year] = expense.date.split('-');
        const expenseMonthYear = `${month}-${year}`;
        
        // Check if it matches the provided MM-YYYY
        return expenseMonthYear === monthYear;
    });

    return [...filteredData].sort((a, b) => {
        const dateA = a.date.split("-").reverse().join("-"); // Convert DD-MM-YYYY to YYYY-MM-DD
        const dateB = b.date.split("-").reverse().join("-");
      
        return new Date(dateA) - new Date(dateB);
      });
}