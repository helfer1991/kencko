import { ProductCard } from '../product-card/product-card';
import { getProducts } from '@/lib/api/fetchProducts';
import styles from './products-list.module.css';

type CategoryMapping = {
	[key: string]: string;
};

const categoryDisplayNames: CategoryMapping = {
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
	file: any; // You can type this more specifically if needed
};

type Benefit = {
	// Type this based on what's in the [Object]
	// For example:
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

type Product = {
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
	ingredients: null | any; // Type more specifically if needed
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
	const products = await getProducts();

	const uniqueCategories = Array.from(
		new Set<string>(products.map((product: Product) => product.category))
	);

	console.log(categoryDisplayNames[uniqueCategories[0]]);

	return (
		<div className={styles.container}>
			{products.map((product) => (
				<ProductCard
					imageUrl={product.background.url}
					key={product.id}
					title={product.name}
					price={product.market_prices.full_price}
				/>
			))}
		</div>
	);
}
