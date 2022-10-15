/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from 'react'
import api from '../../api'
import { useCheckout } from '../../context/CheckoutContext'
import { Product } from '../../types'
import styles from './Card.module.css'

export const Card = () => {
	const { checkout, handleAddProduct: onAdd, handleRemoveProduct: onRemove } = useCheckout()
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		api.list().then(setProducts)
	}, [])

	return (
		<section>
			{products.map((product: Product) => {
				const quantity = checkout.has(product.id)
					? checkout.get(product.id)?.quantity!
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
