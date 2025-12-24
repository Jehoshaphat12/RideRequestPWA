// import { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FaLock, FaUser } from "react-icons/fa";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false)
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       navigate("/request");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-green-500">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl shadow min-w-80 w-120 h-[50%]"
//       >
//         <h1 className="text-lg font-semibold mb-4">Login</h1>

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <div className="w-100 flex items-center gap-3 mx-2 mt-10 p-3 bg-gray-100 rounded-lg">
//             <FaUser className="text-gray-400"/>
//         <input
//           type="email"
//           placeholder="Email"
//           className="input w-full outline-0"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         </div>
//         <div className="w-100 flex items-center gap-3 mx-2 mt-4 p-3 bg-gray-100 rounded-lg">
//             <FaLock className="text-gray-400"/>
//         <input
//           type="password"
//           placeholder="Password"
//           className="input w-full outline-0"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         </div>

//         <button className="btn-primary mt-4 w-full bg-[#7500fc]">Login</button>
//       </form>
//     </div>
//   );
// }




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Smartphone, Facebook, Apple } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On successful login
      console.log("Login successful:", formData);
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev: any) => ({
        ...prev,
        general: "Invalid credentials. Please try again."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: any) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="text-xl font-bold text-black">RideRequest</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Left side - Branding */}
        <div className="lg:w-1/2 px-8 lg:px-16 py-12 lg:py-0">
          <div className="max-w-md">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Welcome back to <span className="text-purple-600">RideRequest</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Sign in to request rides, manage your trips, and access exclusive member benefits.
            </p>
            <div className="space-y-4">
              {[
                "Real-time ride tracking",
                "Secure payment options",
                "Ride history and receipts",
                "Driver ratings and reviews"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="lg:w-1/2 px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Sign in to your account</h2>

              {/* Social Login Options */}
              {/* <div className="space-y-3 mb-8">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <FaGoogle className="mr-3" size={20} />
                  <span className="font-medium">Continue with Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("apple")}
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <Apple className="mr-3" size={20} />
                  <span className="font-medium">Continue with Apple</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("facebook")}
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <Facebook className="mr-3" size={20} />
                  <span className="font-medium">Continue with Facebook</span>
                </button>
              </div> */}

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  {/* <span className="px-4 bg-white text-gray-500">Or continue with email</span> */}
                  <span className="px-4 bg-white text-gray-500">Continue with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {errors.general}
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-purple-600 hover:text-purple-500 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Sign in <ArrowRight className="ml-2" size={20} />
                    </span>
                  )}
                </button>
              </form>

              {/* Phone Login Option */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={() => navigate("/login-phone")}
                  className="w-full flex items-center justify-center py-3 px-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <Smartphone className="mr-3" size={20} />
                  <span className="font-medium">Sign in with phone</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-purple-600 hover:text-purple-500 font-medium"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Your data is protected with 256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
