import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "react-toastify";
import PropTypes from "prop-types";

function FormSignIn({ buttonText }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (formData, { resetForm, setSubmitting }) => {
      try {
        dispatch(loginUser(formData)).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: data?.payload?.message,
            });
          } else {
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            });
          }
        });
      } catch (error) {
        console.error("Login error:", error);
        // If error occurs (like incorrect username/password), show error notification
        toast.error(error.message || "Username or password is incorrect.");
      } finally {
        resetForm(); // Reset the form after submission
        setSubmitting(false); // Reset submitting state
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
          <label htmlFor="password" className="text-white text-sm font-medium">
            Password
          </label>
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

      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all shadow-lg"
        disabled={isLoading} // Disable the button when loading
      >
        {buttonText || "Submit"}
      </button>

      <ToastContainer />
    </form>
  );
}

FormSignIn.propTypes = {
  buttonText: PropTypes.string,
};

export default FormSignIn;
