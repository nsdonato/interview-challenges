import styles from './Layout.module.css'

interface LayoutProps {
	children?: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
	<main className={styles.main}>{children}</main>
)
