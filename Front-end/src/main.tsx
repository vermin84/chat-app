import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import  ChatContextProvider  from './store/ChatContextProvider'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatContextProvider>
      <App />

    </ChatContextProvider>
  </StrictMode>,
)
