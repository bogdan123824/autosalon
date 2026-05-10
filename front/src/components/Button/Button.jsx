import classes from './Button.module.css'

export default function Button({children, isActive, ...props}) {
    
    return <button 
    {...props}
    className={isActive ? `${classes.button__admin} ${classes.active} ` : classes.button__admin}
    >{children}
    </button>
}
