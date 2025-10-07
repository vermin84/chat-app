import styles from './ModalButton.module.css'
type Props = {
    onClick: ( )=>void,
    children: string
}

export default function ModalButton({onClick, children}: Props){
    return <div className={styles.modalButton} onClick={onClick}>
        {children}
        
    </div>
}