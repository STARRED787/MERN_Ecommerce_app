import FormSignIn from "@/components/common/formSignIn"; // Import the reusable FormSignIn component
import { toast } from "react-toastify"; // Import toast for notifications
import { useDispatch } from "react-redux"; // Import Redux dispatch
import { loginUser } from "@/store/auth-slice"; // Import login action

function SignIn() {
  const dispatch = useDispatch();

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      const response = await dispatch(loginUser(formData));
      console.log("Login Response:", response);

      // Show success notification
      toast.success("Successfully signed in!");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-slate-400 shadow-md rounded-lg p-5">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign In</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please log in to your account.
        </p>

        {/* Pass the handleFormSubmit function as the onSubmit prop */}
        <FormSignIn onSubmit={handleFormSubmit} buttonText="Sign In" />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?
            <a
              href="/auth/signup"
              className="text-blue-500 hover:underline font-medium"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
