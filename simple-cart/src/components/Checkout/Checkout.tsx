import { useCheckout } from '../../context/CheckoutContext'
import styles from './Checkout.module.css'

export const Checkout = () => {
	console.log("checkout");

	const { quantity, totalPrice } = useCheckout()

	return (
		<aside className={styles.aside}>
			<button className={styles.button}>
				{quantity} productos (total: $ {totalPrice})
			</button>
		</aside>
	)
}
