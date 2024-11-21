import Image from 'next/image';
import styles from './product-card.module.css';

type Product = {
	imageUrl: string;
	title: string;
};

export function ProductCard({ title, imageUrl }: Product) {
	return (
		<div className={styles.card}>
			<h6 className={styles.title}>{title}</h6>
			<Image
				alt={`${title}-image`}
				src={imageUrl}
				width={220}
				height={220}
			/>
		</div>
	);
}
