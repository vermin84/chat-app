
import styles from './newChatModal.module.css'
import ModalButton from "./ModalButton";
import CancelButton from "./CancelButton";

export default function ConfirmDeleting({ onClose,onDelete }: { onClose: ()=>void, onDelete: ()=>void }) {
  
  return (
    <div className={styles.modal}>
      <div className={styles.modalCard}>
        <h3 className={styles.modalCardTitle}>Delete chat?</h3>
        
        <div className={styles.buttonWrapper}>
          <ModalButton onClick={onDelete}>{'Delete'}</ModalButton>
          
          <CancelButton onClick={onClose}/>
        </div>
      </div>
    </div>
  );
}
