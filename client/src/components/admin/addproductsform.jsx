import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup for validation schema
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function AddProductsForm({ onSubmit, buttonText }) {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(50, "Title cannot exceed 50 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(200, "Description cannot exceed 200 characters"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be greater than zero"),
    salePrice: Yup.number()
      .optional()
      .positive("Sale price must be greater than zero")
      .max(Yup.ref("price"), "Sale price must be less than price"),
    totalStock: Yup.number()
      .required("Total stock is required")
      .min(0, "Stock cannot be negative"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      salePrice: "",
      totalStock: "",
    },
    validationSchema, // Attach validation schema
    onSubmit: (values, { resetForm }) => {
      if (!formik.isValid) {
        toast.error("Please fill out all required fields!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      onSubmit(values); // Trigger the parent component's onSubmit function
      resetForm(); // Reset the form after submission
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  // Form fields array
  const formControls = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      options: [
        { value: "", label: "Select a category" },
        { value: "electronics", label: "Electronics" },
        { value: "clothing", label: "Clothing" },
        { value: "home", label: "Home" },
        { value: "sports", label: "Sports" },
        { value: "beauty", label: "Beauty" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Enter product brand",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

  return (
    <div>
      {/* Toast Container for showing notifications */}
      <ToastContainer />

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {formControls.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            )}
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-orange-500 w-full text-white p-2 rounded-md"
          >
            {buttonText || "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

AddProductsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

export default AddProductsForm;
