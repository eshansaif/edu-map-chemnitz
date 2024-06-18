// import axios from "axios";
// import { useEffect, useState } from "react";
// import UserRow from "../../../components/cards/UserRow";

// export default function ManageAllUsers() {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     async function loadUsers() {
//       try {
//         const response = await axios.get("http://localhost:3000/users");
//         if (response.status === 200) {
//           console.log(response.data);
//           setUsers(response.data);
//         }
//       } catch (error) {
//         console.error("Error loading users:", error);
//       }
//     }
//     loadUsers();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Function to filter users based on the search query
//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="overflow-x-auto w-full px-16 mt-10">
//       <h1 className="text-3xl mb-4">Manage All Users</h1>
//       <div className="md:flex gap-2 justify-between mb-4">
//         <div>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             placeholder="Search by name..."
//             className="input input-bordered"
//           />
//         </div>
//       </div>
//       <table className="table table-zebra">
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Name</th>
//             <th>Role</th>
//             <th>Email</th>
//             <th>Home Address</th>
//             <th>Phone Number</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user) => (
//             <UserRow
//               key={user._id}
//               user={user}
//               users={users}
//               setUsers={setUsers}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// _______________________________________

import axios from "axios";
import { useEffect, useState } from "react";
import UserRow from "../../../components/cards/UserRow";

export default function ManageAllUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
          console.log(response.data);
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-auto w-full px-16 mt-10">
      <h1 className="text-3xl mb-4">Manage All Users</h1>
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
