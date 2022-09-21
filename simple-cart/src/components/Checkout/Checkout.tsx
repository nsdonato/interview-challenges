import styles from './Checkout.module.css'

interface CheckoutProps {
	quantity?: number
	totalPrice?: number
}

export const Checkout = ({ quantity = 3, totalPrice = 12 }: CheckoutProps) => {
	console.log('Checkout')

	return (
		<aside className={styles.aside}>
			<button className={styles.button}>
				{quantity} productos (total: $ {totalPrice})
			</button>
		</aside>
	)
}
