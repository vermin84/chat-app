import styles from './ChatHeader.module.css'
import avatar from '../assets/images/1670508611_2-kartinkin-net-p-kartinki-dlya-chata-vkontakte-2.jpg'

type Props = {
    children: string
}

export default function ChatHeader({children}: Props){
    return <div className={styles.chatBoxHeader}>
        <div className={styles.chatAvatarWrapper}>
            <img src={avatar}/>
            </div>
        <p>{children}</p>
    </div>
}