/// <reference types="cypress" />

const user = cy
describe('Estampitiency', () => {
	beforeEach(() => {
		user.visit('/')
	})

	it('Mostrar 6 items por default', () => {
		user
			.get('article')
			.should('have.length', 6)
			.get('article div > p:first-child')
			.first() // de los 6 elementos, obtiene el primero.
			.should('have.text', 'Estampitancy Trainee')
			.get('article div > p:first-child')
			.last()
			.should('have.text', 'Estampitancy Gin')
	})

	it('Agregar un elemento al carrito', () => {
		user
			.get(':nth-child(1) > button')
			.click()
			.should('have.exist', '+')
			.get('span')
			.should('have.text', '1')
			.get('aside > button')
			.should('have.text', '1 productos (total: $ 1)')
	})

	it('Eliminar el único elemento del carrito', () => {
		user.get(':nth-child(1) > button').click()

		user
			.get('section > :nth-child(1) > :nth-child(5)')
			.click()
			.should('not.exist', '-')
			.get(':nth-child(1) > span')
			.should('not.exist')
			.get('aside > button')
			.should('have.text', '0 productos (total: $ 0)')
	})
})
