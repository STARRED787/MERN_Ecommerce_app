import FormSignUp from "@/components/common/formsignup"; // Importing the reusable FormSignUp component
import { useState } from "react"; // Importing useState hook for managing component state
import { useDispatch } from "react-redux"; // Importing useDispatch to dispatch Redux actions
import { useNavigate } from "react-router-dom"; // Import necessary hooks and components from react-router-dom
import { registerUser } from "@/store/auth-slice/index"; // Importing the async action for user registration

function SignUp() {
  // State to manage form data (username, password, email)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Hook for navigation
  const navigate = useNavigate(); // This is the correct hook for navigation

  // Function to handle form submission
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevents page refresh on form submission

    try {
      // Dispatch the registerUser async action and handle navigation on success
      const data = await dispatch(registerUser(formData)).unwrap(); // Unwraps the resolved or rejected promise
      if (data?.payload?.success) {
        // Delay navigation slightly to ensure all state changes are completed
        setTimeout(() => {
          navigate("/auth/signin"); // Redirect to the login page on successful registration
        }, 500);
      }
      console.log(data); // Log the response data from the registration action
    } catch (error) {
      console.error("Registration failed:", error); // Log any registration error
    }
  };

  // Function to handle input changes and update the form data state
  const handleChange = (event) => {
    const { name, value } = event.target; // Extract name and value from the input field
    setFormData((prevData) => ({
      ...prevData, // Preserve other fields in the state
      [name]: value, // Update the current field based on input name
    }));
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
          formData={formData} // Passing form data to the FormSignUp component
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

export default SignUp; // Exporting the SignUp component for use in other parts of the app
