import FormSignIn from "@/components/common/formsignIn"; // Importing the reusable CommonForm component
import { useState } from "react"; // Importing useState hook for managing component state

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("SignIn Data:", formData);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Container for the form with styling */}
      <div className="w-full max-w-lg bg-slate-400 shadow-md rounded-lg p-5">
        {/* Form Header */}
        <h1 className="text-2xl font-semibold text-center mb-4">Sign In</h1>
        <p className="text-sm text-gray-600 text-center mb-6">Please login .</p>

        {/* Reusable FormSignIn component is used here */}
        <FormSignIn
          formData={formData} // Passing form data to the FormSignIn component
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

export default SignIn; // Exporting the SignIn component for use in other parts of the app
