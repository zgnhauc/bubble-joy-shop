import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard, { Product } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-boba.jpg";
import jasmineImage from "@/assets/boba-jasmine.jpg";
import strawberryImage from "@/assets/boba-strawberry.jpg";
import caramelImage from "@/assets/boba-caramel.jpg";
import taroImage from "@/assets/boba-taro.jpg";
import matchaImage from "@/assets/boba-matcha.jpg";
import mangoImage from "@/assets/boba-mango.jpg";

const products: Product[] = [
  {
    id: "1",
    name: "Jasmine Milk Tea",
    description: "Fragrant jasmine tea with creamy milk and chewy pearls",
    price: 5.99,
    image: jasmineImage,
  },
  {
    id: "2",
    name: "Strawberry Bliss",
    description: "Fresh strawberries blended with sweet milk tea",
    price: 6.49,
    image: strawberryImage,
  },
  {
    id: "3",
    name: "Caramel Dream",
    description: "Rich caramel flavor with a smooth, creamy finish",
    price: 6.29,
    image: caramelImage,
  },
  {
    id: "4",
    name: "Taro Paradise",
    description: "Classic taro flavor with a velvety purple hue",
    price: 6.49,
    image: taroImage,
  },
  {
    id: "5",
    name: "Matcha Magic",
    description: "Premium matcha green tea with a perfect balance",
    price: 6.99,
    image: matchaImage,
  },
  {
    id: "6",
    name: "Mango Tango",
    description: "Tropical mango sweetness in every sip",
    price: 6.49,
    image: mangoImage,
  },
];

const Home = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart! 🎉",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar cartItemCount={cart.length} />

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src={heroImage}
          alt="Colorful boba tea drinks"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-4 animate-float">
            Welcome to BubbleJoy! 🧋
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mb-8">
            Sip happiness with our delicious bubble tea flavors!
          </p>
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-bubble-pink animate-bubble" style={{ animationDelay: "0s" }} />
            <div className="h-16 w-16 rounded-full bg-bubble-hot animate-bubble" style={{ animationDelay: "0.5s" }} />
            <div className="h-10 w-10 rounded-full bg-bubble-soft animate-bubble" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Flavors 🎨
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each drink is crafted with love and topped with our signature chewy tapioca pearls!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            Made with 💖 by BubbleJoy | Bringing joy one sip at a time!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
