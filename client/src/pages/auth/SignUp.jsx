import FormSignUp from "@/components/common/formsignup"; // Importing the reusable FormSignUp component
import { useState } from "react"; // Importing useState hook for managing component state
import { useDispatch } from "react-redux"; // Importing useDispatch to dispatch Redux actions
import { useNavigate } from "react-router-dom"; // Import necessary hooks and components from react-router-dom
import { registerUser } from "@/store/auth-slice/index"; // Importing the async action for user registration
import { toast } from "react-toastify"; // Importing the toast function from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importing the toast styles

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
  const navigate = useNavigate();

  // Function to handle form submission
  function onSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    dispatch(registerUser(formData)).then((data) => {
      console.log(data); // Log the response from the registerUser action
      if (data?.payload?.success) {
        // Show a success toast
        toast.success("Registration successful! Please log in.");

        // Navigate to the login page after a short delay to let the toast display
        setTimeout(() => {
          navigate("/auth/signin");
        }, 2000); // Adjust delay as necessary
      } else {
        // Handle errors here (you can display an error toast)
        toast.error("Registration failed. Please try again.");
      }
    }); // Dispatch the registerUser action with form data
  }

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
