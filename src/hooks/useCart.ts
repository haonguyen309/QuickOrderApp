import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Product } from "../types/product";

type CartState = Record<number, number>;

const STORAGE_KEY = "QUICK_ORDER_CART";
const MAX_QTY = 99;

export function useCart() {
  const [cart, setCart] = useState<CartState>({});

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setCart(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const updateQty = useCallback((productId: number, delta: number) => {
    setCart(prev => {
      const current = prev[productId] ?? 0;
      const next = Math.min(MAX_QTY, Math.max(0, current + delta));

      if (next === 0) {
        const clone = { ...prev };
        delete clone[productId];
        return clone;
      }

      return { ...prev, [productId]: next };
    });
  }, []);

  const setQuantity = useCallback((productId: number, qty: number) => {
    setCart(prev => {
      const next = Math.min(MAX_QTY, Math.max(0, qty));

      if (next === 0) {
        const clone = { ...prev };
        delete clone[productId];
        return clone;
      }

      return { ...prev, [productId]: next };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  const getTotals = useCallback((products: Product[]) => {
    let skuCount = 0;
    let totalQty = 0;
    let totalAmount = 0;

    for (const p of products) {
      const qty = cart[p.id] ?? 0;
      if (qty > 0) {
        skuCount++;
        totalQty += qty;
        totalAmount += qty * p.price;
      }
    }

    return { skuCount, totalQty, totalAmount };
  }, [cart]);

  return { cart, updateQty, setQuantity, clearCart, getTotals };
}
