'use client';
import shoppingCart from './cart-icon.svg';
import { useCart } from '@/app/contexts/cart-context';
import Image from 'next/image';

export default function ShoppingCartBasketIcon() {
	const { totalItems } = useCart();

	return (
		<>
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
		</>
	);
}
