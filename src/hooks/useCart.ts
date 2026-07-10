import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";
import { shopProducts } from "@/data/shopProducts";

export interface CartLine {
  slug: string;
  quantity: number;
}

const KEY = "premierSalt.cart";
const listeners = new Set<() => void>();

function readCart(): CartLine[] {
  return readStorage<CartLine[]>(KEY, []);
}

function writeCart(lines: CartLine[]) {
  writeStorage(KEY, lines);
  listeners.forEach((l) => l());
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(() => readCart());

  useEffect(() => {
    const listener = () => setLines(readCart());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const addItem = useCallback((slug: string, quantity: number) => {
    const product = shopProducts.find((p) => p.slug === slug);
    const current = readCart();
    const existing = current.find((l) => l.slug === slug);
    const maxStock = product?.stock ?? 99;
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, maxStock);
      writeCart([...current]);
    } else {
      writeCart([...current, { slug, quantity: Math.min(quantity, maxStock) }]);
    }
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    const product = shopProducts.find((p) => p.slug === slug);
    const maxStock = product?.stock ?? 99;
    const current = readCart();
    if (quantity <= 0) {
      writeCart(current.filter((l) => l.slug !== slug));
      return;
    }
    writeCart(current.map((l) => (l.slug === slug ? { ...l, quantity: Math.min(quantity, maxStock) } : l)));
  }, []);

  const removeItem = useCallback((slug: string) => {
    writeCart(readCart().filter((l) => l.slug !== slug));
  }, []);

  const clearCart = useCallback(() => writeCart([]), []);

  const items = lines
    .map((line) => {
      const product = shopProducts.find((p) => p.slug === line.slug);
      return product ? { ...line, product } : null;
    })
    .filter((v): v is CartLine & { product: (typeof shopProducts)[number] } => v !== null);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, subtotal, itemCount, addItem, updateQuantity, removeItem, clearCart };
}
