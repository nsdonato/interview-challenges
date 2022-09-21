import { useEffect, useMemo, useState } from 'react'

import api from './api'
import { Card, Checkout, Footer, Header, Layout } from './components'
import { Product } from './types'


function App() {
	const [products, setProducts] = useState<Product[]>([])
	const [checkout, setCheckout] = useState(() => new Map())

	useEffect(() => {
		api.list().then(setProducts)
	}, [])

	const handleAddProduct = (product: Product) => {
		const checkoutCopy = structuredClone(checkout)

		checkoutCopy.set(product.id, {
			quantity: checkoutCopy.has(product.id)
				? checkoutCopy.get(product.id).quantity + 1
				: 1,
			price: product.price,
		})

		setCheckout(checkoutCopy)
	}

	const handleRemoveProduct = (product: Product) => {
		const checkoutCopy = structuredClone(checkout)

		checkoutCopy.set(product.id, {
			quantity: checkoutCopy.has(product.id)
				? checkoutCopy.get(product.id).quantity - 1
				: 0,
			price: product.price,
		})

		setCheckout(checkoutCopy)
	}

	const { quantity, totalPrice} = useMemo(() => {
		if (checkout.size > 0) {
			return Array.from(checkout.values()).reduce((acc, item) => {
				return {
					quantity: acc + item.quantity,
					totalPrice: acc + item.quantity * item.price,
				}
			}, 0)
		} else {
			return {
				quantity: 0,
				totalPrice: 0,
			}
		}
	}, [checkout])

	return (
		<Layout>
			<Header />
			<Card
				checkoutItems={checkout}
				products={products}
				onAdd={handleAddProduct}
				onRemove={handleRemoveProduct}
			/>
			<Checkout quantity={quantity} totalPrice={totalPrice} />
			<Footer />
		</Layout>
	)
}

export default App
