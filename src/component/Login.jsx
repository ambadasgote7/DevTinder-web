import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const [isLoginForm, setIsLoginForm] = useState(true);

    const [error, setError] = useState("");
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
          setError(err?.response?.data || "Something went wrong");
        }
    }

    const handleSignUp = async () => {
         try {
            const res = await axios.post(BASE_URL + "/signup" , {
            firstName,
            lastName,
            emailId,
            password,
            }, { withCredentials : true });
            dispatch(addUser(res.data?.data));
            return navigate('/profile');
        } catch (err) {
          setError(err?.response?.data || "Something went wrong");
        }
    }

    return (
        // Dark Mode Container: Black/Very Dark Grey Gradient Background
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
            {/* Dark Card: Charcoal background, Rounded, Elevated Shadow */}
            <div className="card bg-gray-800 w-full max-w-md shadow-2xl rounded-xl border border-gray-700">
                <div className="card-body p-10">
                    {/* Light Text for Heading - DevTinder Branding */}
                    <h2 className="text-3xl font-extrabold text-center mb-8 text-white tracking-wider">
                        {isLoginForm ? "Login" : "Sign Up" } 
                    </h2>
                    
                    <div className="space-y-6">

                        {!isLoginForm && <> <div className="form-control">
                            <label className="label">
                                {/* Light Text for Label */}
                                <span className="label-text font-medium text-gray-300">First Name</span>
                            </label>
                            {/* Dark Input Field: Subtly Lighter Background, White Text, Blue Focus Ring */}
                            <input 
                                type="text" 
                                value={firstName}
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={ (e) => setFirstName(e.target.value) }
                            />
                        </div>

                         <div className="form-control">
                            <label className="label">
                                {/* Light Text for Label */}
                                <span className="label-text font-medium text-gray-300">Last Name</span>
                            </label>
                            {/* Dark Input Field: Subtly Lighter Background, White Text, Blue Focus Ring */}
                            <input 
                                type="text" 
                                value={lastName}
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={ (e) => setLastName(e.target.value) }
                            />
                        </div></>}

                        <div className="form-control">
                            <label className="label">
                                {/* Light Text for Label */}
                                <span className="label-text font-medium text-gray-300">Email</span>
                            </label>
                            {/* Dark Input Field: Subtly Lighter Background, White Text, Blue Focus Ring */}
                            <input 
                                type="email" 
                                value={emailId}
                                placeholder="Enter your email" 
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={ (e) => setEmailId(e.target.value) }
                            />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                {/* Light Text for Label */}
                                <span className="label-text font-medium text-gray-300">Password</span>
                            </label>
                            {/* Dark Input Field: Subtly Lighter Background, White Text, Blue Focus Ring */}
                            <input 
                                type="password" 
                                value={password}
                                placeholder="Enter your password" 
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="label mt-1">
                                {/* Pink Link for Forgot Password */}
                                <a href="#" className="label-text-alt link link-hover text-pink-400 hover:text-pink-300 transition duration-200">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        
                        <div className="form-control mt-8">
                            {/* Accent Button: Solid Pink/Red Gradient, White Text, Slightly Darker Hover, Bold */}
                            <button 
                                className="btn w-full text-white bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 border-none text-lg font-semibold transform hover:scale-[1.01] transition duration-200" 
                                onClick={isLoginForm? handleLogin : handleSignUp}
                            >
                                {isLoginForm ? "Login" : "Sign Up"}
                            </button>
                            <p className="text-red-500 flex justify-center mt-2">
                              {typeof error === "string" ? error : JSON.stringify(error)}
                            </p>

                        </div>

                        <div>
                            <p className="flex justify-center cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>
                                { isLoginForm
                                ? "New User? Signup Here"
                                : "Existing User? Login Here"
                                }
                            </p>
                        </div>
                        
                       
                    </div>
                </div>
            </div>
        </div>
        
    )
};

export default Login;