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
  const [locationStats, setLocationStats] = useState(null); // New state for location stats

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchLocationStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/location-stats"
        );
        setLocationStats(response.data);
      } catch (error) {
        console.error("Error fetching location stats:", error);
      }
    };

    fetchStats();
    fetchLocationStats(); // Fetch location stats
  }, []);

  if (!stats || !locationStats) {
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

  const {
    schoolCount,
    kindergartenCount,
    socialChildProjectsCount,
    socialTeenagerProjectsCount,
  } = locationStats;

  const barData = {
    labels: [
      "All Users",
      "Total Admins",
      "Students",
      "Parents",
      "Active Users",
      "Deleted Users",
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

  const pieData = {
    labels: [
      "Schools",
      "Kindergartens",
      "Social Child Projects",
      "Social Teenager Projects",
    ],
    datasets: [
      {
        label: "Location Counts",
        data: [
          schoolCount,
          kindergartenCount,
          socialChildProjectsCount,
          socialTeenagerProjectsCount,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="overflow-x-auto w-full px-16 mt-10">
      <h1 className="text-center font-mono font-bold text-3xl underline">
        Statistics of the System
      </h1>
      <div className="grid md:grid-cols-2">
        <div className="mb-12">
          <Bar data={barData} options={{ responsive: true }} />
          <p className="font-mono font-thin underline text-center">
            Total Counts
          </p>
        </div>
        <div className="mb-12">
          <Pie data={pieData} options={{ responsive: true }} />
          <p className="font-mono font-thin underline text-center">
            Location Counts Added By EduMap Chemnitz
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
