// AddProductsForm.jsx
import PropTypes from "prop-types";

function AddProductsForm({ formData, setFormData, onSubmit, buttonText }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form fields defined directly inside the component
  const formControls = [
    {
      label: "Title",
      name: "title",
      componentType: "Input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "Textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "Select",
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
      componentType: "Input",
      type: "text",
      placeholder: "Enter product brand",
    },
    {
      label: "Price",
      name: "price",
      componentType: "Input",
      type: "number",
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      {formControls.map((element, index) => {
        const { label, name, componentType, type, placeholder, options } =
          element;

        return (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>

            {componentType === "Input" ? (
              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded-md"
        >
          {buttonText || "Submit"}
        </button>
      </div>
    </form>
  );
}

AddProductsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

export default AddProductsForm;
