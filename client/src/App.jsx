import { useState, useEffect } from 'react'
import LeadForm from './components/LeadForm'
import './App.css'

function App() {
  const [statusText, setStatusText] = useState('Checking server status...')

  useEffect(() => {
    fetch('/health')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((data) => {
        if (data && data.status === 'ok') {
          setStatusText(`Backend Status: Connected (${data.status})`)
        } else {
          setStatusText('Backend Status: Disconnected')
        }
      })
      .catch(() => {
        setStatusText('Backend Status: Disconnected')
      })
  }, [])

  return (
    <main className="app-container">
      <h1>Lead Portal</h1>
      <p data-testid="server-status">{statusText}</p>
      <LeadForm />
    </main>
  )
}

export default App
