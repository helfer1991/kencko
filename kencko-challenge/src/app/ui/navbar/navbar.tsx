import { ShoppingCart } from 'lucide-react';
import kenckoLogo from './kencko-logo.svg';
import shoppingCart from './cart-icon.svg';
import Image from 'next/image';
import styles from './navbar.module.css';

export default function Navbar() {
	const totalItems = 2;

	return (
		<nav className={styles.navbar}>
			<Image
				alt='kencko-logo'
				src={kenckoLogo}
				height={20}
				width={100}
			/>
			<div className={styles.wrapper}>
				<div className='text-xl font-bold'>Shop</div>
				<button className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'>
					<Image
						alt='shopping-cart-logo'
						src={shoppingCart}
						height={40}
						width={40}
					/>
					{totalItems > 0 && (
						<span className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
							{totalItems}
						</span>
					)}
				</button>
			</div>
		</nav>
	);
}
