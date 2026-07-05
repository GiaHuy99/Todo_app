import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// #region agent log
fetch('http://127.0.0.1:7625/ingest/37b913ea-bfda-4e28-a581-d127a19c668c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c6aeae'},body:JSON.stringify({sessionId:'c6aeae',runId:'post-fix',hypothesisId:'A',location:'main.tsx:boot',message:'React app bootstrapped',data:{href:location.href,scriptSrc:document.querySelector('script[type=module]')?.getAttribute('src')??null},timestamp:Date.now()})}).catch(()=>{});
// #endregion

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
