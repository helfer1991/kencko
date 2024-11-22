import ProductsList from './ui/products-list/products-list';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<ProductsList />
		</main>
	);
}
