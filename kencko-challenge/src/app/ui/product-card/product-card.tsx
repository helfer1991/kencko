import Image from 'next/image';
import styles from './product-card.module.css';
import { ProductCardButton } from './product-card-button';

type Product = {
	imageUrl: string;
	price: number;
	title: string;
};

export function ProductCard({ title, imageUrl, price }: Product) {
	return (
		<div className={styles.card}>
			<h6 className={styles.title}>{title}</h6>
			<Image
				alt={`${title}-image`}
				src={imageUrl}
				width={220}
				height={220}
			/>
			<p className={styles.price}>{price}€</p>
			<ProductCardButton productId={title} />
		</div>
	);
}
