
import type { Chat, Message } from "../types";
import MessageBox from "./MessageBox";

import styles from './ChatBox.module.css'
import ChatHeader from "./ChatHeader";

type Props = {
  activeChat: Chat;
  msgs: Message[];
  sendMessage: (chatId:string,text: string)=>void
};

export default function ChatBox({activeChat, msgs, sendMessage}: Props){
  
    return <div className={styles.chatBoxWrapper}>
            <ChatHeader>{`${activeChat.firstName} ${activeChat.lastName}`}</ChatHeader>
            
            <div className={styles.chatBoxBody}>
              {msgs.map((m, i) => (
                <div key={i} className={`${styles.chatBoxMsg} ${m.author =='me' ? styles.me : ''}`}>
                  <div  >{m.text}</div>
                  <div className={styles.chatBoxAuthor}>{m.author == 'bot' ? activeChat.firstName : 'Me'}</div>
                </div>
              ))}
            </div>
            <MessageBox onSend={(t)=>sendMessage(activeChat._id, t)} />
          </div>
}