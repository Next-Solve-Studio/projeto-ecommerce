"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Product } from "../data/products";
import { getProductPriceWithVariants } from "../data/products";

interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    variants?: Record<string, string>,
  ) => void;
  removeFromCart: (
    productId: string,
    variants?: Record<string, string>,
  ) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variants?: Record<string, string>,
  ) => void;
  getTotal: () => number;
  getItemCount: () => number;
  clearCart: () => void;
}

const CART_STORAGE_KEY = "@ProjetoEcommerce:cart";
const CART_STORAGE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

interface SavedCart {
  items: CartItem[];
  expiresAt: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const isVariantsEqual = (
  v1?: Record<string, string>,
  v2?: Record<string, string>,
) => {
  const obj1 = v1 || {};
  const obj2 = v2 || {};
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;
  return keys1.every((key) => obj1[key] === obj2[key]);
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart) as SavedCart;
        if (parsed?.expiresAt && parsed.expiresAt > Date.now() && Array.isArray(parsed.items)) {
          setItems(parsed.items);
        } else {
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Erro ao carregar o carrinho do localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      const savedCart: SavedCart = {
        items,
        expiresAt: Date.now() + CART_STORAGE_TTL_MS,
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(savedCart));
    }
  }, [items, isMounted]);

  const addToCart = (
    product: Product,
    quantity: number,
    variants?: Record<string, string>,
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          isVariantsEqual(item.selectedVariants, variants),
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [...prev, { product, quantity, selectedVariants: variants }];
    });
  };

  const removeFromCart = (
    productId: string,
    variants?: Record<string, string>,
  ) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            isVariantsEqual(item.selectedVariants, variants)
          ),
      ),
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    variants?: Record<string, string>,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, variants);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        isVariantsEqual(item.selectedVariants, variants)
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const getTotal = () => {
    return items.reduce(
      (sum, item) =>
        sum +
        getProductPriceWithVariants(item.product, item.selectedVariants) *
          item.quantity,
      0,
    );
  };

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        getItemCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usada dentro de um CartProvider");
  }
  return context;
}
