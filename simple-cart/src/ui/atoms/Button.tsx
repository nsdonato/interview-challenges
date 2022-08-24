import { MouseEventHandler, ReactNode } from 'react'
type Props = {
	children?: ReactNode
	onClick?: MouseEventHandler
}
const Button = ({ onClick, children }: Props) => {
	return <button onClick={onClick}>{children}</button>
}

export default Button
