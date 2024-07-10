document.addEventListener('DOMContentLoaded', function () {
    showSummary();
    displayMonthSelector();

    function showSummary() {
        const summaryInfo = document.getElementById('summary-info');
        const currentMonth = new Date().toISOString().slice(0, 7);
        const expenses = getExpensesForMonth(currentMonth);
        const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
        const monthlyLimit = getMonthlyLimit(currentMonth) || 0;
        const availableBalance = monthlyLimit - totalExpense;

        summaryInfo.innerHTML = `
            <p>Total Expense for ${currentMonth}: ₹${totalExpense}</p>
            <p>Monthly Limit: ₹${monthlyLimit}</p>
            <p>Available Balance: ₹${availableBalance}</p>
        `;
    }

    function displayMonthSelector() {
        const monthSelect = document.getElementById('set-limit-month');
        const currentMonth = new Date().toISOString().slice(0, 7);
        monthSelect.value = currentMonth;
    }

    function getExpensesForMonth(month) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        return expenses.filter(expense => expense.date.startsWith(month));
    }

    function setMonthlyLimit() {
        const month = document.getElementById('set-limit-month').value;
        const limit = prompt(`Set limit for ₹{month}:`);
        if (limit !== null) {
            const parsedLimit = parseFloat(limit);
            if (!isNaN(parsedLimit) && parsedLimit >= 0) {
                const limits = JSON.parse(localStorage.getItem('limits')) || {};
                limits[month] = parsedLimit;
                localStorage.setItem('limits', JSON.stringify(limits));
                showSummary();
            } else {
                alert('Please enter a valid positive number for the limit.');
            }
        }
    }

    function getMonthlyLimit(month) {
        const limits = JSON.parse(localStorage.getItem('limits')) || {};
        return limits[month];
    }

    const setLimitBtn = document.getElementById('set-limit-btn');
    setLimitBtn.addEventListener('click', setMonthlyLimit);
});
