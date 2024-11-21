'use client';
import { useState } from 'react';
import styles from './product-card-button.module.css';

type ProductCardButtonProps = {
	productId: string;
};

export function ProductCardButton({ productId }: ProductCardButtonProps) {
	const [isAdded, setIsAdded] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const handleAddToBasket = () => {
		setIsAdded(true);
	};

	const handleIncrement = () => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity);
		console.log(quantity);
	};

	const handleDecrement = () => {
		if (quantity > 0) {
			const newQuantity = quantity - 1;
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
