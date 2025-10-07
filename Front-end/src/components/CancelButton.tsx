import styles from './CancelButton.module.css'
type Props = {
    onClick: ()=>void
}

export default function CancelButton({onClick}: Props){
    return <div className={styles.cancelButton} onClick={onClick}>
        Cancel
        
    </div>
}