import CommonForm from "@/components/common/form";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    bio: "",
    gender: "",
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
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please fill out the form to create an account.
        </p>

        {/* Common Form Component */}
        <CommonForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          buttonText="Register"
        />

        {/* Already Registered? */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
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
