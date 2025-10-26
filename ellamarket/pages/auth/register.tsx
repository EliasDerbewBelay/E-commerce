import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: true,
    terms: false,
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password do not match");
    }

    if (!formData.terms) {
      setErrorMessage("You must agree to the Terms and Pricacy Policy");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            newsletter: formData.newsletter,
          },
        },
      });

      if (error) {
        setErrorMessage(
          error.message || "Failed to create account. Try again."
        );
        return;
      }

      setSuccessMessage(
        "Account created successfully! Check your email for verificaton"
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-center text-white">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-yellow-400 p-2 rounded-xl shadow-lg">
              <User className="w-6 h-6 text-slate-900" />
            </div>
            <h1 className="font-bold text-2xl">
              Ella<span className="text-yellow-400">Market</span>
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-slate-300">
            Join us and start your shopping journey
          </p>
        </div>

        {/* Registration Form */}
        <div className="p-8">
          {errorMessage && (
            <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 text-green-600 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all duration-200"
                    placeholder="First name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all duration-200"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all duration-200"
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all duration-200"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="w-4 h-4 text-slate-900 rounded mt-1 focus:ring-slate-900 border-slate-300 cursor-pointer group-hover:border-slate-400 transition-colors duration-200"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors duration-200 flex-1">
                  Send me product updates and special offers
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 text-slate-900 rounded mt-1 focus:ring-slate-900 border-slate-300 cursor-pointer group-hover:border-slate-400 transition-colors duration-200"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors duration-200 flex-1">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-slate-900 font-semibold hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-slate-900 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.terms}
              className="w-full bg-slate-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 group mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-slate-900 font-semibold hover:text-slate-700 hover:underline transition-colors duration-200 inline-flex items-center space-x-1"
                >
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-slate-600">
            <Shield className="w-4 h-4" />
            <p className="text-xs">Your information is securely encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
