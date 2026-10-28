import { useState } from 'react'
import './LeadForm.css'

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  projectType: 'Web Application',
  budget: '',
}

const PROJECT_TYPES = [
  'Web Application',
  'Landing Page',
  'API Integration',
  'Other',
]

function LeadForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType,
      }

      if (formData.budget !== '') {
        payload.budget = Number(formData.budget)
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))

      if (response.status === 201) {
        setFormData(INITIAL_FORM_STATE)
        setSuccessMessage('Inquiry received! We will be in touch shortly.')
      } else {
        setErrorMessage(
          data.message || data.error || 'Failed to submit lead inquiry.'
        )
      }
    } catch (err) {
      setErrorMessage(
        err.message || 'Network error: Unable to reach the server.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="lead-form-section" aria-labelledby="lead-form-heading">
      <h2 id="lead-form-heading">Submit a Project Inquiry</h2>

      {successMessage && (
        <div
          className="alert alert-success"
          role="status"
          data-testid="success-alert"
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          className="alert alert-error"
          role="alert"
          data-testid="error-banner"
        >
          {errorMessage}
        </div>
      )}

      <form className="lead-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectType">Project Type *</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Estimated Budget (USD, optional)</label>
          <input
            id="budget"
            name="budget"
            type="number"
            min="0"
            value={formData.budget}
            onChange={handleChange}
            placeholder="5000"
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
          data-testid="submit-btn"
        >
          {isLoading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </section>
  )
}

export default LeadForm
