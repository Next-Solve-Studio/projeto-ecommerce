"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { categories } from "@/data/products";
import {
  Package,
  ShoppingCart,
  BarChart3,
  Home,
  Menu,
  X,
  Search,
  Edit,
  Trash2,
  Eye,
  Clock,
  TrendingUp,
  DollarSign,
  Plus,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Controller, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const paymentLabel: Record<string, string> = {
  PIX: "PIX",
  CREDIT_CARD: "Cartão de Crédito",
};

const shippingLabel: Record<string, string> = {
  standard: "Entrega padrão",
  express: "Entrega expressa",
  pickup: "Retirada em loja",
};

const orderStatusLabels: Record<string, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

const orderStatusClasses: Record<string, string> = {
  PENDING: "bg-warning/10 text-warning border-warning/20",
  PROCESSING: "bg-primary/10 text-primary border-primary/20",
  PAID: "bg-success/10 text-success border-success/20",
  SHIPPED: "bg-accent/10 text-accent border-accent/20",
  DELIVERED: "bg-muted text-muted-foreground border-muted",
  CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
};

const newProductSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .max(50, "Máximo de 50 caracteres"),
  price: yup
    .string()
    .required("Preço é obrigatório")
    .test("money-format", "Preço inválido", (value) => {
      if (!value) return false;
      const digits = value.replace(/\D/g, "");
      return digits.length >= 1 && digits.length <= 8;
    }),
  stockQty: yup
    .string()
    .required("Estoque é obrigatório")
    .matches(/^[0-9]+$/, "Apenas números")
    .max(4, "Máximo de 4 dígitos"),
  category: yup.string().required("Categoria é obrigatória"),
  imageUrl: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .nullable()
    .notRequired()
    .url("URL inválida"),
  description: yup
    .string()
    .required("Descrição é obrigatória")
    .max(1000, "Máximo de 1000 caracteres"),
  featured: yup.boolean().default(false).notRequired(),
});

type OrderStatus = keyof typeof orderStatusLabels;

type NewProductFormData = yup.InferType<typeof newProductSchema>;

type AdminProduct = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number | null;
  stockQty: number;
  description?: string | null;
  category?: { name: string } | null;
  imageUrl?: string | null;
  featured?: boolean;
};

type AdminOrder = {
  id: string;
  orderNumber: string;
  totalAmount: number;
  shippingCost: number;
  shippingType: string;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  user: { name: string; email: string };
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  items: Array<{
    id: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    variantInfo?: string | null;
  }>;
};

export default function AdminComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<AdminOrder | null>(null);
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<NewProductFormData>({
    resolver: yupResolver(newProductSchema) as Resolver<NewProductFormData>,
    mode: "onTouched",
    defaultValues: {
      name: "",
      price: "",
      stockQty: "",
      category: categories[0] ?? "Eletrônicos",
      imageUrl: "",
      description: "",
      featured: false,
    },
  });

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(value));

  const getStockClass = (stockQty: number) => {
    if (stockQty < 10) return "text-destructive font-semibold";
    if (stockQty < 20) return "text-amber-600 font-semibold";
    return "text-foreground font-semibold";
  };

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch("/api/admin/produtos");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await fetch("/api/admin/pedidos");
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Erro ao carregar pedidos", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [products, searchQuery],
  );

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesSearch =
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [orders, searchQuery, statusFilter],
  );

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + order.totalAmount, 0),
    [orders],
  );

  const lowStockCount = useMemo(
    () => products.filter((product) => product.stockQty < 10).length,
    [products],
  );

  const totalProducts = products.length;
  const totalOrders = orders.length;

  const monthlySales = useMemo(() => {
    const sales: Record<string, number> = {};
    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
      if (!sales[month]) {
        sales[month] = 0;
      }
      sales[month] += order.totalAmount;
    });
    return Object.entries(sales)
      .map(([name, total]) => ({ name, total }))
      .reverse();
  }, [orders]);

  const categorySales = useMemo(() => {
    const sales: Record<string, number> = {};
    const categoryColors: Record<string, string> = {
      Eletrônicos: "#3b82f6",
      Roupas: "#8b5cf6",
      Livros: "#10b981",
      Casa: "#f97316",
      Esportes: "#ef4444",
      Beleza: "#ec4899",
    };

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const product = products.find((p) => p.name === item.productName);
        if (product && product.category?.name) {
          const categoryName = product.category.name;
          if (!sales[categoryName]) {
            sales[categoryName] = 0;
          }
          sales[categoryName] += item.quantity;
        }
      });
    });

    return Object.entries(sales).map(([name, value], index) => ({
      name,
      value,
      fill:
        categoryColors[name] ||
        `hsl(220, ${Math.floor(Math.random() * 40 + 60)}%, ${Math.floor(Math.random() * 20 + 50)}%)`,
    }));
  }, [orders, products]);

  const conversionRate = totalOrders > 0 ? (orders.filter((o) => o.status === "PAID" || o.status === "DELIVERED").length / totalOrders) * 100 : 0;

  const formatCurrencyInput = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const limited = digits.slice(0, 8);
    const amount = Number(limited || "0");
    const cents = (amount % 100).toString().padStart(2, "0");
    const integerPart = Math.floor(amount / 100)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${integerPart},${cents}`;
  };

  const handleCreateProduct = async (data: NewProductFormData) => {
    setCreatingProduct(true);
    setMessage(null);
    try {
      const price = parseFloat(
        data.price.replace(/\./g, "").replace(",", ".") || "0",
      );
      const payload = {
        name: data.name,
        price,
        stockQty: Number(data.stockQty),
        category: data.category,
        imageUrl: data.imageUrl || undefined,
        description: data.description,
        featured: data.featured,
      };

      const response = await fetch("/api/admin/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao criar produto");
      }

      await loadProducts();
      setIsCreateOpen(false);
      reset({
        name: "",
        price: "",
        stockQty: "0",
        category: categories[0] ?? "Eletrônicos",
        imageUrl: "",
        description: "",
        featured: false,
      });
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setCreatingProduct(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    setUpdatingProduct(true);
    setMessage(null);
    try {
      const payload = {
        name: editingProduct.name,
        price: editingProduct.price,
        stockQty: editingProduct.stockQty,
        category: editingProduct.category?.name || categories[0],
        imageUrl: editingProduct.imageUrl,
        description: editingProduct.description,
        featured: editingProduct.featured,
      };

      const response = await fetch(
        `/api/admin/produtos?id=${encodeURIComponent(editingProduct.id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao atualizar produto");
      }

      await loadProducts();
      setIsEditOpen(false);
      setEditingProduct(null);
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setUpdatingProduct(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    setDeletingProduct(true);
    setMessage(null);
    try {
      const response = await fetch(
        `/api/admin/produtos?id=${encodeURIComponent(productToDelete.id)}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao excluir produto");
      }

      await loadProducts();
      setIsDeleteOpen(false);
      setProductToDelete(null);
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setDeletingProduct(false);
    }
  };

  const navItems = [
    { id: "products", label: "Produtos", icon: Package },
    { id: "orders", label: "Pedidos", icon: ShoppingCart },
    { id: "reports", label: "Relatórios", icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F9FA]">
      <div className="hidden lg:block w-56 flex-shrink-0">
        <aside className="fixed top-0 bottom-0 left-0 w-[72px] hover:w-56 flex-shrink-0 border-r border-gray-300/40 bg-[#07121D] transition-all duration-300 overflow-hidden group z-50">
          <div className="flex h-full flex-col w-full">
            <div className="flex h-16 items-center gap-3 border-b border-gray-300/40 px-5 overflow-hidden">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                <img 
                src="/Logo/Logo-ElectronicSolve_Store.png" 
                alt="ElectronicSolve Store" 
                className="h-16 w-auto object-contain" 
                />
              </div>
              <span className="text-lg text-white font-bold text-sidebar-foreground whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Admin
              </span>
            </div>
            <nav className="flex-1 space-y-2 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}                    
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-all duration-150 ${
                      activeTab === item.id
                        ? "bg-[#122334] text-[#43C180]"
                        : "text-[#939DA9] hover:bg-[#122334]"
                    }`}
                    title={item.label}                    
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="overflow-hidden whitespace-nowrap transition-all duration-300 w-0 opacity-0 group-hover:w-full group-hover:opacity-100">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
            <div className="border-t border-gray-300/40 p-3">
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 border-sidebar-border bg-sidebar text-[#ef4444] hover:bg-sidebar-accent hover:text-[#ef4444]/80 px-[14px] py-3 h-auto font-medium"
                  title="Voltar à Loja"
                >
                  <Home className="h-5 w-5 flex-shrink-0" />
                  <span className="overflow-hidden whitespace-nowrap transition-all duration-300 w-0 opacity-0 group-hover:w-full group-hover:opacity-100">
                    Voltar à Loja
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 border-r border-gray-300/40 bg-sidebar">
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center justify-between border-b border-gray-300/40 px-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                    <span className="text-sm font-bold text-sidebar-primary-foreground">E</span>
                  </div>
                  <span className="text-lg font-bold text-sidebar-foreground">Admin Eletrônicos</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-sidebar-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-all duration-150 ${
                        activeTab === item.id
                          ? "bg-[#122334] text-[#43C180]"
                          : "text-[#939DA9] hover:bg-[#122334]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
              <div className="border-t border-gray-300/40 p-4">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-sidebar-border bg-sidebar text-[#ef4444] hover:bg-sidebar-accent hover:text-[#ef4444]/80 py-2.5 h-auto font-medium"
                  >
                    <Home className="h-5 w-5" />
                    Voltar à Loja
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 shadow-sm border-gray-300/40 border-1 rounded !bg-white px-4 mx-4 mt-4 lg:px-6 lg:mx-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold capitalize text-foreground">
            {navItems.find((item) => item.id === activeTab)?.label}
          </h1>
          <div className="ml-auto flex items-center gap-4">
            {(activeTab === "products" || activeTab === "orders") && (
              <div className="relative bg-[#011C40] rounded-sm hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar..."                  
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9 text-white bg-secondary border-0 placeholder:text-gray-400"
                />
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {message && (
            <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive">
              {message}
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Produtos</p>
                      <p className="text-2xl font-semibold">{totalProducts}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-full bg-success/10 p-3 text-success">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Receita total</p>
                      <p className="text-2xl font-semibold">{formatPrice(totalRevenue)}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-full bg-warning/10 p-3 text-warning">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pedidos</p>
                      <p className="text-2xl font-semibold">{totalOrders}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-full bg-warning/10 p-3 text-warning">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estoque baixo</p>
                      <p className="text-2xl font-semibold">{lowStockCount}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-sm border-gray-200 border-1 rounded">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-semibold">Gerenciar Produtos</CardTitle>
                  <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Novo produto
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      onInteractOutside={(e) => e.preventDefault()}
                      className="sm:max-w-[600px] rounded border border-gray-300/40 bg-white"
                    >
                      <DialogHeader>
                        <DialogTitle>Adicionar produto</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-4 py-2">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <Label className="mb-2" htmlFor="product-name">Nome do produto</Label>
                              <Input
                                autoFocus
                                id="product-name"
                                className="!bg-[#EEF9FF] rounded-lg border border-gray-300"
                                placeholder="Nome do produto"
                                {...register("name")}
                              />
                              {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label className="mb-2" htmlFor="product-price">Preço</Label>
                              <Input
                                id="product-price"
                                className="!bg-[#EEF9FF] rounded-lg border border-gray-300"
                                placeholder="0,00"
                                value={watch("price")}
                                onChange={(e) =>
                                  setValue(
                                    "price",
                                    formatCurrencyInput(e.target.value),
                                    { shouldValidate: true },
                                  )
                                }
                              />
                              {errors.price && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.price.message}
                                </p>
                              )}
                            </div>
                          </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <Label className="mb-2" htmlFor="product-stock">Estoque</Label>
                              <Input
                                id="product-stock"
                                className="!bg-[#EEF9FF] rounded-lg border border-gray-300"                                
                                placeholder="15"
                                value={watch("stockQty")}
                                onChange={(e) => {
                                  const digits = e.target.value.replace(/\D/g, "");
                                  setValue("stockQty", digits.slice(0, 4), {
                                    shouldValidate: true,
                                  });
                                }}
                              />
                              {errors.stockQty && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.stockQty.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label className="mb-2" htmlFor="product-category">Categoria</Label>
                              <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    value={field.value}
                                    onValueChange={(value) => field.onChange(value)}
                                  >
                                    <SelectTrigger className="!bg-[#EEF9FF] rounded-lg border border-gray-300"id="product-category">
                                      <SelectValue placeholder="Categoria" />
                                    </SelectTrigger>
                                    <SelectContent className="!bg-white rounded-lg border border-gray-300">
                                      {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                          {category}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              {errors.category && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.category.message}
                                </p>
                              )}
                            </div>
                          </div>
                        <div>
                            <Label className="mb-2" htmlFor="product-image">URL da imagem</Label>
                            <Input
                              id="product-image"
                              className="!bg-[#EEF9FF] rounded-lg border border-gray-300"
                              placeholder="https://..."
                              {...register("imageUrl")}
                            />
                            {errors.imageUrl && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.imageUrl.message}
                              </p>
                            )}
                          </div>
                        <div>
                            <Label className="mb-2" htmlFor="product-description">Descrição</Label>
                            <Input
                              id="product-description"
                              className="!bg-[#EEF9FF] rounded-lg border border-gray-300"
                              placeholder="Breve descrição do produto"
                              {...register("description")}
                            />
                            {errors.description && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                              </p>
                            )}
                          </div>
                        <DialogFooter className="!mt-8">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                              setIsCreateOpen(false);
                              reset({
                                name: "",
                                price: "",
                                stockQty: "",
                                category: categories[0] ?? "Eletrônicos",
                                imageUrl: "",
                                description: "",
                                featured: false,
                              });
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button type="submit" disabled={!isValid || creatingProduct}>
                            {creatingProduct ? "Salvando..." : "Salvar produto"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Produto</TableHead>
                          <TableHead className="font-semibold">Categoria</TableHead>
                          <TableHead className="font-semibold">Preço</TableHead>
                          <TableHead className="font-semibold">Estoque</TableHead>
                          <TableHead className="font-semibold">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                {product.imageUrl?.trim() ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-8 w-8 flex-shrink-0 rounded-lg border border-gray-200 object-cover"
                                  />
                                ) : (
                                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#07121D]">
                                    <span className="font-bold text-white">
                                      {product.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                <span>{product.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {product.category?.name ?? "Sem categoria"}
                            </TableCell>
                            <TableCell>{formatPrice(product.price)}</TableCell>
                            <TableCell className={getStockClass(product.stockQty)}>
                              {product.stockQty}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingProduct(product);
                                    setIsEditOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setProductToDelete(product);
                                    setIsDeleteOpen(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Editar produto</DialogTitle>
                  </DialogHeader>
                  {editingProduct && (
                    <div className="space-y-4 py-2">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="edit-product-name">Nome</Label>
                          <Input
                            id="edit-product-name"
                            value={editingProduct.name}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-product-price">Preço</Label>
                          <Input
                            id="edit-product-price"
                            type="number"
                            min={0}
                            step={0.01}
                            value={editingProduct.price}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                price: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="edit-product-stock">Estoque</Label>
                          <Input
                            id="edit-product-stock"
                            type="number"
                            min={0}
                            value={editingProduct.stockQty}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                stockQty: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-product-category">Categoria</Label>
                          <Select
                            value={editingProduct.category?.name ?? categories[0]}
                            onValueChange={(value) =>
                              setEditingProduct({
                                ...editingProduct,
                                category: { name: value },
                              })
                            }
                          >
                            <SelectTrigger id="edit-product-category">
                              <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="edit-product-image">URL da imagem</Label>
                        <Input
                          id="edit-product-image"
                          value={editingProduct.imageUrl ?? ""}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              imageUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-product-description">Descrição</Label>
                        <Input
                          id="edit-product-description"
                          value={editingProduct.description ?? ""}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={Boolean(editingProduct.featured)}
                          onCheckedChange={(checked) =>
                            setEditingProduct({
                              ...editingProduct,
                              featured: Boolean(checked),
                            })
                          }
                          id="edit-featured-product"
                        />
                        <Label htmlFor="edit-featured-product">Produto em destaque</Label>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            setIsEditOpen(false);
                            setEditingProduct(null);
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleUpdateProduct} disabled={updatingProduct}>
                          {updatingProduct ? "Atualizando..." : "Salvar alterações"}
                        </Button>
                      </DialogFooter>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[520px]">
                  <DialogHeader>
                    <DialogTitle>Excluir produto</DialogTitle>
                  </DialogHeader>
                  <div className="py-2">
                    <p>
                      Tem certeza que deseja excluir o produto{' '}
                      <strong>{productToDelete?.name}</strong>? Essa ação não pode ser desfeita.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsDeleteOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteProduct}
                      disabled={deletingProduct}
                    >
                      {deletingProduct ? "Excluindo..." : "Excluir"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Pedidos pendentes</p>
                    <p className="text-2xl font-semibold">{orders.filter((o) => o.status === "PENDING").length}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Em processamento</p>
                    <p className="text-2xl font-semibold">{orders.filter((o) => o.status === "PROCESSING").length}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Pedidos pagos</p>
                    <p className="text-2xl font-semibold">{orders.filter((o) => o.status === "PAID").length}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Enviados</p>
                    <p className="text-2xl font-semibold">{orders.filter((o) => o.status === "SHIPPED").length}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Receita total</p>
                    <p className="text-2xl font-semibold">{formatPrice(totalRevenue)}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="font-semibold">Acompanhamento de Pedidos</CardTitle>
                  <Select value={statusFilter} onValueChange={setStatusFilter} >
                    <SelectTrigger className="w-full sm:w-auto sm:min-w-[180px] bg-[#07121D] text-white border-gray-300/40">
                      <SelectValue placeholder="Filtrar status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#07121D] text-white border-gray-300/40">
                      <SelectItem value="all">Todos</SelectItem>
                      {Object.entries(orderStatusLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value} className="focus:bg-slate-700">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
                    <DialogContent className="sm:max-w-[700px]">
                      <DialogHeader>
                        <DialogTitle>Detalhes do pedido</DialogTitle>
                      </DialogHeader>
                      {viewingOrder && (
                        <div className="space-y-4 py-2">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Número do pedido</p>
                              <p className="text-base font-semibold">{viewingOrder.orderNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Status</p>
                              <Badge className={orderStatusClasses[viewingOrder.status] || "bg-muted text-muted-foreground"}>
                                {orderStatusLabels[viewingOrder.status]}
                              </Badge>
                            </div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Cliente</p>
                              <p>{viewingOrder.user.name}</p>
                              <p className="text-sm text-muted-foreground">{viewingOrder.user.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Pagamento</p>
                              <p>{paymentLabel[viewingOrder.paymentMethod] || viewingOrder.paymentMethod}</p>
                            </div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Endereço</p>
                              <p>
                                {viewingOrder.address.street}, {viewingOrder.address.number}
                              </p>
                              <p>
                                {viewingOrder.address.neighborhood} - {viewingOrder.address.city}/{viewingOrder.address.state}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total</p>
                              <p className="text-lg font-semibold">{formatPrice(viewingOrder.totalAmount)}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Itens</p>
                            <div className="space-y-2">
                              {viewingOrder.items.map((item) => (
                                <div key={item.id} className="rounded-lg border border-border p-3">
                                  <p className="font-medium">{item.productName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {item.quantity}x {formatPrice(item.unitPrice)}
                                  </p>
                                  {item.variantInfo && (
                                    <p className="text-sm text-muted-foreground">{item.variantInfo}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => setIsViewOrderOpen(false)}>Fechar</Button>
                          </DialogFooter>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Pedido</TableHead>
                          <TableHead className="font-semibold">Cliente</TableHead>
                          <TableHead className="font-semibold">Total</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Pagamento</TableHead>
                          <TableHead className="font-semibold">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.orderNumber}</TableCell>
                            <TableCell>{order.user.name}</TableCell>
                            <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                            <TableCell>
                              <Badge className={orderStatusClasses[order.status] || "bg-muted text-muted-foreground"}>
                                {orderStatusLabels[order.status]}
                              </Badge>
                            </TableCell>
                            <TableCell>{paymentLabel[order.paymentMethod] || order.paymentMethod}</TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setViewingOrder(order);
                                  setIsViewOrderOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Produtos ativos</p>
                      <p className="text-2xl font-semibold">{totalProducts}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-xl bg-success/10 p-3 text-success">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pedidos finalizados</p>
                      <p className="text-2xl font-semibold">{orders.filter((order) => order.status === "DELIVERED").length}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-xl bg-warning/10 p-3 text-warning">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pedidos em espera</p>
                      <p className="text-2xl font-semibold">{orders.filter((order) => order.status === "PENDING").length}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="rounded-xl bg-muted text-muted-foreground p-3">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Taxa de conversão</p>
                      <p className="text-2xl font-semibold">{conversionRate.toFixed(1)}%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardHeader>
                    <CardTitle>Resumo de vendas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Receita Total</p>
                        <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ticket Médio</p>
                        <p className="text-2xl font-bold">{formatPrice(totalOrders > 0 ? totalRevenue / totalOrders : 0)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white">
                  <CardHeader>
                    <CardTitle>Estoque crítico</CardTitle>
                  </CardHeader>
                  <CardContent>                    
                    {products.filter(p => p.stockQty < 10).length > 0 ? (
                      <ul className="space-y-2">
                        {products
                          .filter(p => p.stockQty < 10)
                          .sort((a, b) => a.stockQty - b.stockQty)
                          .slice(0, 5)
                          .map(product => (
                            <li key={product.id} className="flex justify-between items-center text-sm">
                              <span>{product.name}</span>
                              <Badge variant="destructive">{product.stockQty} unid.</Badge>
                            </li>
                          ))
                        }
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">Nenhum produto com estoque baixo.</p>
                    )}
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Vendas Mensais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlySales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => formatPrice(value as number)} />
                        <Tooltip formatter={(value) => formatPrice(value as number)} />
                        <Legend />
                        <Bar dataKey="total" fill="#16a34a" name="Faturamento" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-200 border-1 rounded bg-white lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Categorias Mais Vendidas</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    {categorySales.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categorySales}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => percent ? `${name} ${(percent * 100).toFixed(0)}%` : name}
                          />
                          <Tooltip formatter={(value) => `${value} unidades`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-sm text-muted-foreground p-8">Não há dados de vendas por categoria.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
