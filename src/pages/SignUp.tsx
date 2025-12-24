import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  CheckCircle,
  ArrowRight,
  Shield,
} from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    receivePromotions: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors: any = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Include uppercase, lowercase, and numbers";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      setVerificationSent(true);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      handleNextStep();
      return;
    }
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Sign up successful:", formData);
      // Redirect to verification or home page
      navigate("/");
    } catch (error) {
      console.error("Sign up error:", error);
      setErrors((prev: any) => ({
        ...prev,
        general: "Registration failed. Please try again."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password: any) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    return strength;
  };

  const strength = passwordStrength(formData.password);

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
        {/* Left side - Benefits */}
        <div className="lg:w-1/2 px-8 lg:px-16 py-12 lg:py-0">
          <div className="max-w-md">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Join <span className="text-purple-600">RideRequest</span> today
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Sign up and get your first ride with 20% off. Experience seamless transportation at your fingertips.
            </p>
            
            <div className="space-y-6">
              {[
                {
                  title: "Fast rides, anytime",
                  description: "Get picked up in minutes, 24/7"
                },
                {
                  title: "Cash-free payments",
                  description: "Pay securely through the app"
                },
                {
                  title: "Ride tracking",
                  description: "Real-time updates on your ride"
                },
                {
                  title: "Safety features",
                  description: "Share your trip with trusted contacts"
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="text-green-500 mr-4 mt-1 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">10M+</div>
                <div className="text-gray-600">Happy Riders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">4.8★</div>
                <div className="text-gray-600">App Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Sign Up Form */}
        <div className="lg:w-1/2 px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-400"
                  }`}>
                    1
                  </div>
                  <div className={`ml-2 text-sm font-medium ${
                    currentStep >= 1 ? "text-purple-600" : "text-gray-400"
                  }`}>
                    Account Info
                  </div>
                </div>
                <div className="h-1 w-8 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-400"
                  }`}>
                    2
                  </div>
                  <div className={`ml-2 text-sm font-medium ${
                    currentStep >= 2 ? "text-purple-600" : "text-gray-400"
                  }`}>
                    Security
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentStep === 1 ? "Create your account" : "Set your password"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {errors.general}
                  </div>
                )}

                {/* Step 1: Account Information */}
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                              errors.firstName ? "border-red-300" : "border-gray-300"
                            }`}
                            placeholder="John"
                          />
                        </div>
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.lastName ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.phone ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    {verificationSent && (
                      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
                        <p className="font-medium">Verification code sent!</p>
                        <p className="text-sm mt-1">We've sent a 6-digit code to your phone. Enter it on the next step.</p>
                      </div>
                    )}
                  </>
                )}

                {/* Step 2: Password */}
                {currentStep === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
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
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      
                      {/* Password Strength Meter */}
                      <div className="mt-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-300"
                            style={{ 
                              width: `${strength}%`,
                              backgroundColor: strength < 50 ? '#ef4444' : strength < 75 ? '#f59e0b' : '#10b981'
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Weak</span>
                          <span>Strong</span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                            formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {formData.password.length >= 8 && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <span className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                            /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <span className={/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                            Upper & lowercase letters
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                            /\d/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {/\d/.test(formData.password) && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <span className={/\d/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                            At least one number
                          </span>
                        </div>
                      </div>
                      
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.confirmPassword ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Verification Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Verification code
                      </label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className="w-full h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        ))}
                      </div>
                      <div className="mt-3 text-sm text-gray-500">
                        <p>Enter the 6-digit code sent to {formData.phone}</p>
                        <button type="button" className="text-purple-600 hover:text-purple-500 font-medium mt-1">
                          Resend code
                        </button>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                        />
                        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                          I agree to the{" "}
                          <Link to="/terms" className="text-purple-600 hover:text-purple-500 font-medium">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-purple-600 hover:text-purple-500 font-medium">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-sm text-red-600">{errors.acceptTerms}</p>
                      )}

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          name="receivePromotions"
                          checked={formData.receivePromotions}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                        />
                        <label htmlFor="receivePromotions" className="ml-2 block text-sm text-gray-700">
                          I want to receive promotions, updates, and offers via email
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* Form Actions */}
                <div className="space-y-4">
                  {currentStep === 2 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                  )}

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
                        {currentStep === 1 ? "Processing..." : "Creating account..."}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        {currentStep === 1 ? "Continue" : "Create account"}
                        <ArrowRight className="ml-2" size={20} />
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Security Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="mr-2" size={16} />
                  <span>Your information is protected with bank-level security</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-500 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;