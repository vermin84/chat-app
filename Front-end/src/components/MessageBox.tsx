import { useState } from "react";
import styles from './MessageBox.module.css'
export default function MessageBox({ onSend }: { onSend: (text: string)=>void }) {
  const [text, setText] = useState("");
  
  return (
    <div className={styles.messageBoxWrapper}>
      <div className={styles.messageBoxInputWrapper}>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && text.trim()) { onSend(text); setText(""); } }}
        placeholder="Type a message..."
        />
      <button onClick={() => { if (text.trim()) { onSend(text); setText(""); } }}>Send</button>
        </div>
    </div>
  );
}
