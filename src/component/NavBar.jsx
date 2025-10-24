import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Logic remains unchanged
      await axios.post(BASE_URL + "/logout" , {}, {withCredentials : true})
      dispatch(removeUser());
      navigate('/login');
    } catch (err) {
      // Error logic ,maybe redirect to error page
      console.error(err);
    }
  }

  // Pure Black/Minimal Dark Theme: bg-gray-900 (near black) with bright primary accent (cyan)
  return (
    // Minimal dark navbar
    <div className="navbar bg-gray-900 text-white shadow-xl h-16 sticky top-0 z-50 border-b border-gray-700">
      <div className="flex-1">
        {/* Brand Link: Uses a vibrant cyan accent */}
        <Link to="/" className="btn btn-ghost text-2xl font-bold tracking-widest hover:bg-gray-800 transition duration-300">
          <span className="text-cyan-400 pr-1">🧑‍💻</span><span className="hidden sm:inline">Dev</span>Tinder
        </Link>
      </div>

      {user && (
        <div className="flex-none pr-4">
          <div className="dropdown dropdown-end">

            {/* User Info and Dropdown Button */}
            <div tabIndex={0} role="button" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition duration-300">
              {/* Welcome Text */}
              <p className="hidden md:block text-sm font-medium text-gray-300">Welcome, <span className="font-semibold text-white">{user.firstName}</span></p>

              {/* Avatar: Subtle border matching the accent color */}
              <div className="btn btn-ghost btn-circle avatar border-2 border-cyan-400/80">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Photo"
                    src={user.photoUrl} />
                </div>
              </div>
            </div>

            {/* Dropdown Menu: Dark background, light text for contrast */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl border border-gray-700 divide-y divide-gray-700">
              <li>
                <Link to="/profile" className="justify-between text-base hover:bg-gray-700 py-3">
                  Profile
                  <span className="badge badge-info badge-sm text-white bg-cyan-600 border-none">New</span>
                </Link>
              </li>
              <li>
                <a className="text-base hover:bg-gray-700 py-3">Settings</a>
              </li>
              <li>
                {/* Logout button styled for clear action */}
                <a onClick={handleLogout} className="text-base text-red-400 font-semibold hover:bg-red-900/40 hover:text-red-300 py-3">
                  Logout 🚪
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
};

export default NavBar;