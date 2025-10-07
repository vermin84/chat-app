import styles from './ChatList.module.css'
import type { Chat } from "../types";
import ListButton from './ListButton';
import avatar from '../assets/images/1670508611_2-kartinkin-net-p-kartinki-dlya-chata-vkontakte-2.jpg'
import { useContext, useState } from 'react';
import { ChatContext } from '../store/ChatContext';
import ConfirmDeleting from './ConfirmDeleting';



type Props = {
  chats: Chat[];
  activeId: string | null;
  onSelect: (id: string) => void;
  query: string
  onEdit: (c: Chat) => void;
  setQuery: (e: string)=>void
  
};

export default function ChatList({ chats, activeId,setQuery, onSelect, onEdit, query}: Props) {
  const [deleting, setDeleting] = useState(false)
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const ctx = useContext(ChatContext)

  function onDelete(id: string){
    if(!id) return
    setDeleting(false)
    ctx?.deleteChat(id)
  }
  return  <div  className={styles.chatListWrapper}>
      <div className={styles.chatListHeader}>
        <input placeholder="Search chats" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className={styles.chatlistHeaderAction}>
          <ListButton onPress={ctx?.onShowNew}>{'New chat'}</ListButton>

        </div>
      </div>
      <ul className={styles.chatListBody}>
        {chats.map(c => (
          <li key={c._id} className={`${styles.chatListItem} ${c._id === activeId ? styles.active : ""}`} onClick={() => onSelect(c._id)}>
            <div className={styles.chatListItemHeader}>
               <div className={styles.chatListAvatarWrapper}>
                  <img src={avatar}/>
                </div>
              <div >{c.firstName} {c.lastName}</div>
              <div>{c.lastMessage || ""}</div>
            </div>
            <div className={styles.chatListActions}>
              <ListButton onPress={(e) => { e?.stopPropagation(); onEdit(c); }}>{'Edit'}</ListButton>
              <ListButton onPress={(e) => { e?.stopPropagation();setChatToDelete(c._id); setDeleting(true); }}>{'Delete'}</ListButton>
              
            </div>
          </li>
        ))}
      </ul>
      {deleting&&<ConfirmDeleting onClose={()=>{setDeleting(false)}} onDelete={()=>onDelete(chatToDelete!)}/>}
    </div>
  ;
}
