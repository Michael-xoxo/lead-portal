import { useState, useEffect } from 'react'
import './AdminDashboard.css'

function formatBudget(budget) {
  if (budget === null || budget === undefined || budget === '') {
    return 'N/A'
  }
  const num = Number(budget)
  if (Number.isNaN(num)) {
    return 'N/A'
  }
  return `$${num.toLocaleString('en-US')}`
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'N/A'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function AdminDashboard() {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetch('/api/leads')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch leads from server.')
        }
        return res.json()
      })
      .then((data) => {
        if (isMounted) {
          setLeads(Array.isArray(data) ? data : [])
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Unable to load leads.')
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleDelete = async (id) => {
    setDeleteError('')

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json().catch(() => ({}))

      if (response.status === 200) {
        setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id))
      } else {
        setDeleteError(data.message || 'Failed to delete lead.')
      }
    } catch (err) {
      setDeleteError(err.message || 'Network error while deleting lead.')
    }
  }

  return (
    <section className="admin-dashboard" aria-labelledby="admin-dashboard-heading">
      <div className="admin-header">
        <h2 id="admin-dashboard-heading">Admin Dashboard</h2>
      </div>

      {error && (
        <div
          className="admin-error-alert"
          role="alert"
          data-testid="fetch-error-alert"
        >
          {error}
        </div>
      )}

      {deleteError && (
        <div
          className="admin-error-alert"
          role="alert"
          data-testid="delete-error-alert"
        >
          {deleteError}
        </div>
      )}

      {isLoading ? (
        <p className="admin-status-msg" data-testid="loading-leads">
          Loading leads...
        </p>
      ) : !error && leads.length === 0 ? (
        <p className="admin-status-msg" data-testid="empty-leads">
          No inquiries yet.
        </p>
      ) : (
        !error && (
          <div className="table-wrapper">
            <table className="leads-table" data-testid="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Project Type</th>
                  <th>Budget</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} data-testid={`lead-row-${lead._id}`}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.projectType}</td>
                    <td>{formatBudget(lead.budget)}</td>
                    <td>{formatDate(lead.createdAt)}</td>
                    <td>
                      <span className="status-badge">
                        {lead.status || 'new'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        data-testid={`delete-btn-${lead._id}`}
                        onClick={() => handleDelete(lead._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </section>
  )
}

export default AdminDashboard
