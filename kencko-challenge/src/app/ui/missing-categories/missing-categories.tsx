'use client';
import styles from './missing-categories.module.css';
import { useEffect, useState } from 'react';
import type { Product } from '../products-list/products-list';
import type { CartItem } from '@/app/contexts/cart-context';
import CategoryCarousel from './category-carousel/category-carousel';
import { getProducts } from '@/lib/api/fetchProducts';
import type { CategoryMapping } from '../products-list/products-list';

const categoryDisplayNames: CategoryMapping = {
	dtc_smoothies: 'Smoothies',
	dtc_fruit_snacks: 'Fruit Snacks',
	dtc_oats: 'Oats',
	dtc_protein_smoothies: 'Protein Smoothies',
	dtc_iced_lattes: 'Iced Lattes',
	bottle: 'Bottles',
	protein: 'Protein',
};

type MissingCategoriesProps = {
	cartItems: CartItem[];
};

export default function MissingCategories({
	cartItems,
}: MissingCategoriesProps) {
	const [displayedCategories, setDisplayedCategories] = useState<string[]>([]);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		getProducts().then(setProducts).catch(console.error);
	}, []);

	const categoriesInCart = new Set(cartItems.map((item) => item.category));

	const missingCategories = Array.from(
		new Set(products.map((product) => product.category))
	).filter((category) => !categoriesInCart.has(category));

	useEffect(() => {
		setDisplayedCategories(missingCategories.slice(0, 2));
	}, [missingCategories.join(',')]);

	if (displayedCategories.length === 0) return null;

	return (
		<div className={styles.suggestionsSection}>
			<h3 className={styles.suggestionsTitle}>You might also like</h3>

			{displayedCategories.map((category) => (
				<CategoryCarousel
					key={category}
					category={categoryDisplayNames[category]}
					products={products.filter((p) => p.category === category)}
				/>
			))}
		</div>
	);
}
