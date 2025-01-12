export const addProductFormElements = [
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
    componentType: "Select", // Changed to Select for ComboBox
    options: [
      { value: "", label: "Select a category" }, // Default option
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
