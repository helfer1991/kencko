import { ProductCard } from '../product-card/product-card';
import { getProducts } from '@/lib/api/fetchProducts';
import styles from './products-list.module.css';

export type CategoryMapping = {
	[key: string]: string;
};

export const categoryDisplayNames: CategoryMapping = {
	dtc_smoothies: 'Smoothies',
	dtc_fruit_snacks: 'Fruit Snacks',
	dtc_oats: 'Oats',
	dtc_protein_smoothies: 'Protein Smoothies',
	dtc_iced_lattes: 'Iced Lattes',
	bottle: 'Bottles',
	protein: 'Protein',
};

type Image = {
	id: string;
	title: string;
	description: string;
	url: string;
	file: any;
};

type Benefit = {
	title?: string;
	description?: string;
};

type MarketPrices = {
	full_price: number;
	subscription_price: number;
	currency: string;
};

type JunipInfo = {
	remote_id: string;
	rating_average: number;
};

export type Product = {
	id: string;
	name: string;
	perks: string;
	benefitsIntro: string;
	mainFlavors: string[];
	url: string;
	cardDescription: string;
	cardHighlightText: string | null;
	productId: string;
	intro: string;
	suggestion: string;
	mixLiquidTwist: string;
	allergies: string;
	background: Image;
	productPackaging: Image;
	productPackagingPdp: Image;
	lifeStyleImage: Image;
	preparingVideo: Image;
	suggestionImage: Image | null;
	benefits: Benefit[];
	ingredients: null | any;
	inorganicIngredients: null | any;
	ingredientsShort: null | any;
	nutritionalInformation: null | any;
	identifier: string;
	category: string;
	contentfulEntryId: string;
	product_id: number;
	variant_id: number;
	is_sold_out: boolean;
	junip_info: JunipInfo;
	market_prices: MarketPrices;
};

export default async function ProductsList() {
	const products: Array<Product> = await getProducts();

	const uniqueCategories = Array.from(
		new Set<string>(products.map((product: Product) => product.category))
	);

	return (
		<div>
			<nav className={styles.categoryNav}>
				{uniqueCategories.map((category) => (
					<a
						key={category}
						href={`#${category}`}
						className={styles.categoryLink}
					>
						{categoryDisplayNames[category] || category}
					</a>
				))}
			</nav>

			{uniqueCategories.map((category) => (
				<section
					key={category}
					id={category}
					className={styles.categorySection}
				>
					<h2 className={styles.categoryTitle}>
						{categoryDisplayNames[category] || category}
					</h2>
					<div className={styles.productsGrid}>
						{products
							.filter((product) => product.category === category)
							.map((product) => (
								<ProductCard
									{...product}
									key={product.id}
								/>
							))}
					</div>
				</section>
			))}
		</div>
	);
}
