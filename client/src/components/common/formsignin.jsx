import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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
    onSubmit: async (values) => {
      try {
        // Dispatch the async loginUser action and await its result
        const data = await dispatch(loginUser(values));

        // Optionally handle successful login here
        console.log("Login successful:", data);

        toast.success("Successfully signed in!");
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred while logging in.");
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
    </form>
  );
}

// Prop Types validation
FormSignIn.propTypes = {
  buttonText: PropTypes.string,
};

export default FormSignIn;
