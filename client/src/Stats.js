import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

function Stats() {
  const [stats, updateStats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/stats")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data = ", data);
        updateStats(data);

        setInterval(() => {
          console.log("This will run every second!");
          fetch("http://localhost:4000/stats")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log("data2 = ", data);
              updateStats(data);
            })
        }, 5000);
      });
  }, []);

  const countChartData = {
    labels: stats.map((statsItem) => statsItem.timestamp),
    datasets: [
      {
        label: "Valid",
        fill: false,
        borderColor: "green",
        data: stats.map((statsItem) => statsItem.valid),
      },
      {
        label: "Invalid",
        fill: false,
        borderColor: "red",
        data: stats.map((statsItem) => statsItem.invalid),
      },
      {
        label: "Total",
        fill: false,
        borderColor: "blue",
        data: stats.map((statsItem) => statsItem.total),
      },
    ],
  };

  const timeChartData = {
    labels: stats.map((statsItem) => statsItem.timestamp),
    datasets: [
      {
        label: "Max",
        fill: false,
        borderColor: "cyan",
        data: stats.map((statsItem) => statsItem.maxResTime),
      },
      {
        label: "Min",
        fill: false,
        borderColor: "magenta",
        data: stats.map((statsItem) => statsItem.minResTime),
      },
      {
        label: "Avg",
        fill: false,
        borderColor: "yellow",
        data: stats.map((statsItem) => statsItem.avgResTime),
      },
    ],
  };
  const chartOptions = {
    animation: false
  };

  return (
    <div className="Stats">
     <h3> Count statistics</h3>
      <Line data={countChartData} options={chartOptions} />

      <h3> Time statistics</h3>
      <Line data={timeChartData} options={chartOptions} />
    </div>
  );
}

export default Stats;