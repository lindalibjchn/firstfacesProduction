function addGrammarCharts() {

	addMainErrorsChart();
	addArticleErrorsChart();

}

function addMainErrorsChart() {

	let ctx = document.getElementById('mainErrorsChart').getContext('2d');
	let myDoughnutChart = new Chart(ctx, {
		type: 'doughnut',
		data: { 
			datasets: [{
				data: [10, 20, 30],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(132, 99, 255)',
					'rgb(99, 255, 132)'
				]
			}],
			labels: [ 'Red', 'Yellow', 'Blue' ],
		},
		options: {
			responsive: true,
			legend: {
				display: false,
			},
		},
	});

}

function addArticleErrorsChart() {

	let ctx = document.getElementById('articleErrorsChart').getContext('2d');
	let myRadarChart = new Chart(ctx, {
		type: 'radar',
		data: { 
			datasets: [{
				data: [10, 20, 30, 12, 18, 10],
				//backgroundColor: [
					//'rgb(255, 99, 132)',
					//'rgb(132, 99, 255)',
					//'rgb(99, 255, 132)'
				//]
			}],
			labels: [ 'a-the', 'the-a', 'a-x', 'the-x', 'x-a', 'x-the'],
		},
		options: {
			responsive: true,
			legend: {
				display: false,
			},
		},
	});

}





