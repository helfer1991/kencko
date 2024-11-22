'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './category-carousel.module.css';
import { useRef } from 'react';
import type { Product } from '../../products-list/products-list';
import { useCart } from '@/app/contexts/cart-context';

type CategoryCarouselProps = {
	category: string;
	products: Product[];
};

export default function CategoryCarousel({
	category,
	products,
}: CategoryCarouselProps) {
	const { getItemQuantity, updateItem } = useCart();
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const scrollAmount = scrollContainerRef.current.offsetWidth;
			const newScrollLeft =
				direction === 'left'
					? scrollContainerRef.current.scrollLeft - scrollAmount
					: scrollContainerRef.current.scrollLeft + scrollAmount;

			scrollContainerRef.current.scrollTo({
				left: newScrollLeft,
				behavior: 'smooth',
			});
		}
	};

	const handleAddToCart = (product: Product) => {
		const itemQuantity = getItemQuantity(product.productId);
		updateItem({
			productId: product.id,
			quantity: itemQuantity + 1,
			price: product.market_prices.full_price,
			category: product.category,
			imageUrl: product.background.url,
			name: product.name,
		});
	};

	return (
		<div className={styles.carouselSection}>
			<h4 className={styles.categoryTitle}>{category}</h4>

			<div className={styles.carouselContainer}>
				<button
					className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
					onClick={() => scroll('left')}
				>
					<ChevronLeft size={20} />
				</button>

				<div
					className={styles.carouselTrack}
					ref={scrollContainerRef}
				>
					{products.map((product) => (
						<div
							key={product.id}
							className={styles.carouselItem}
						>
							<img
								src={product.productPackaging.url}
								alt={product.name}
								className={styles.productImage}
							/>
							<h5 className={styles.productName}>{product.name}</h5>
							<p className={styles.productPrice}>
								${product.market_prices.full_price.toFixed(2)}
							</p>
							<button
								className={styles.addToCartButton}
								onClick={() => handleAddToCart(product)}
							>
								Add to Cart
							</button>
						</div>
					))}
				</div>

				<button
					className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
					onClick={() => scroll('right')}
				>
					<ChevronRight size={20} />
				</button>
			</div>
		</div>
	);
}
