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
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {}
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to="/"
          className="text-3xl font-extrabold text-primary hover:text-secondary transition duration-300"
        >
          👨‍💻 DevTinder
        </Link>
      </div>

      <div className="flex-none gap-4">
        {!user && (
          <Link
            to="/login"
            className="btn btn-outline btn-sm btn-primary transition-all hover:scale-105"
          >
            Login
          </Link>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium hidden sm:inline">
              Welcome, <span className="text-primary">{user.firstName}</span>
            </span>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-105 transition duration-300">
                  <img alt="User" src={user.photoURL} />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-200 rounded-box w-56 space-y-1"
              >
                <li>
                  <Link
                    to="/profile"
                    className="flex justify-between items-center"
                  >
                    Profile
                    <span className="badge badge-primary text-xs">New</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="hover:bg-base-300 rounded-md px-2 py-1 block"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="hover:bg-error hover:text-white rounded-md px-2 py-1 transition"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
