// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequestRide from "./pages/RequestRide";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp";
import Ride from "./pages/Ride";
import Drive from "./pages/Drive";
import Business from "./pages/Business";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Press from "./pages/Press";
import Contact from "./pages/Contact";
import Help from "./pages/Help";

export default function App() {
  return (
    <div className="">
      <NavBar />
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/request" element={<RequestRide />} />
        <Route path="/ride" element={<Ride />} />
        <Route path="/drive" element={<Drive />} />
        <Route path="/business" element={<Business />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/press" element={<Press />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      </div>
    </div>
  );
}
