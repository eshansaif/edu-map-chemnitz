// import { Link, useLocation, useNavigate } from "react-router-dom";
// import GoogleLogin from "../components/Login-Registration/GoogleLogin";
// import useAuth from "../hooks/useAuth";
// import { useEffect, useState } from "react";

// const Login = () => {
//   const { signIn, user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [error, setError] = useState("");

//   const from = location?.state?.from?.pathname || "/";

//   const handleSUbmit = async (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     try {
//       // Call signIn function from useAuth hook
//       await signIn(email, password).then(() => {
//         fetch("https://edu-map-chemnitz-server.vercel.app/user", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data);
//             if (data.token) {
//               // Store token in localStorage
//               localStorage.setItem("token", data?.token);
//               // Redirect upon successful login
//               navigate(from, { replace: true });
//             } else {
//               setError("Login failed. Please try again.");
//             }
//           });
//       });
//     } catch (error) {
//       // Handle error based on its type
//       if (error.code === "auth/user-not-found") {
//         return setError(
//           "User not found. Please check your email and password."
//         );
//       } else if (error.code === "auth/wrong-password") {
//         return setError("Invalid password. Please try again.");
//       } else if (error.code === "auth/invalid-credential") {
//         return setError("Invalid email or password.");
//       } else {
//         return setError("An error occurred:", error.message);
//       }
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       navigate(from, { replace: true });
//     }
//   }, [user, from, navigate]);

//   return (
//     <form onSubmit={handleSUbmit} className="hero min-h-screen bg-base-200">
//       <div className="hero-content flex-col lg:flex-row-reverse">
//         <div className="text-center lg:text-left">
//           <h1 className="text-5xl font-bold">Login now!</h1>
//           <p className="py-6">
//             Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//             excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
//             a id nisi.
//           </p>
//         </div>
//         <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//           <div className="card-body">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="email"
//                 className="input input-bordered"
//                 name="email"
//                 required
//               />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="password"
//                 className="input input-bordered"
//                 name="password"
//                 required
//               />
//             </div>

//             <div className="form-control mt-6">
//               <input
//                 className="btn bg-red-500 text-white"
//                 type="submit"
//                 value="Login"
//               />
//             </div>
//             <p className="text-red-500">{error && error}</p>
//             <div className="mt-6">
//               <GoogleLogin />
//             </div>
//             <div className="mt-6">
//               <p>
//                 New here?{" "}
//                 <Link to="/register" className="text-red-500">
//                   Register
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Login;
// __________________________________________________________________

import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/Login-Registration/GoogleLogin";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const from = location?.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const dbUser = await axios.get(
        `https://edu-map-chemnitz-server.vercel.app/user/${email}`
      );
      if (dbUser?.data?.isDeleted) {
        return swal(
          "User is disabled by the admin. Please contact the admin for more details."
        );
      }

      await signIn(email, password).then(() => {
        fetch("https://edu-map-chemnitz-server.vercel.app/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((res) => {
            if (res.status === 403) {
              then(res.json).then((data) => console.log(data));
            }
            return res.json();
          })
          .then((data) => {
            if (data.token) {
              // Store token in localStorage
              localStorage.setItem("token", data?.token);
              // Redirect upon successful login
              navigate(from, { replace: true });
            } else {
              setError("Login failed. Please try again.");
            }
          })
          .catch((error) => {
            setError(error.message);
          });
      });
    } catch (error) {
      // Handle error based on its type
      if (error.code === "auth/user-not-found") {
        return setError(
          "User not found. Please check your email and password."
        );
      } else if (error.code === "auth/wrong-password") {
        return setError("Invalid password. Please try again.");
      } else if (error.code === "auth/invalid-credential") {
        return setError("Invalid email or password.");
      } else {
        return setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <form onSubmit={handleSubmit} className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
            </div>

            <div className="form-control mt-6">
              <input
                className="btn bg-red-500 text-white"
                type="submit"
                value="Login"
              />
            </div>
            <p className="text-red-500">{error && error}</p>
            <div className="mt-6">
              <GoogleLogin />
            </div>
            <div className="mt-6">
              <p>
                New here?{" "}
                <Link to="/register" className="text-red-500">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
