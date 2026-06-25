"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Order } from "./types";

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

const STORAGE_KEY = "linkmarket.orders";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setOrders(JSON.parse(raw));
      } catch {
        setOrders([]);
      }
    }
  }, []);

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const next = [order, ...prev];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return <OrdersContext.Provider value={{ orders, addOrder }}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
