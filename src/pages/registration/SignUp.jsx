import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {

  const initialFormData = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
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
      const response = await axios.post(
        "https://project-management-api-lyart.vercel.app/api/v1/user",
        formData
      );
      console.log(response.data); // Handle response accordingly
      if (response.data.status === true) {
        toast(response.data.message);
        // Reset form after successful submission
        setFormData(initialFormData);
        navigate("/login");
      }
      console.log(formData);
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
              <h4 className="text-xl font-bold">Register now!</h4>
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="input input-bordered"
                required
              />
              <label className="py-2 cursor-pointer">
                Already Register ?{" "}
                <span className="text-blue-500">
                  {" "}
                  <Link to={`/login`}>Login</Link>{" "}
                </span>
              </label>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
