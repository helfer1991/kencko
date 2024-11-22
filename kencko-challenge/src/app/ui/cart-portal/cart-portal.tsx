'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function CartPortal({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return createPortal(
		children,
		document.getElementById('cart-portal') as HTMLElement
	);
}
