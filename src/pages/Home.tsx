import { Clock, CreditCard, Shield, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="relative top-7 rounded-t-4xl min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative px-4 text-white sm:px-6 lg:px-8 bg-[url('/img1.png')] bg- bg-cover bg-center p-6">
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:w-2/3 lg:w-1/2">
            <div className="flex items-center mb-6 ">
              <div className="w-1 h-16 lg:h-20 mr-5 bg-purple-500" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Where are we <span className="text-purple-400">headed</span>{" "}
                today?
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Get a ride in minutes. Or become a driver and earn money on your
              schedule.
            </p>
          </div>
        </div>
      </div>

      {/* SERVICE CARD SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-15">
        <div className="flex flex-row items-center gap-3 mb-4">
          <div className="w-1 h-10 bg-black"></div>
          <h1 className="text-3xl text-black font-semibold">Suggestions</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl border border-gray-200 p-8 bg-white">
          {/* Ride Service Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
            <h3 className="text-2xl font-bold mb-4">Ride</h3>
            <p className="text-gray-600 mb-6">
              Request a ride from point A to point B with ease and convenience.
            </p>
            <button onClick={() => navigate('/requestride')} className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Get a Ride
            </button>
          </div>
          {/* Ride Service Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
            <h3 className="text-2xl font-bold mb-4">Delivery</h3>
            <p className="text-gray-600 mb-6">
              Send or receive packages and food quickly and reliably fast to any
              destination
            </p>
            <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Deliver Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why choose RideRequest?
          </h2>
          <p className="text-gray-600 text-lg">
            Safe, reliable rides at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Shield className="text-purple-600" size={32} />,
              title: "Safety First",
              desc: "24/7 safety support and verified drivers",
            },
            {
              icon: <Clock className="text-purple-600" size={32} />,
              title: "On-time pickup",
              desc: "Real-time tracking and accurate ETAs",
            },
            {
              icon: <CreditCard className="text-purple-600" size={32} />,
              title: "Cash-free",
              desc: "Seamless in-app payments",
            },
            {
              icon: <Star className="text-purple-600" size={32} />,
              title: "5-star drivers",
              desc: "Rated drivers for quality service",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to ride?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download our app for the best experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition">
              Download App
            </button>
            <button className="px-8 py-3 border-2 border-white rounded-lg font-bold hover:bg-white hover:text-black transition">
              Sign Up to Drive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
