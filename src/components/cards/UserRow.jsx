// import axios from "axios";
// // import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import swal from "sweetalert";

// /* eslint-disable react/prop-types */
// export default function UserROw({ user, setUsers, users }) {
//   // const handleDelete = (id) => {
//   //   axios.delete()
//   // };

//   const token = localStorage.getItem("token");

//   const handleDelete = async (id) => {
//     try {
//       await swal({
//         title: "Are you sure?",
//         text: "Once deleted, you will not be able to recover this user!",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//       }).then((willDelete) => {
//         if (willDelete) {
//           axios.delete(`http://localhost:3000/users/${id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           console.log("Post deleted:", id);
//           setUsers(users.filter((r) => r._id !== id));
//           swal("Poof! User has been deleted!", {
//             icon: "success",
//           });
//         } else {
//           swal("User is safe!");
//         }
//       });
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };
//   return (
//     <tr>
//       <th>{user?._id}</th>
//       <td>{user?.name}</td>
//       <td>{user?.role}</td>
//       <td>{user?.email}</td>
//       <td>{user?.homeAddress}</td>
//       <td>{user?.phoneNumber}</td>
//       <td className="flex gap-2">
//         <Link
//           to={`/dashboard/recipe-details/${user?._id}`}
//           className="btn btn-xs btn-primary"
//         >
//           View
//         </Link>
//         <Link
//           to={`/dashboard/edit-recipe/${user?._id}`}
//           className="btn btn-xs btn-neutral"
//         >
//           Edit
//         </Link>
//         <button
//           onClick={() => handleDelete(user?._id)}
//           className="btn btn-xs btn-error"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   );
// }

// -------------------------------------------------------------

import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

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

  return (
    <tr>
      <th>{user?._id}</th>
      <td>{user?.name}</td>
      <td>{user?.role}</td>
      <td>{user?.email}</td>
      <td>{user?.homeAddress}</td>
      <td>{user?.phoneNumber}</td>
      <td>{user?.status}</td>
      <td className="flex gap-2">
        <Link
          to={`/dashboard/user-details/${user?._id}`}
          className="btn btn-xs btn-primary"
        >
          View
        </Link>
        {/* <Link
          to={`/dashboard/edit-recipe/${user?._id}`}
          className="btn btn-xs btn-neutral"
        >
          Edit
        </Link> */}
        <button
          onClick={() => handleDelete(user?._id)}
          className="btn btn-xs btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
