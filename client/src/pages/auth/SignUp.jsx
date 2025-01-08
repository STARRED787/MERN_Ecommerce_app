import FormSignUp from "@/components/common/formsignup"; // Importing the reusable CommonForm component
import { useState } from "react"; // Importing useState hook for managing component state

function SignUp() {
  // State to manage form data (username, password, email)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  // Function to handle input changes and update the form data state
  const handleChange = (event) => {
    const { name, value } = event.target; // Extracting name and value from the input field
    setFormData((prevData) => ({
      ...prevData, // Keeping other fields unchanged
      [name]: value, // Updating the current field based on input name
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page refresh on form submission
    console.log("Form submitted:", formData); // Logs the submitted form data to the console
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

        {/* Reusable FormSignUp component is used here */}
        <FormSignUp
          formData={formData} // Passing form data to the FormSignUp component
          onChange={handleChange} // Handling input changes
          onSubmit={handleSubmit} // Handling form submission
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
