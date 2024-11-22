'use client';
import { useCart } from '@/app/contexts/cart-context';
import { X } from 'lucide-react';
import styles from './shopping-cart.module.css';
import { useEffect } from 'react';
import { CartPortal } from '../cart-portal/cart-portal';
import type { CartItem } from '@/app/contexts/cart-context';
import { freeBottle } from '@/app/contexts/cart-context';
import type { Product } from '../products-list/products-list';
import MissingCategories from '../missing-categories/missing-categories';

type ShoppingCartProps = {
	isOpen: boolean;
	onClose: () => void;
};

const calculateItemTotal = (item: CartItem) => {
	if (item.productId === freeBottle.productId) {
		const freeBottles = 1;
		const paidBottles = Math.max(0, item.quantity - freeBottles);
		return item.price * paidBottles;
	}
	return item.price * item.quantity;
};

export function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
	const { items, totalItems, removeFromCart, updateQuantity } = useCart();

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('cart-open');
		} else {
			document.body.classList.remove('cart-open');
		}
	}, [isOpen]);

	const grandTotal = items.reduce((total, item) => {
		return total + calculateItemTotal(item);
	}, 0);

	return (
		<CartPortal>
			<div
				className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
				onClick={onClose}
			/>

			<div
				className={`${styles.cartPanel} ${isOpen ? styles.cartPanelOpen : ''}`}
			>
				<div className={styles.cartHeader}>
					<h2>Shopping Cart ({totalItems} items)</h2>
					<button
						onClick={onClose}
						className={styles.closeButton}
					>
						<X size={24} />
					</button>
				</div>
				<div className={styles.cartContent}>
					<div className={styles.cartItems}>
						{items.length === 0 ? (
							<p className={styles.emptyCart}>Your cart is empty</p>
						) : (
							<div className={styles.itemsList}>
								{items.map((item) => (
									<div
										key={item.productId}
										className={styles.cartItem}
									>
										<div className={styles.productImage}>
											<img
												src={item.imageUrl}
												alt={item.name}
											/>
										</div>

										<div className={styles.productDetails}>
											<h3>{item.name}</h3>
											<p className={styles.price}>
												${item.price.toFixed(2)} each
												{item.productId === '378tkYgDUBncraADorGS3k' && (
													<span className={styles.freeBottleText}>
														(First bottle free!)
													</span>
												)}
											</p>

											<div className={styles.quantityControls}>
												<button
													onClick={() =>
														updateQuantity(
															item.productId,
															Math.max(0, (item.quantity || 1) - 1)
														)
													}
													className={styles.quantityButton}
												>
													-
												</button>
												<span className={styles.quantity}>{item.quantity}</span>
												<button
													onClick={() =>
														updateQuantity(
															item.productId,
															(item.quantity || 1) + 1
														)
													}
													className={styles.quantityButton}
												>
													+
												</button>
											</div>
										</div>

										<div className={styles.priceSection}>
											<p className={styles.totalPrice}>
												${calculateItemTotal(item).toFixed(2)}
											</p>
											<button
												onClick={() => removeFromCart(item.productId)}
												className={styles.removeButton}
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					<MissingCategories cartItems={items} />
				</div>

				<div className={styles.cartFooter}>
					<div className={styles.totalSection}>
						<span>Total</span>
						<span className={styles.grandTotal}>${grandTotal.toFixed(2)}</span>
					</div>
					<button className={styles.checkoutButton}>Proceed to Checkout</button>
				</div>
			</div>
		</CartPortal>
	);
}
