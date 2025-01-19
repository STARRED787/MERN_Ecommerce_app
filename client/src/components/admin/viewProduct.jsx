import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import PropTypes from "prop-types";

function AdminViewProduct({
  product,
  setOpenCreateProductDialog,
  setFormData,
  setCurrentEditedId,
  handleDeleteProduct,
}) {
  return (
    <div>
      <Card className="w-full max-w-sm mx-auto">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>

          <h4>{product?.description}</h4>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              Rs.{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-sm font-bold">Rs.{product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              console.log("Editing Product: ", product);
              setOpenCreateProductDialog(true);
              setFormData(product);
              setCurrentEditedId(product?._id);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDeleteProduct(product._id)}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
AdminViewProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
  }).isRequired,
  setOpenCreateProductDialog: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  setCurrentEditedId: PropTypes.func.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
};

export default AdminViewProduct;
