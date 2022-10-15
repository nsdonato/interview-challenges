import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../api'
import { CheckoutItems, Product } from '../types'

type InitialContext = {
	products: Product[]
	quantity: number
	totalPrice: number
	handleRemoveProduct: (prod: Product) => void
	handleAddProduct: (prod: Product) => void
	checkout: Map<string | number, CheckoutItems>
}

const initialState: InitialContext = {
	products: [],
	quantity: 0,
	totalPrice: 0,
	handleRemoveProduct: () => undefined,
	handleAddProduct: () => undefined,
	checkout: new Map(),
}

const CheckoutContext = createContext<InitialContext>(initialState)

type CheckoutProps = {
	children: React.ReactNode
}

const CheckoutProvider = ({ children }: CheckoutProps) => {
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

	const { quantity, totalPrice } = useMemo(() => {
		if (checkout.size > 0) {
			return Array.from(checkout.values()).reduce(
				(acc, item) => {
					return {
						quantity: acc.quantity + item.quantity,
						totalPrice: acc.totalPrice + item.quantity * item.price,
					}
				},
				{
					quantity: 0,
					totalPrice: 0,
				}
			)
		} else {
			return {
				quantity: 0,
				totalPrice: 0,
			}
		}
	}, [checkout])

	return (
		<CheckoutContext.Provider
			value={{
				products,
				quantity,
				totalPrice,
				handleRemoveProduct,
				handleAddProduct,
				checkout,
			}}
		>
			{children}
		</CheckoutContext.Provider>
	)
}

function useCheckout() {
	const context = useContext(CheckoutContext)

	if (context === undefined) {
		throw new Error(`useContext debe ser usado con un CheckoutProvider`)
	}

	return context
}

export { CheckoutProvider, useCheckout }
