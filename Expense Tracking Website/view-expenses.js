document.addEventListener('DOMContentLoaded', function () {
    const viewMonthForm = document.getElementById('view-month-form');
    const expenseList = document.getElementById('expense-list');
    const viewMonthSelect = document.getElementById('view-month');
    const expenseTable = document.getElementById('expense-table');

    const months = getMonthsWithExpenses();
    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        viewMonthSelect.appendChild(option);
    });

    viewMonthForm.addEventListener('submit', loadExpenses);

    function loadExpenses(e) {
        e.preventDefault();
        const month = viewMonthSelect.value;
        const category = document.getElementById('view-category').value;
        const expenses = getExpensesForMonth(month);

        renderExpenses(expenses, category);
    }

    function renderExpenses(expenses, category) {
        const filteredExpenses = category === 'All' ? expenses : expenses.filter(expense => expense.category === category);

        // Clear previous table rows
        expenseList.innerHTML = '';

        filteredExpenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
            `;
            expenseTable.appendChild(row);
        });
    }

    function getExpensesForMonth(month) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        return expenses.filter(expense => expense.date.startsWith(month));
    }

    function getMonthsWithExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const months = new Set(expenses.map(expense => expense.date.slice(0, 7)));
        return Array.from(months);
    }
});
