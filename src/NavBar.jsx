import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar bg-base-200 shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold">
          👨‍💻 DevTinder
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/login" className="btn btn-outline btn-sm">
          Login
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 transition duration-300 hover:scale-105">
              <img
                alt="User"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge badge-primary">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
