document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const formMessage = document.getElementById('form-message');

    expenseForm.addEventListener('submit', addExpense);

    function addExpense(e) {
        e.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const date = document.getElementById('expense-date').value;
        const category = document.getElementById('expense-category').value;

        if (!name || amount <= 0 || !date || !category) {
            formMessage.textContent = 'Please fill out all fields correctly.';
            return;
        }

        const expense = { name, amount, date, category };
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        expenseForm.reset();
        formMessage.textContent = 'Expense added successfully!';
    }
});
