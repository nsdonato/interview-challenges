import styles from './Layout.module.css'

interface LayoutProps {
	children?: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
	return <main className={styles.main}>{children}</main>
}
