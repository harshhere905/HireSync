import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { InterviewProvider } from './features/interview/interview.context.jsx'
import './style.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <InterviewProvider>
        <App />
      </InterviewProvider>
    </AuthProvider>
  </StrictMode>,
)