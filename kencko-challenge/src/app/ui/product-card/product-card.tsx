import Image from 'next/image';
import styles from './product-card.module.css';
import { ProductCardButton } from './product-card-button';
import type { Product } from '../products-list/products-list';

export function ProductCard(product: Product) {
	return (
		<div className={styles.card}>
			<h6 className={styles.title}>{product.name}</h6>
			<Image
				alt={`${product.name}-image`}
				className={styles.image}
				src={product.background.url}
				width={220}
				height={220}
			/>
			<p className={styles.price}>{product.market_prices.full_price}€</p>
			<ProductCardButton productId={product.name} />
		</div>
	);
}
