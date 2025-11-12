import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden gradient-card shadow-card hover:shadow-bubble transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full gradient-button shadow-bubble transition-bounce hover:scale-105"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
