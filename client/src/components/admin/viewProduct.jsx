import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function adminViewProduct({ product }) {
  return (
    <div>
      <Card className="w-full max-w-sm mx-auto">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            <span className="text-sm font-bold">${product?.salePrice}</span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default adminViewProduct;
