import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  const {
    totalUsers,
    totalChefs,
    totalRecipes,
    totalCategories,
    categoryWiseRecipes,
  } = stats;

  console.log(categoryWiseRecipes);

  const barData = {
    labels: ["Users", "Chefs", "Recipes", "Categories"],
    datasets: [
      {
        label: "Total Count",
        data: [totalUsers, totalChefs, totalRecipes, totalCategories],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const pieData = {
    labels: categoryWiseRecipes.map((category) => category.category),
    datasets: [
      {
        label: "Recipes by Category",
        data: categoryWiseRecipes.map((category) => category.recipeCount),
        backgroundColor: categoryWiseRecipes.map(
          (_, index) =>
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 0.6)`
        ),
      },
    ],
  };

  return (
    <div className="overflow-x-auto w-full px-16 mt-10">
      <h1 className="text-center font-mono font-bold text-3xl underline">
        Statistics of the System
      </h1>
      <div className="md:flex justify-between gap-24 md:gap-12">
        <div className="md:w-1/2 mb-12">
          <Bar data={barData} options={{ responsive: true }} />
          <p className="font-mono font-thin underline text-center">
            Total Counts
          </p>
        </div>
        <div className="md:w-1/2">
          <Pie data={pieData} options={{ responsive: true }} />
          <p className="font-mono font-thin underline text-center">
            Recipes by Category
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
