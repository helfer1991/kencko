'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/app/contexts/cart-context';
import type { Product } from '../../products-list/products-list';
import styles from './product-card-button.module.css';

const createCartItem = (newQuantity: number, product: Product) => ({
	productId: product.id,
	quantity: newQuantity,
	price: product.market_prices.full_price,
	category: product.category,
	imageUrl: product.background.url,
	name: product.name,
});

export function ProductCardButton(product: Product) {
	const [showControls, setShowControls] = useState<boolean>(false);
	const { getItemQuantity, updateItem } = useCart();
	const quantity = getItemQuantity(product.id);

	const handleAddToBasket = () => {
		setShowControls(true);
		updateItem(createCartItem(quantity + 1, product));
	};

	const handleIncrement = () => {
		updateItem(createCartItem(quantity + 1, product));
	};

	const handleDecrement = () => {
		if (quantity > 0) {
			const newQuantity = quantity - 1;
			updateItem(createCartItem(newQuantity, product));
			if (newQuantity === 0) {
				setShowControls(false);
			}
		}
	};

	if (!showControls) {
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
