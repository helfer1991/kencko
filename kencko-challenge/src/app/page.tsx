import Image from 'next/image';
import ProductsList from './ui/products-list/products-list';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from '@nextui-org/navbar';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div>
				<Image
					className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
					src='/next.svg'
					alt='Next.js Logo'
					width={180}
					height={37}
					priority
				/>
				<ProductsList />
			</div>
		</main>
	);
}
