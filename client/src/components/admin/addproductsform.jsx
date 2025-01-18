import PropTypes from "prop-types"; // PropTypes for type-checking props
import { Formik, Field, Form, ErrorMessage } from "formik"; // Import Formik components
import * as Yup from "yup"; // Import Yup for validation

// Define validation schema with Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  brand: Yup.string().required("Brand is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  salePrice: Yup.number()
    .optional()
    .positive("Sale price must be a positive number"),
  totalStock: Yup.number()
    .required("Total stock is required")
    .positive("Total stock must be a positive number"),
});

function AddProductsForm({ onSubmit, buttonText }) {
  // Define initial form values
  const initialValues = {
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };

  return (
    <Formik
      initialValues={initialValues} // Set initial form data
      validationSchema={validationSchema} // Add validation schema
      onSubmit={(values) => {
        onSubmit(values); // Call parent onSubmit with form values
      }}
    >
      {() => (
        <Form className="space-y-4">
          {/* Title Field */}
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              placeholder="Enter product title"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Field
              id="description"
              name="description"
              as="textarea"
              placeholder="Enter product description"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Category Field */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <Field
              as="select"
              id="category"
              name="category"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
              <option value="beauty">Beauty</option>
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Brand Field */}
          <div className="flex flex-col">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <Field
              id="brand"
              name="brand"
              type="text"
              placeholder="Enter product brand"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <ErrorMessage
              name="brand"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Price Field */}
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <Field
              id="price"
              name="price"
              type="number"
              placeholder="Enter product price"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Sale Price Field */}
          <div className="flex flex-col">
            <label
              htmlFor="salePrice"
              className="block text-sm font-medium text-gray-700"
            >
              Sale Price
            </label>
            <Field
              id="salePrice"
              name="salePrice"
              type="number"
              placeholder="Enter sale price (optional)"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <ErrorMessage
              name="salePrice"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Total Stock Field */}
          <div className="flex flex-col">
            <label
              htmlFor="totalStock"
              className="block text-sm font-medium text-gray-700"
            >
              Total Stock
            </label>
            <Field
              id="totalStock"
              name="totalStock"
              type="number"
              placeholder="Enter total stock"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <ErrorMessage
              name="totalStock"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-orange-500 w-full text-white p-2 rounded-md"
            >
              {buttonText || "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

// Define prop types for better validation and debugging
AddProductsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // onSubmit function is required
  buttonText: PropTypes.string, // Optional button text
};

export default AddProductsForm;
