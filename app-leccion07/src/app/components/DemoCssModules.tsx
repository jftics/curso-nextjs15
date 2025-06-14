import style from './DemoCssModules.module.css'


interface ProductCardProps {
  title: string
  price: number
  description: string
}

export default function DemoCssModules(
    { 
    title, 
    price, 
    description, 
    }: ProductCardProps
    ){
        return(

            <div className={style.card}>
                <div className={style.content}>
                    <h3 className={style.title}>{title}</h3>
                    <p className={style.description}>{description}</p>
                    <div className={style.footer}>
                        <span className={style.price}>
                            ${price.toFixed(2)}
                        </span>
                        <button className={style.button}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>

        )
    }

