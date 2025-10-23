import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("ambadas@gmail.com");
    const [password, setPassword] = useState("Ambadas@123");
    const dispatch = useDispatch();
     const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login" , {
            emailId,
            password,
        }, { withCredentials : true });
        dispatch(addUser(res.data));
        return navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="card bg-white w-full max-w-md shadow-2xl">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Welcome Back
          </h2>
          
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Email</span>
              </label>
              <input 
                type="email" 
                value={emailId}
                placeholder="Enter your email" 
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={ (e) => setEmailId(e.target.value) }
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Password</span>
              </label>
              <input 
                type="password" 
                value={password}
                placeholder="Enter your password" 
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}

              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-blue-600">
                  Forgot password?
                </a>
              </label>
            </div>
            
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full text-white bg-blue-600 hover:bg-blue-700 border-none" onClick={handleLogin}>
                Login
              </button>
            </div>
            
            <div className="divider text-gray-400">OR</div>
            
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="link link-hover text-blue-600 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
       
    )
};

export default Login;