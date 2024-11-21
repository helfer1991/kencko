'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
	productId: string;
	quantity: number;
};

type CartContextType = {
	items: CartItem[];
	updateItem: (productId: string, quantity: number) => Promise<void>;
	getItemQuantity: (productId: string) => number;
	totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);

	// Load initial cart from localStorage
	useEffect(() => {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			setItems(JSON.parse(savedCart));
		}
	}, []);

	const updateItem = async (productId: string, quantity: number) => {
		const newItems = [...items];
		const existingIndex = newItems.findIndex(
			(item) => item.productId === productId
		);

		if (existingIndex >= 0) {
			if (quantity === 0) {
				newItems.splice(existingIndex, 1);
			} else {
				newItems[existingIndex].quantity = quantity;
			}
		} else if (quantity > 0) {
			newItems.push({ productId, quantity });
		}

		setItems(newItems);
		localStorage.setItem('cart', JSON.stringify(newItems));
	};

	const getItemQuantity = (productId: string) => {
		return items.find((item) => item.productId === productId)?.quantity || 0;
	};

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{ items, updateItem, getItemQuantity, totalItems }}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
