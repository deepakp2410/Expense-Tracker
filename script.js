// Initialize expenses array
let expenses = [];

// Select DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const pieChartCanvas = document.getElementById('expense-pie-chart');
const barChartCanvas = document.getElementById('expense-bar-chart');

let pieChart;
let barChart;

// Handle form submission
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addExpense(descriptionInput.value, amountInput.value, categoryInput.value);
    updateExpenseList();
    updateCharts();
    expenseForm.reset();
});

// Add expense to the list
function addExpense(description, amount, category) {
    const expense = { description, amount: parseFloat(amount), category };
    expenses.push(expense);
}

// Update expense list UI
function updateExpenseList() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount.toFixed(2)} [${expense.category}]`;
        expenseList.appendChild(li);
    });
}

// Update charts
function updateCharts() {
    const categories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    // Destroy existing charts to avoid overlay
    if (pieChart) pieChart.destroy();
    if (barChart) barChart.destroy();

    // Create a pie chart
    pieChart = new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1, // Keep it as a perfect circle
        }
    });

    // Create a bar chart
    barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

