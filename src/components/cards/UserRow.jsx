import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

/* eslint-disable react/prop-types */
export default function UserRow({ user, setUsers, users }) {
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .patch(
              `http://localhost:3000/users/soft-delete/${id}`,
              {},
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
            .then(() => {
              console.log("User soft deleted:", id);
              setUsers(
                users.map((u) =>
                  u._id === id ? { ...u, status: "deleted" } : u
                )
              );
              swal("Poof! User has been deleted!", {
                icon: "success",
              });
            })
            .catch((error) => {
              console.error("Error soft deleting user:", error);
            });
        } else {
          swal("User is safe!");
        }
      });
    } catch (error) {
      console.error("Error soft deleting user:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${id}/status`,
        { status },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(users.map((u) => (u._id === id ? { ...u, status } : u)));
        swal("Success!", "User status has been updated.", "success");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      swal("Error", "Failed to update user status.", "error");
    }
  };

  const handleToggleAdmin = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${id}/toggle-admin`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(
          users.map((u) =>
            u._id === id ? { ...u, isAdmin: response.data.newIsAdmin } : u
          )
        );
        const newStatus =
          response.data.newIsAdmin === 1 ? "admin" : "normal user";
        swal("Success!", `User has been made a ${newStatus}.`, "success");
      }
    } catch (error) {
      console.error("Error toggling user admin status:", error);
      swal("Error", "Failed to toggle user admin status.", "error");
    }
  };

  return (
    <tr className="">
      <th>{user?._id}</th>
      <td>{user?.name}</td>
      <td>{user?.isAdmin === 0 ? user?.role : "Admin"}</td>
      <td>{user?.email}</td>
      <td>{user?.homeAddress}</td>
      <td>{user?.phoneNumber}</td>
      <td>
        <select
          disabled={user?.isAdmin === 1 ? true : false}
          value={user?.status}
          onChange={(e) => handleStatusChange(user?._id, e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="active">Active</option>
          <option value="deleted">Deleted</option>
        </select>
      </td>
      <td className="flex gap-1">
        <Link
          to={`/dashboard/user-details/${user?._id}`}
          className="btn btn-xs btn-primary"
        >
          View
        </Link>
        <button
          onClick={() => handleDelete(user?._id)}
          className="btn btn-xs btn-error"
        >
          Delete
        </button>
      </td>
      <td>
        <button
          onClick={() => handleToggleAdmin(user?._id)}
          className={`btn btn-sm text-xs  ${
            user?.isAdmin === 1 ? "btn-warning" : "btn-success"
          }`}
        >
          {user?.isAdmin === 1 ? "Revoke Admin" : "Make Admin"}
        </button>
      </td>
    </tr>
  );
}
