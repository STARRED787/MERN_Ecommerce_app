// AddProductsForm.jsx
import PropTypes from "prop-types"; // PropTypes is used for type-checking props

function AddProductsForm({ formData, setFormData, onSubmit, buttonText }) {
  // Handles input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData({
      ...formData, // Keep previous form data
      [name]: value, // Update only the field that changed
    });
  };

  // Define form fields in an array for reusability and cleaner code
  const formControls = [
    {
      label: "Title", // Field label
      name: "title", // Field name (used as key in formData)
      componentType: "Input", // Component type (input field)
      type: "text", // Input type
      placeholder: "Enter product title", // Placeholder for the input field
    },
    {
      label: "Description",
      name: "description",
      componentType: "Textarea", // Textarea for multi-line input
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "Select", // Dropdown menu for selecting a category
      options: [
        // Dropdown options
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
      componentType: "Input",
      type: "text",
      placeholder: "Enter product brand",
    },
    {
      label: "Price",
      name: "price",
      componentType: "Input",
      type: "number", // Number input for price
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "Input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "Input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

  return (
    // Form container
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        onSubmit(); // Call the provided onSubmit function
      }}
      className="space-y-4" // Tailwind CSS classes for spacing between fields
    >
      {/* Map over formControls to dynamically render form fields */}
      {formControls.map((element, index) => {
        const { label, name, componentType, type, placeholder, options } =
          element;

        return (
          <div key={index} className="flex flex-col">
            {/* Label for the form field */}
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>

            {/* Render input, textarea, or select based on componentType */}
            {componentType === "Input" ? (
              <input
                id={name} // Unique identifier for the field
                name={name} // Name used for formData key
                type={type} // Input type (text, number, etc.)
                placeholder={placeholder} // Placeholder text
                value={formData[name]} // Value from formData state
                onChange={handleInputChange} // Call handleInputChange on change
                className="mt-1 p-2 border border-gray-300 rounded-md w-full" // Styling for input
              />
            ) : componentType === "Textarea" ? (
              <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            ) : componentType === "Select" ? (
              <select
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                {/* Render dropdown options */}
                {options?.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        );
      })}
      {/* Submit button */}
      <div className="flex justify-end mt-4 ">
        <button
          type="submit" // Submit button
          className="bg-orange-500 w-full text-white p-2 rounded-md"
        >
          {buttonText || "Submit"} {/* Default button text is "Submit" */}
        </button>
      </div>
    </form>
  );
}

// Define prop types for better validation and debugging
AddProductsForm.propTypes = {
  formData: PropTypes.object.isRequired, // formData object is required
  setFormData: PropTypes.func.isRequired, // setFormData function is required
  onSubmit: PropTypes.func.isRequired, // onSubmit function is required
  buttonText: PropTypes.string, // Optional button text
};

export default AddProductsForm; // Export the component
