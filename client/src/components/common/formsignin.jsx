import { Label } from "@radix-ui/react-label"; // Importing Radix UI's Label component for accessibility
import PropTypes from "prop-types"; // Importing PropTypes to validate the component props
import { useDispatch } from "react-redux"; // Import useDispatch for dispatching actions to Redux
import { useFormik } from "formik"; // Import useFormik for Formik form management
import * as Yup from "yup"; // Import Yup for form validation schema
import { toast } from "react-toastify"; // Import react-toastify for notifications

// FormSignIn Component for rendering the sign-in form
function FormSignIn({ onSubmit, buttonText }) {
  // Redux dispatch hook
  const dispatch = useDispatch();

  // Formik setup for form validation and submission
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      // Dispatch action to Redux or send data to API
      dispatch({ type: "USER_SIGN_IN", payload: values });

      // Show success toast notification
      toast.success("Successfully signed in!");

      // Optionally handle form submission logic here
      onSubmit(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit} // Formik handles form submission
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
            value={formik.values.username} // Bind formik value to input field
            onChange={formik.handleChange} // Formik handles change
            onBlur={formik.handleBlur} // Formik handles blur
          />
          {/* Display error message if field is invalid */}
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.username}
            </div>
          )}
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
            value={formik.values.password} // Bind formik value to input field
            onChange={formik.handleChange} // Formik handles change
            onBlur={formik.handleBlur} // Formik handles blur
          />
          {/* Display error message if field is invalid */}
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </div>
          )}
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

// Prop Types validation
FormSignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

export default FormSignIn; // Exporting the FormSignIn component for use in other files
