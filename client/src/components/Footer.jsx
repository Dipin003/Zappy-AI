import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 pt-12 w-full text-gray-500 mt-20 bg-gray-50">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-12 border-b border-gray-300 pb-10">
        {/* Logo & Description */}
        <div className="max-w-full md:max-w-sm">
          <h2
            className="text-3xl md:text-4xl font-bold text-purple-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Zappy.ai
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed">
            Zappy.ai is a platform offering a wide range of AI tools to enhance your creativity. <br />
            Unlock your potential with powerful tools built for creators, developers, and dreamers.
          </p>
        </div>

        {/* Links and Newsletter Container */}
        <div className="flex flex-col sm:flex-row md:flex-1 md:justify-between gap-10">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold mb-4 text-gray-800 text-base md:text-lg">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full sm:max-w-sm">
            <h2 className="font-semibold text-gray-800 mb-4 text-base md:text-lg">Subscribe to our newsletter</h2>
            <p className="text-sm md:text-base">
              Get weekly updates on tools, articles, and exclusive offers.
            </p>
            <div className="flex flex-col md:flex-row items-stretch gap-3 pt-4">
              <input
                className="border border-gray-400/40 placeholder-gray-500 focus:ring-2 ring-indigo-500 outline-none w-full md:max-w-[220px] h-10 rounded px-3 text-sm"
                type="email"
                placeholder="Enter your email"
              />
              <button className="bg-purple-600 hover:bg-purple-700 transition-all duration-200 cursor-pointer h-10 px-5 text-white rounded text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <p className="pt-6 text-center text-xs sm:text-sm pb-6 text-gray-600">
        © 2025 <a href="/" className="text-purple-500 font-medium">ZappyAI</a>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
