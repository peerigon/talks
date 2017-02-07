

document.addEventListener("DOMContentLoaded", function(event) { 

    const liveChart = new LiveChart(document.getElementById("updating-chart"));

    const sock = new SockJS("http://raspberrypi.local:8080/stream");

    sock.onmessage = function(e) {
        const { ts, temperature } = JSON.parse(e.data);
        liveChart.addData(temperature, ts);
    };
});
        