import { Label } from "@radix-ui/react-label"; // Importing Radix UI's Label component for accessibility
import PropTypes from "prop-types"; // Importing PropTypes to validate the component props

// FormSignIn Component for rendering the sign-in form
function FormSignIn({ formData, onChange, onSubmit, buttonText }) {
  // Prop types for validating the props passed to the FormSignIn component
  FormSignIn.propTypes = {
    formData: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }).isRequired, // Expecting formData to have 'username' and 'password' keys
    onChange: PropTypes.func.isRequired, // onChange must be a function to handle input change
    onSubmit: PropTypes.func.isRequired, // onSubmit must be a function for form submission
    buttonText: PropTypes.string, // buttonText is optional, default will be 'Submit'
  };

  return (
    <form
      onSubmit={onSubmit} // Submit the form when the user clicks the button
      className="bg-slate-800 shadow-lg rounded-lg p-5 w-full sm:w-[400px] mx-auto"
    >
      <div className="flex flex-col gap-6">
        {/* Username Field */}
        <div className="grid w-full gap-2">
          <Label htmlFor="username" className="text-white text-sm font-medium">
            Username
          </Label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={formData.username || ""} // Bind form data value to input field
            onChange={onChange} // Trigger handleChange when input changes
          />
        </div>

        {/* Password Field */}
        <div className="grid w-full gap-2">
          <Label htmlFor="password" className="text-white text-sm font-medium">
            Password
          </Label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={formData.password || ""} // Bind form data value to input field
            onChange={onChange} // Trigger handleChange when input changes
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all shadow-lg"
      >
        {buttonText || "Submit"}{" "}
        {/* Display buttonText or default to 'Submit' */}
      </button>
    </form>
  );
}

export default FormSignIn; // Exporting the FormSignIn component for use in other files
