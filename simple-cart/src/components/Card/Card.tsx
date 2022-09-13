import { Product, CheckoutItems } from '../../types'
import styles from './Card.module.css'

interface CardProps {
	checkoutItems: CheckoutItems[]
	products: Product[]
	onAdd: (id: string) => void
	onRemove: (id: string) => void
}

export const Card = ({
	checkoutItems,
	products,
	onAdd,
	onRemove,
}: CardProps) => {
	return (
		<section>
			{products.map((product: Product) => {
				const quantity = checkoutItems?.filter(
					item => item.id === product.id
				).length

				return (
					<article key={product.id}>
						<img className={styles.img} src={product.image} />
						<div>
							<p>{product.title}</p>
							<p>{product.description}</p>
						</div>
						{/* TODO: Cuando hay mas de un producto Agregar debe ser +, mostrar cant de productos
					en el carrito y el -
					*/}
						<button onClick={() => onAdd(product.id)}>
							{quantity > 0 ? '+' : 'Agregar'}
						</button>
						{quantity > 0 && (
							<>
								<span>{quantity}</span>
								<button onClick={() => onRemove(product.id)}>-</button>
							</>
						)}
					</article>
				)
			})}
		</section>
	)
}
