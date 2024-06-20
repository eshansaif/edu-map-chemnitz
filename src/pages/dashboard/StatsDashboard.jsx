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
    <div className="overflow-x-auto w-full px-4 md:px-16 mt-10">
      <h1 className="text-center font-mono font-bold text-3xl underline">
        Statistics of the System
      </h1>
      <div className="my-10 space-y-5">
        <div className="stats shadow grid md:grid-cols-6">
          <div className="stat">
            <div className="stat-figure text-primary"></div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{totalUsers}</div>
          </div>
          <div className="stat">
            <div className="stat-figure textarea-info"></div>
            <div className="stat-title">Total Admin</div>
            <div className="stat-value textarea-info">{totalAdmins}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-error"></div>
            <div className="stat-title">Total Students</div>
            <div className="stat-value text-error">{totalStudents}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-warning"></div>
            <div className="stat-title">Total Parents</div>
            <div className="stat-value text-warning">{totalParents}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-success"></div>
            <div className="stat-title">Total Active Users</div>
            <div className="stat-value text-success">{activeUsersCount}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Deleted Users</div>
            <div className="stat-value text-secondary">{deletedUsersCount}</div>
          </div>
        </div>
        <div className="stats shadow grid md:grid-cols-5">
          <div className="stat">
            <div className="stat-figure text-primary"></div>
            <div className="stat-title">Total Locations</div>
            <div className="stat-value text-primary">
              {schoolCount +
                kindergartenCount +
                socialChildProjectsCount +
                socialTeenagerProjectsCount}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-info"></div>
            <div className="stat-title">Total Schools</div>
            <div className="stat-value text-info">{schoolCount}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-error"></div>
            <div className="stat-title">Total Kindergartens</div>
            <div className="stat-value text-error">{kindergartenCount}</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-success"></div>
            <div className="stat-title">Social Child Projects</div>
            <div className="stat-value text-primary">
              {socialChildProjectsCount}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Social Teenager Projects</div>
            <div className="stat-value text-secondary">
              {socialTeenagerProjectsCount}
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="w-full mb-12">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="relative h-64 md:h-96">
              <Bar data={barData} options={{ responsive: true }} />
            </div>
            <p className="font-mono font-thin underline text-center mt-4">
              Total Counts
            </p>
          </div>
        </div>
        <div className="w-full mb-12">
          <div className=" rounded-lg ">
            <div className="relative h-64 md:h-96">
              <Pie data={pieData} options={{ responsive: true }} />
            </div>
            <p className="font-mono font-thin underline text-center mt-4">
              Location Counts Added By EduMap Chemnitz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
