import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProfile() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/user/get/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            photoURL: data.photoURL,
            role: data.role,
          });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/user/${formData.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully");
        navigate("/dashboard");
      } else {
        alert("Error updating profile: " + result.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile");
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="photoURL"
            className="block text-sm font-medium text-gray-700"
          >
            Photo URL
          </label>
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Role</option>
            <option value="chef">Chef</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
