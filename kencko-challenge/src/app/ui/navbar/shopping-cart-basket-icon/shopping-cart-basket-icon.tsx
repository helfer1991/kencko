'use client';
import { useState } from 'react';
import shoppingCart from './cart-icon.svg';
import { useCart } from '@/app/contexts/cart-context';
import { ShoppingCart } from '../../shopping-cart/shopping-cart';
import Image from 'next/image';

export default function ShoppingCartBasketIcon() {
	const { totalItems } = useCart();
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

	return (
		<>
			<div className='text-xl font-bold'>Shop</div>
			<button
				className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'
				onClick={() => setIsCartOpen(!isCartOpen)}
			>
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

			<ShoppingCart
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
			/>
		</>
	);
}
