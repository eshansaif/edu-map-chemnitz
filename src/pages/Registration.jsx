import { useState } from "react";
import GoogleLogin from "../components/Login-Registration/GoogleLogin";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import swal from "sweetalert";
import axios from "axios";

const Registration = () => {
  const [passMatch, setPassMatch] = useState(true);
  const [error, setError] = useState("");
  const { createUser, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const handleSUbmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const role = form.role.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    if (password !== confirm_password) {
      setPassMatch(false);
    }

    // console.log(email, password, confirm_password);

    const dbUser = await axios.get(`http://localhost:3000/user/${email}`);

    // console.log(dbUser.data.email);

    if (dbUser.data.email) {
      return swal("You are already registered, Please login");
    } else {
      try {
        if (password === confirm_password) {
          await createUser(email, password).then((data) => {
            if (data?.user?.email) {
              const userInfo = {
                email: data?.user?.email,
                name: name,
                role: role,
                isAdmin: 0,
                password: password,
              };
              fetch("http://localhost:3000/user", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
              })
                .then((res) => res.json())
                .then((data) => {
                  localStorage.setItem("token", data?.token);
                  swal("User Created Successfully");
                  navigate(from);
                });
            }
          });
        }
      } catch (error) {
        // Handle error based on its type
        if (error.code === "auth/email-already-exists") {
          setError("User Already exist please login");
          // You can set an error state here to display a message in your UI
        } else {
          setError("An error occurred:", error.message);
          // You can set an error state here to display a generic error message in your UI
        }
      }
    }
    if (user) {
      navigate(from);
    }
  };

  return (
    <form onSubmit={handleSUbmit} className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
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
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="name"
                className="input input-bordered"
                name="name"
                required
              />
            </div>
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

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                required
                name="role"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Parents">Parents</option>
              </select>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                name="confirm_password"
                required
              />
            </div>
            {!passMatch && (
              <div className="my-2">
                <p className="text-red-500">Passwords do not match!</p>
              </div>
            )}
            <div className="form-control mt-6">
              <input
                className="btn bg-red-500 text-white"
                type="submit"
                value="Register"
              />
            </div>
            <hr className="mt-3" />
            <p className="text-red-500">{error && error}</p>
            <div className="mt-3">
              <GoogleLogin />
            </div>
            <div className="mt-6">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-red-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Registration;
