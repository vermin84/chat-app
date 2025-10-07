import  { useState } from "react";
import type { Chat } from "../types";
import styles from './editChatModal.module.css'
import CancelButton from "./CancelButton";
import ModalButton from "./ModalButton";

export default function EditChatModal({ chat, onClose, onSave }: { chat: Chat, onClose: ()=>void, onSave: (id:string,f:string,l:string)=>void }) {
  const [first, setFirst] = useState(chat.firstName);
  const [last, setLast] = useState(chat.lastName);
  function onSaveHandler(){
    onSave(chat._id, first, last)
     onClose()
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalCard}>
        <h3 className={styles.modalCardTitle}>Edit chat</h3>
        <div className={styles.inputWrapper}>
          <input placeholder="First name" value={first} onChange={e=>setFirst(e.target.value)} />
          <input placeholder="Last name" value={last} onChange={e=>setLast(e.target.value)} />

        </div>
        <div className={styles.buttonWrapper}>
          <ModalButton onClick={()=>onSaveHandler()}>{'Edit'}</ModalButton>
          <CancelButton onClick={onClose}/>
        </div>
      </div>
    </div>
  );
}
