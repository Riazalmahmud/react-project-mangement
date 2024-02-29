import { Link } from "react-router-dom";
import "./SignUp.css";
const SignUp = () => {
  return (
    <div className="hero min-h-screen bg-base-200 sign-in">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 lg:w-[450px] max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="text-center">
              <h4 className="text-xl font-bold">Register now!</h4>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
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
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
