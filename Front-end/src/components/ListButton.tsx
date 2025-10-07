import styles from './ListButton.module.css'
import type { SyntheticEvent } from "react"

type Props = {
    children: string,
   onPress?: (e?: SyntheticEvent) => void;
}
export default function ListButton({children, onPress}: Props){
    return <div className={styles.listButton} onClick={onPress}>
        {children}
    </div>
}