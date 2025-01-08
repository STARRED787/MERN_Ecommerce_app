import FormSignUp from "@/components/common/formsignup"; // Importing the reusable FormSignUp component
import { useSelector, useDispatch } from "react-redux"; // Import useSelector to access Redux state and useDispatch to dispatch actions
import { useNavigate } from "react-router-dom"; // Import necessary hooks and components from react-router-dom
import { registerUser, updateFormData } from "@/store/auth-slice/index"; // Importing the async action and form data updater action

function SignUp() {
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  const navigate = useNavigate(); // Hook for navigation

  // Access formData from Redux state
  const formData = useSelector((state) => state.auth.formData);

  // Function to handle form submission
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevents page refresh on form submission

    try {
      // Dispatch the registerUser async action and handle navigation on success
      const data = await dispatch(registerUser(formData)).unwrap(); // Unwrap the resolved/rejected promise
      console.log("Your data: ", data); // Log the response data from the registration action

      if (data?.success) {
        navigate("/auth/signin"); // Use navigate() to redirect to sign-in page
      }
    } catch (error) {
      console.error("Registration failed:", error); // Log any registration error
    }
  };

  // Function to handle input changes and update the Redux formData state
  const handleChange = (event) => {
    const { name, value } = event.target; // Extract name and value from the input field
    dispatch(updateFormData({ [name]: value })); // Dispatch action to update form data in Redux
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Container for the form with styling */}
      <div className="w-full max-w-lg bg-slate-400 shadow-md rounded-lg p-5">
        {/* Form Header */}
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please fill out the form to create an account.
        </p>

        {/* Reusable FormSignUp component for rendering the form */}
        <FormSignUp
          formData={formData} // Passing form data from Redux to the FormSignUp component
          onChange={handleChange} // Handling input changes
          onSubmit={onSubmit} // Handling form submission
          buttonText="Register" // Setting button text to "Register"
        />

        {/* Section for users who already have an account */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login" // Redirect link to the login page
              className="text-blue-500 hover:underline font-medium"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
