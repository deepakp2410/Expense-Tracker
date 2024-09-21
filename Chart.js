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
        maintainAspectRatio: false, // Allow more flexible resizing
        aspectRatio: 1, // Adjust the aspect ratio (width / height)
    }
});

