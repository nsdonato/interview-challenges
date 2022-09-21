/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Product, CheckoutItems } from '../../types'
import styles from './Card.module.css'

interface CardProps {
	checkoutItems: Map<string, CheckoutItems>
	products: Product[]
	onAdd: (id: Product) => void
	onRemove: (id: Product) => void
}

export const Card = ({
	checkoutItems,
	products,
	onAdd,
	onRemove,
}: CardProps) => {
	console.log('CARD')

	return (
		<section>
			{products.map((product: Product) => {
				const quantity = checkoutItems.has(product.id)
					? checkoutItems.get(product.id)?.quantity!
					: 0

				return (
					<article key={product.id}>
						<img className={styles.img} src={product.image} />
						<div>
							<p>{product.title}</p>
							<p>{product.description}</p>
						</div>

						<button onClick={() => onAdd(product)}>
							{quantity > 0 ? '+' : 'Agregar'}
						</button>
						{quantity > 0 && (
							<>
								<span>{quantity}</span>
								<button onClick={() => onRemove(product)}>-</button>
							</>
						)}
					</article>
				)
			})}
		</section>
	)
}
