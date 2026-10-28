import { useState, useEffect } from 'react'
import LeadForm from './components/LeadForm'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

function App() {
  const [statusText, setStatusText] = useState('Checking server status...')
  const [activeTab, setActiveTab] = useState('client')

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

      <nav className="view-switcher" aria-label="View Switcher">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'client' ? 'active' : ''}`}
          data-testid="tab-client-form"
          onClick={() => setActiveTab('client')}
        >
          Client Form
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
          data-testid="tab-admin-dashboard"
          onClick={() => setActiveTab('admin')}
        >
          Admin Dashboard
        </button>
      </nav>

      {activeTab === 'client' ? <LeadForm /> : <AdminDashboard />}
    </main>
  )
}

export default App
