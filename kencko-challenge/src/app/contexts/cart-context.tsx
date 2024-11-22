'use client';
import { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
	productId: string;
	quantity: number;
	price: number;
	category: string;
	imageUrl: string;
	name: string;
};

type CartContextType = {
	items: CartItem[];
	updateItem: (cartItem: CartItem) => Promise<void>;
	getItemQuantity: (productId: string) => number;
	totalItems: number;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, newQuantity: number) => void;
};

export const freeBottle = {
	productId: '378tkYgDUBncraADorGS3k',
	quantity: 1,
	price: 14.88,
	category: 'bottle',
	imageUrl:
		'https://images.ctfassets.net/445g3vkzkqor/1kWoMPEiqY0HddozjIhmQq/22ed3d116329a946a7f110d07033ce80/WEB_UniversalBottle_ProductP_Slideshow-1.webp',
	name: 'universal shaker bottle',
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

	const updateItem = async (cartItem: CartItem) => {
		const newItems = [...items];
		const existingIndex = newItems.findIndex(
			(item) => item.productId === cartItem.productId
		);

		if (items.length === 0) {
			newItems.push(freeBottle);
		}

		if (existingIndex >= 0) {
			if (cartItem.quantity === 0) {
				newItems.splice(existingIndex, 1);
			} else {
				newItems[existingIndex].quantity = cartItem.quantity;
			}
		} else if (cartItem.quantity > 0) {
			newItems.push(cartItem);
		}

		setItems(newItems);
		localStorage.setItem('cart', JSON.stringify(newItems));
	};

	const getItemQuantity = (productId: string) => {
		return items.find((item) => item.productId === productId)?.quantity || 0;
	};

	const removeFromCart = (productId: string) => {
		const newItems = items.filter((item) => item.productId !== productId);
		setItems(newItems);
		localStorage.setItem('cart', JSON.stringify(newItems));
	};

	const updateQuantity = (productId: string, newQuantity: number) => {
		const newItems = [...items];
		const existingIndex = newItems.findIndex(
			(item) => item.productId === productId
		);

		if (existingIndex >= 0) {
			if (newQuantity === 0) {
				// If quantity is 0, remove the item
				newItems.splice(existingIndex, 1);
			} else {
				// Update quantity
				newItems[existingIndex].quantity = newQuantity;
			}
			setItems(newItems);
			localStorage.setItem('cart', JSON.stringify(newItems));
		}
	};

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				items,
				updateItem,
				getItemQuantity,
				totalItems,
				removeFromCart,
				updateQuantity,
			}}
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
