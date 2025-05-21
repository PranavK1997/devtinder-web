import React from "react";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-between bg-neutral text-neutral-content px-4 py-3 mt-8 w-full rounded-t-lg shadow-sm text-sm sm:text-base">
      <div className="flex items-center gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        ></svg>
        <span>© {currentYear} Dev Tinder</span>
      </div>

      <div className="flex gap-4">
        <a href="#" className="hover:text-blue-400">
          <FaTwitter size={18} />
        </a>
        <a href="#" className="hover:text-red-500">
          <FaYoutube size={18} />
        </a>
        <a href="#" className="hover:text-blue-600">
          <FaFacebookF size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
