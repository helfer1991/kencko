import kenckoLogo from './kencko-logo.svg';
import Image from 'next/image';
import styles from './navbar.module.css';
import ShoppingCartBasket from './shopping-cart-basket/shopping-cart-basket';

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Image
				alt='kencko-logo'
				src={kenckoLogo}
				height={20}
				width={100}
			/>
			<div className={styles.wrapper}>
				<ShoppingCartBasket />
			</div>
		</nav>
	);
}
