'use client';
import { useState } from 'react';
import { useCart } from '@/app/contexts/cart-context';
import styles from './product-card-button.module.css';

type ProductCardButtonProps = {
	productId: string;
};

export function ProductCardButton({ productId }: ProductCardButtonProps) {
	const [isAdded, setIsAdded] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(1);
	const { getItemQuantity, updateItem } = useCart();

	const handleAddToBasket = () => {
		setIsAdded(true);
		updateItem(productId, 1);
	};

	const handleIncrement = () => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity);
		updateItem(productId, quantity + 1);
		console.log(quantity);
	};

	const handleDecrement = () => {
		if (quantity > 0) {
			const newQuantity = quantity - 1;
			updateItem(productId, quantity - 1);
			setQuantity(newQuantity);
			if (newQuantity === 0) {
				setIsAdded(false);
			}
		}
	};

	if (!isAdded) {
		return (
			<button
				onClick={handleAddToBasket}
				className={styles.addButton}
			>
				Add to basket
			</button>
		);
	}

	return (
		<div className={styles.quantityControl}>
			<button
				onClick={handleDecrement}
				className={styles.controlButton}
			>
				-
			</button>
			<span className={styles.quantity}>{quantity}</span>
			<button
				onClick={handleIncrement}
				className={styles.controlButton}
			>
				+
			</button>
		</div>
	);
}
