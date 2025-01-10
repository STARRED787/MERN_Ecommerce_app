import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "@radix-ui/react-label";
import PropTypes from "prop-types";

function FormSignUp({ onSubmit, buttonText }) {
  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values); // Pass form data to the parent component
    },
  });

  // Generate random username
  const generateUsername = () => {
    const randomUsername = `user_${Math.floor(Math.random() * 10000)}`;
    formik.setFieldValue("username", randomUsername);
  };

  return (
    <form
      className="bg-slate-800 shadow-lg rounded-lg p-5 w-full sm:w-[400px] mx-auto"
      onSubmit={formik.handleSubmit} // Formik's submit handler
    >
      <div className="flex flex-col gap-6">
        {/* Username Field */}
        <div className="grid w-full gap-2">
          <Label htmlFor="username" className="text-white text-sm font-medium">
            Username
          </Label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-lg"
              onClick={generateUsername} // Generate username on click
            >
              Auto-Generate
            </button>
          </div>
          {formik.touched.username && formik.errors.username ? (
            <p className="text-red-500 text-sm">{formik.errors.username}</p>
          ) : null}
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
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          ) : null}
        </div>

        {/* Email Field */}
        <div className="grid w-full gap-2">
          <Label htmlFor="email" className="text-white text-sm font-medium">
            Email
          </Label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          ) : null}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all shadow-lg"
        disabled={formik.isSubmitting}
      >
        {buttonText || "Submit"} {/* Default button text if not provided */}
      </button>
    </form>
  );
}

FormSignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

export default FormSignUp;
