import styles from './Footer.module.css'

export const Footer = () => (
	<footer className={styles.footer}>
		Encontrá la consigna de este ejercicio y otros más{' '}
		<a
			className={styles.a}
			href='https://github.com/goncy/interview-challenges/tree/main/simple-cart'
		>
			acá
		</a>
	</footer>
)
