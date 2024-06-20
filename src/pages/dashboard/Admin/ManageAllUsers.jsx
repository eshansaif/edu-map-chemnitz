import axios from "axios";
import { useEffect, useState } from "react";
import UserRow from "../../../components/cards/UserRow";

export default function ManageAllUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function loadUsers() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/users", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    }
    loadUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesName = user?.name
      ?.toLowerCase()
      ?.includes(searchQuery?.toLowerCase());
    let matchesStatus;
    if (statusFilter === "admin") {
      matchesStatus = user.isAdmin === 1;
    } else {
      matchesStatus = statusFilter === "all" || user.status === statusFilter;
    }
    return matchesName && matchesStatus;
  });

  return (
    <div className="overflow-x-auto w-full px-16 mt-3">
      <h1 className="text-3xl mb-4 underline text-center">Manage All Users </h1>
      <div className="md:flex gap-2 justify-between mb-4">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="input input-bordered"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="select select-bordered"
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="deleted">Deleted Users</option>
            <option value="admin">Admin Users</option>
          </select>
        </div>
      </div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Home Address</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Action</th>
            <th>Change Admin</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              users={users}
              setUsers={setUsers}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
