export interface Product {
	id: string
	title: string
	description: string
	image: string
	price: number
}

export type CheckoutItems = {
	quantity: number
	price: number
}

export type TCheckout = {
	totalPrice: number
	items: CheckoutItems[]
}
