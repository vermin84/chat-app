import  { useState } from "react";
import styles from './newChatModal.module.css'
import ModalButton from "./ModalButton";
import CancelButton from "./CancelButton";

export default function NewChatModal({ onClose, onCreate }: { onClose: ()=>void, onCreate: (f:string,l:string)=>void }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  return (
    <div className={styles.modal}>
      <div className={styles.modalCard}>
        <h3 className={styles.modalCardTitle}>New chat</h3>
        <div className={styles.inputWrapper}>
          <input placeholder="First name" value={first} onChange={e=>setFirst(e.target.value)} />
          <input placeholder="Last name" value={last} onChange={e=>setLast(e.target.value)} />

        </div>
        <div className={styles.buttonWrapper}>
          <ModalButton onClick={()=>onCreate(first,last)}>{'Create'}</ModalButton>
          
          <CancelButton onClick={onClose}/>
        </div>
      </div>
    </div>
  );
}
