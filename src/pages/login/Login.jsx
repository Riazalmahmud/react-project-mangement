import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const initialForm = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a request to your backend API to handle login
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        formData
      );
      if (response.data.status === true) {
        toast.success(response.data.message);
        setFormData(initialForm);
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect user or perform other actions based on successful login
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.massage);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 sign-in">
      <div>
        <ToastContainer />
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 lg:w-[450px] max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="text-center">
              <h4 className="text-xl font-bold">Login now!</h4>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="py-2 cursor-pointer">
                Not Registered?{" "}
                <span className="text-blue-500">
                  <Link to={`/sign-up`}>Registration</Link>
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
