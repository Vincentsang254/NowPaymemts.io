import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaHeadset, FaExchangeAlt } from "react-icons/fa";

const UserFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">About SparkMatch</h4>
            <p className="text-[13px] leading-relaxed">
              Meet new people, start meaningful conversations, and discover connections that feel right.
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="p-2 bg-gray-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L9 7.5l-1.682 1.682a4.5 4.5 0 01-6.364 0L4.318 6.318z" />
                </svg>
              </div>
              <div>
                <p className="text-[12px]">Community support</p>
                <p className="text-white text-sm font-medium">Real connections, always</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">Explore</h4>
            <ul className="space-y-2">
              {["Discover", "Matches", "Stories"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition-colors text-[13px]">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">Safety</h4>
            <ul className="space-y-2 text-[13px]">
              <li className="flex items-center space-x-2">
                <FaHeadset className="text-green-400" />
                <a href="#" className="hover:text-white">Help & Support</a>
              </li>
              <li className="flex items-center space-x-2">
                <FaExchangeAlt className="text-green-400" />
                <a href="#" className="hover:text-white">Community Guidelines</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">Stay in the loop</h4>
            <p className="text-[13px] mb-3">Get the latest dating tips, app updates, and connection ideas.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 text-sm bg-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-green-400"
              />
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white text-sm py-2 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between text-[12px]">
          <p>&copy; {new Date().getFullYear()} SparkMatch. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
