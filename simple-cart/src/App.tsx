import { useEffect, useState } from 'react'

import api from './api'
import { Card, Checkout, Footer, Header, Layout } from './components'
import { CheckoutItems, Product, TCheckout } from './types'

function App() {
	const [products, setProducts] = useState<Product[]>([])
	const [checkout, setCheckout] = useState<TCheckout>({
		totalPrice: 0,
		items: [
			{
				id: '',
				quantity: 0,
				price: 0,
			},
		],
	})

	useEffect(() => {
		api.list().then(setProducts)
	}, [])

	const handleAddProduct = (id: string) => {
		const product = products.find(item => item.id === id)

		if (product) {
			const totalPrice = checkout.totalPrice + product.price

			setCheckout({
				totalPrice,
				items: [
					...checkout.items,
					{
						id: product.id,
						quantity: 1,
						price: product.price,
					},
				],
			})
		}
	}

	const handleRemoveProduct = (id: string) => {
		const item = checkout.items.find(item => item.id === id)!
		const product = checkout.items.indexOf(item)

		if (item) {
			const totalPrice = checkout.totalPrice - item.price
			const checkoutItems = [...checkout.items]

			checkoutItems.splice(product, 1)

			setCheckout({
				totalPrice,
				items: checkoutItems,
			})
		}
	}

	const quantity = () => {
		return (
			Number(checkout.items?.length > 0) &&
			checkout.items.reduce((acc: number, item: CheckoutItems) => {
				return acc + item.quantity
			}, 0)
		)
	}

	return (
		<Layout>
			<Header />
			<Card
				checkoutItems={checkout.items}
				products={products}
				onAdd={handleAddProduct}
				onRemove={handleRemoveProduct}
			/>
			<Checkout quantity={quantity()} totalPrice={checkout.totalPrice} />
			<Footer />
		</Layout>
	)
}

export default App
