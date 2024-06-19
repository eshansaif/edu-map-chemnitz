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
import LoadingSpinner from "../../components/smallComponents/LoadingSpinner";

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
    return <LoadingSpinner />;
  }

  const {
    totalUsers,
    totalStudents,
    totalParents,
    activeUsersCount,
    deletedUsersCount,
    totalAdmins,
  } = stats;

  const barData = {
    labels: [
      "All Users",
      "Total Admins",
      "Students",
      "Parents",
      "Active Users",
      "Delete dUsers",
    ],
    datasets: [
      {
        label: "Total Count",
        data: [
          totalUsers,
          totalAdmins,
          totalStudents,
          totalParents,
          activeUsersCount,
          deletedUsersCount,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "yellow",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "red",
        ],
      },
    ],
  };

  return (
    <div className="overflow-x-auto w-full px-16 mt-10">
      <h1 className="text-center font-mono font-bold text-3xl underline">
        Statistics of the System
      </h1>
      <div className="">
        <div className="mb-12">
          <Bar data={barData} options={{ responsive: true }} />
          <p className="font-mono font-thin underline text-center">
            Total Counts
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
