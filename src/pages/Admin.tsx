import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, DollarSign, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: "pending" | "preparing" | "completed";
  date: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    items: "Jasmine Milk Tea x2, Strawberry Bliss x1",
    total: 18.47,
    status: "preparing",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    items: "Caramel Dream x1, Taro Paradise x1",
    total: 12.78,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Carol White",
    items: "Matcha Magic x3",
    total: 20.97,
    status: "pending",
    date: "2024-01-16",
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const updateOrderStatus = (id: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Order updated",
      description: `Order ${id} status changed to ${newStatus}`,
    });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Product added! ✨",
      description: `${newProduct.name} has been added to the menu.`,
    });
    setNewProduct({ name: "", description: "", price: "" });
  };

  const stats = {
    totalOrders: orders.length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
    activeCustomers: new Set(orders.map((o) => o.customer)).size,
    growthRate: 23.5,
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "preparing":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 transition-bounce hover:scale-105"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          Admin Dashboard 📊
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <h3 className="text-3xl font-bold text-foreground mt-1">
                    {stats.totalOrders}
                  </h3>
                </div>
                <Package className="h-12 w-12 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <h3 className="text-3xl font-bold text-foreground mt-1">
                    ${stats.revenue.toFixed(2)}
                  </h3>
                </div>
                <DollarSign className="h-12 w-12 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Customers</p>
                  <h3 className="text-3xl font-bold text-foreground mt-1">
                    {stats.activeCustomers}
                  </h3>
                </div>
                <Users className="h-12 w-12 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Growth</p>
                  <h3 className="text-3xl font-bold text-foreground mt-1">
                    +{stats.growthRate}%
                  </h3>
                </div>
                <TrendingUp className="h-12 w-12 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card className="gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {order.items}
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {order.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateOrderStatus(order.id, "preparing")
                                }
                              >
                                Start
                              </Button>
                            )}
                            {order.status === "preparing" && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateOrderStatus(order.id, "completed")
                                }
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card className="gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        placeholder="e.g., Lychee Delight"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Price</Label>
                      <Input
                        id="productPrice"
                        type="number"
                        step="0.01"
                        placeholder="6.99"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, price: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Description</Label>
                    <Input
                      id="productDescription"
                      placeholder="Describe your delicious creation..."
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="gradient-button shadow-bubble transition-bounce hover:scale-105"
                  >
                    Add Product ✨
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
