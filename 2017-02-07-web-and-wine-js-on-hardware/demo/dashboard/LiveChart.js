const options = {
    scales: {
        yAxis: [{
            type: "line",
            display: true,
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 40
            }
            
        }],
        xAxis: [{
            time: {
                    unit: "second"
            }
        }]
    }
};

let i = 0;

const data = {
    labels: [],
    datasets: [{  
            label: "Temperature",      
            data: []
        }]
};

class LiveChart {
    constructor(chartCanvas) {
        this.chart = new Chart.Line(chartCanvas, {
        data,
        options
        });
    }
    addData(value, ts) {
         this.chart.data.datasets[0].data.push(value);
         this.chart.data.labels.push(ts);

        if(this.chart.data.datasets[0].data.length > 5) {
            this.chart.data.datasets[0].data.shift();
            this.chart.data.labels.shift();
        }
        this.chart.update();
    }
}