import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/Login-Registration/GoogleLogin";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const from = location?.state?.from?.pathname || "/";

  const handleSUbmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // Call signIn function from useAuth hook
      await signIn(email, password);

      // Redirect upon successful login
      navigate(from, { replace: true });
    } catch (error) {
      // Handle error based on its type
      if (error.code === "auth/user-not-found") {
        setError("User not found. Please check your email and password.");
        // You can set an error state here to display a message in your UI
      } else if (error.code === "auth/wrong-password") {
        setError("Invalid password. Please try again.");
        // You can set an error state here to display a message in your UI
      } else if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
        // You can set an error state here to display a message in your UI
      } else {
        setError("An error occurred:", error.message);
        // You can set an error state here to display a generic error message in your UI
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <form onSubmit={handleSUbmit} className="hero min-h-screen bg-base-200">
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
