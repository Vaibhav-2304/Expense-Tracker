export function getPast5Years() {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let i = 0; i < 5; i++) {
        years.push(currentYear - i);
    }

    return years.reverse();
}

export function getSpendingLast5Years(expenses) {
    const currentYear = new Date().getFullYear();
    const spending = Array(5).fill(0);  // Initialize an array of 5 elements with 0

    expenses.forEach(expense => {
        const year = parseInt(expense.date.split('-')[2], 10);

        // Calculate the index for the spending array (current year is index 0)
        const index = currentYear - year;

        if (index >= 0 && index < 5) {
            spending[index] += expense.amount;
        }
    });

    return spending.reverse();
}

export function filterExpensesByYear(expenses, year) {
    const monthlySpending = Array(12).fill(0);  // Initialize an array of 12 elements with 0

    expenses.forEach(expense => {
        const [, month, expenseYear] = expense.date.split('-').map(Number);

        if (expenseYear === year) {
            const monthIndex = month - 1;  // Convert month to zero-based index (0 = January, 11 = December)
            monthlySpending[monthIndex] += expense.amount;
        }
    });

    return monthlySpending;
}