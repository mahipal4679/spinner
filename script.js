
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Object that stores value of max and min
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "Try again" },
  { minDegree: 31, maxDegree: 90, value: "Gift Card 1" },
  { minDegree: 91, maxDegree: 150, value: "Gift Card 2" },
  { minDegree: 151, maxDegree: 210, value: "Gift Card 3" },
  { minDegree: 211, maxDegree: 270, value: "Gift Card 4" },
  { minDegree: 271, maxDegree: 330, value: "Gift Card 5" },
  { minDegree: 331, maxDegree: 360, value: "Gift Card 6" },
];

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];

// Background Color
const pieColor = ["#8b35bc", "#b163da", "#8b35bc", "#b163da", "#8b35bc", "#b163da"];

// Create chart
let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["0", "1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        backgroundColor: pieColor,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      // Display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      break;
    }
  }
};

// Spinner count
let count = 0;
let resultValue = 101;
let spinCount = 0;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  // Empty final value
  finalValue.innerHTML = "";

  if (spinCount === 0) {
    // First spin - Try again
    let randomDegree = Math.floor(Math.random() * (30 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
      myChart.options.rotation = myChart.options.rotation + resultValue;
      // Update chart with new value
      myChart.update();

      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation === randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
        spinBtn.disabled = false;
      }
    }, 10);

    spinCount++;
  } else if (spinCount === 1) {
    // Second spin - Gift Card
    let randomDegree = Math.floor(Math.random() * (360 - 31 + 1) + 31);
    let rotationInterval = window.setInterval(() => {
      myChart.options.rotation = myChart.options.rotation + resultValue;
      // Update chart with new value
      myChart.update();

      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation === randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
        spinBtn.disabled = false;
      }
    }, 10);

    spinCount++;
  }
});