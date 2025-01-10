import FormSignUp from "@/components/common/formsignup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/store/auth-slice/index";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux state
  const { isLoading, error } = useSelector((state) => state.auth);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await dispatch(registerUser(formData)).unwrap();
      if (data?.success) {
        toast.success("Registration successful! Redirecting to sign-in...", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/auth/signin");
        }, 2900); // Navigate slightly before the toast disappears
      }
    } catch (error) {
      console.error("Registration failed:", error); // Log detailed error for debugging
      toast.error("Registration failed! Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-slate-400 shadow-md rounded-lg p-5">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please fill out the form to create an account.
        </p>

        <FormSignUp
          formData={formData}
          onChange={handleChange}
          onSubmit={onSubmit}
          buttonText={isLoading ? "Registering..." : "Register"}
          isDisabled={isLoading} // Pass disabled state to FormSignUp
        />

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="text-blue-500 hover:underline font-medium"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default SignUp;
