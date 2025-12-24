// import { Link } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <div className="flex sticky top-0 bg-gray-900 items-center justify-between py-3 px-4 font-medium md:px-[2vw] lg:px-[9vw]">
//       <div>
//         <Link to="/" className="flex gap-2 items-center justify-center">
//         <img src="/1.png" alt="" className="w-5 h-5 sm:w-7 sm:h-7 object-cover"/>
//           <h3 className="text-lg text-white">Ride Request</h3>
//         </Link>
//       </div>

//       <div className="flex gap-3 justify-center items-center">
//         <Link to="../login" className="hover:text-[#7500fc] cursor-pointer text-white text-sm">Log in</Link>
//         <Link to="../login" className="rounded-xl px-4 py-2 bg-[#7500fc] hover:bg-[#6500d8] text-white text-sm cursor-pointer transition duration-300">
//           Sign up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default NavBar;




import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, Bell } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button className="md:hidden mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold text-black hidden md:block">RideRequest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/ride" className="text-gray-700 hover:text-black font-medium">
              Ride
            </Link>
            <Link to="/drive" className="text-gray-700 hover:text-black font-medium">
              Drive
            </Link>
            <Link to="/business" className="text-gray-700 hover:text-black font-medium">
              Business
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-black font-medium">
              About
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-black">
              <Bell size={20} />
            </button>
            <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-black">
              <Link to="/profile" className="flex items-center space-x-2">
              <User size={20} />
              <span className="font-medium">Account</span>
              
              </Link>
            </button>
            <div className="flex items-center space-x-2">
              <Link to="/login" className="px-4 py-2 text-black font-medium hover:bg-gray-100 rounded-full">
                Log in
              </Link>
              <Link to="/signup" className="px-6 py-2 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/ride" className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md">
                Ride
              </Link>
              <Link to="/drive" className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md">
                Drive
              </Link>
              <Link to="/business" className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md">
                Business
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md">
                About
              </Link>
              <div className="pt-4 border-t">
                <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md">
                  <User className="inline mr-2" size={18} />
                  Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
