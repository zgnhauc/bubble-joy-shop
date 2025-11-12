import { ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-xl">🧋</span>
          </div>
          <span className="text-xl font-bold text-foreground">BubbleJoy</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative transition-bounce hover:scale-110"
            onClick={() => navigate("/checkout")}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs gradient-button">
                {cartItemCount}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="transition-bounce hover:scale-110"
            onClick={() => navigate("/admin")}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
