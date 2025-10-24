
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./userCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {

     const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);
    const [error, setError] = useState("");



    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        setError("");
        try {

            const res = await axios.patch(BASE_URL + "/profile/edit", 
                {firstName, lastName, photoUrl, age, gender, about},
               { withCredentials : true }
            );
            dispatch(addUser(res.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
          setError(err?.response?.data || "Something went wrong");
        }
    }

   return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl items-start">
            {/* Edit Profile Form */}
            <div className="card bg-gray-800 w-full lg:w-1/2 shadow-2xl rounded-xl border border-gray-700">
                <div className="card-body p-10">
                    <h2 className="text-3xl font-extrabold text-center mb-8 text-white tracking-wider">
                        Edit Profile
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-300">First Name</span>
                            </label>
                            <input 
                                type="text" 
                                value={firstName}
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-300">Last Name</span>
                            </label>
                            <input 
                                type="text" 
                                value={lastName}
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-300">Photo</span>
                            </label>
                            <input 
                                type="text" 
                                value={photoUrl}
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-300">Age</span>
                            </label>
                            <input 
                                type="text" 
                                value={age}
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-300">Gender</span>
                            </label>
                            <input 
                                type="text" 
                                value={gender}
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-300">About</span>
                            </label>
                            <input 
                                type="text" 
                                value={about}
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-300">Skills</span>
                            </label>
                            <input 
                                type="text" 
                                value={skills}
                                className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </div>
                        
                        <div className="form-control mt-8">
                            <button 
                                className="btn w-full text-white bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 border-none text-lg font-semibold transform hover:scale-[1.01] transition duration-200"
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>
                            <p className="text-red-600 flex justify-center mt-3"> {error} </p>
                        </div>

                        {showToast && (<div className="toast toast-top toast-center">
                            <div className="alert alert-success">
                                <span>Profile Updated Successfully</span>
                            </div>
                            </div>)}
                    </div>
                </div>
            </div>

            {/* User Card Preview */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-8">
                <UserCard user={{firstName, lastName, photoUrl, age, gender, about}} />
            </div>
        </div>
    </div>
)
};

export default EditProfile;


