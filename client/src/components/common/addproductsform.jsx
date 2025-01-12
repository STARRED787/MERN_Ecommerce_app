import PropTypes from "prop-types";

function AddProductsForm({
  formData,
  setFormData,
  formControls,
  onSubmit,
  buttonText,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          {buttonText || "Submit"}
        </button>
      </div>
    </form>
  );
}

AddProductsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  formControls: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      componentType: PropTypes.oneOf(["Input", "Textarea", "Select"])
        .isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

export default AddProductsForm;
