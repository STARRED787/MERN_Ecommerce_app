import FormSignIn from "@/components/common/formSignIn"; // Importing the reusable FormSignIn component
import { useState } from "react"; // Importing useState hook for managing form state

// SignIn component for handling sign-in functionality
function SignIn() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    username: "", // Initial value for the username field
    password: "", // Initial value for the password field
  });

  // Function to handle input field changes and update form data state
  const handleChange = (event) => {
    const { name, value } = event.target; // Extract name and value from input field
    setFormData((prevData) => ({
      ...prevData, // Keep the previous form data intact
      [name]: value, // Update the value of the specific field
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh on form submission
    console.log("SignIn Data:", formData); // Log form data (usually, you would send it to an API here)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Container for the form with styling */}
      <div className="w-full max-w-lg bg-slate-400 shadow-md rounded-lg p-5">
        {/* Header Section */}
        <h1 className="text-2xl font-semibold text-center mb-4">Sign In</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please log in to your account.
        </p>

        {/* FormSignIn component to handle input fields and submission */}
        <FormSignIn
          formData={formData} // Pass form data as a prop to FormSignIn
          onChange={handleChange} // Pass the handleChange function to update state
          onSubmit={handleSubmit} // Pass the handleSubmit function to handle form submission
          buttonText="Sign In" // Button text for the form's submit button
        />

        {/* Section for users who do not have an account */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?
            <a
              href="/auth/signup" // Redirect link to the signup page
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

export default SignIn; // Exporting the SignIn component for use in other parts of the app
