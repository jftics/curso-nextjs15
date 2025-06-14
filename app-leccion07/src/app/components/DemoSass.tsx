import styles from './DemoSass.module.scss'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function DemoSass(

    {
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    type = 'button'
    }: ButtonProps

    ){

        const className = ` ${styles.button} ${styles[variant]} ${styles[size]}`
        return(
            <button
                type={type}
                className={className}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        )
       

}