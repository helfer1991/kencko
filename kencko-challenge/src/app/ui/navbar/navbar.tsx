import Image from 'next/image';
import styles from './navbar.module.css';
import ShoppingCartBasketIcon from './shopping-cart-basket-icon/shopping-cart-basket-icon';

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Image
				alt='kencko-logo'
				src='/images/kencko-logo.svg'
				height={20}
				width={100}
			/>
			<div className={styles.wrapper}>
				<ShoppingCartBasketIcon />
			</div>
		</nav>
	);
}
