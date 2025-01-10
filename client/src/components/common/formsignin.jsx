import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "@/store/auth-slice";

function FormSignIn({ buttonText }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        // Dispatch the async loginUser action with form values
        const data = await dispatch(loginUser(values)).unwrap();

        // Check if login was successful
        if (data?.payload?.success) {
          toast.success(data?.payload?.message || "Login successful!"); // Success message
        } else {
          // Handle failure case when user credentials are incorrect
          toast.error(data?.payload?.message || "Invalid login credentials."); // Failure message
        }
      } catch (error) {
        console.error("Login error:", error);

        // If error occurs (like incorrect username/password), show error notification
        toast.error("Username or password is incorrect.");
      } finally {
        // Reset form and set submitting to false after submission
        resetForm();
        setSubmitting(false); // Reset the form submission state
      }
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
          <label htmlFor="username" className="text-white text-sm font-medium">
            Username
          </label>
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
          <label htmlFor="password" className="text-white text-sm font-medium">
            Password
          </label>
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
      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all shadow-lg"
      >
        {buttonText || "Submit"}
      </button>
      <ToastContainer />
    </form>
  );
}

// Prop Types validation
FormSignIn.propTypes = {
  buttonText: PropTypes.string,
};

export default FormSignIn;
