import PropTypes from "prop-types"; // Import PropTypes for validation
import { useFormik } from "formik"; // Import Formik for form handling
import * as Yup from "yup"; // Import Yup for validation
import { Label } from "@radix-ui/react-label"; // Radix UI for accessible labels

function FormSignIn({ onSubmit, buttonText }) {
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
      onSubmit(values); // Call the parent onSubmit function with form data
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
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
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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
        {buttonText || "Submit"}
      </button>
    </form>
  );
}

// Prop types validation
FormSignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

export default FormSignIn;
