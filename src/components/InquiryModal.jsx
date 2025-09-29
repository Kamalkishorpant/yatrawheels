import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import odooAPI from '../services/odooAPI'

const InquiryModal = ({ visible, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (visible) {
      // prevent background scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [visible])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      // 1) Find or create the customer (partner)
      let partner = null
      if (form.email) {
        partner = await odooAPI.findCustomer(form.email)
      }

      let partnerId = partner ? partner.id : null
      if (!partnerId) {
        const custRes = await odooAPI.createCustomer({
          name: form.name || 'Website Inquiry',
          email: form.email,
          phone: form.phone,
          address: form.message || ''
        })
        if (!custRes.success) {
          throw new Error(custRes.error || 'Failed to create customer')
        }
        partnerId = custRes.customerId
      }

      // 2) Create CRM Lead linked to partner
      const leadPayload = {
        name: `Website Inquiry - ${form.name || ''}`,
        partner_id: partnerId,
        email_from: form.email,
        phone: form.phone,
        mobile: form.phone,
        description: form.message || 'Website inquiry',
        type: 'lead'
      }

      const leadId = await odooAPI.callOdoo('crm.lead', 'create', [leadPayload])

      // 3) Create a draft sale order to track the inquiry (optional)
      const salePayload = {
        partner_id: partnerId,
        date_order: new Date().toISOString().slice(0, 19).replace('T', ' '),
        state: 'draft',
        note: `Website Inquiry: ${form.message || ''}`
      }

      const saleId = await odooAPI.callOdoo('sale.order', 'create', [salePayload])

      setFeedback({ type: 'success', msg: 'Thank you! We received your inquiry. Our team will contact you.' })

      // Persist a flag so we don't show on subsequent visits
      try { localStorage.setItem('inquiryShown', '1') } catch (e) {}

      setTimeout(() => {
        setIsSubmitting(false)
        onClose()
      }, 1600)
    } catch (err) {
      console.error('Inquiry submit error:', err)
      // Save failed inquiry locally for retry
      try {
        const failed = JSON.parse(localStorage.getItem('failedInquiries') || '[]')
        failed.push({ form, error: err.message || String(err), ts: Date.now() })
        localStorage.setItem('failedInquiries', JSON.stringify(failed))
      } catch (lsErr) {
        console.error('Failed saving inquiry locally:', lsErr)
      }

      setFeedback({ type: 'error', msg: `Submission failed: ${err.message || 'Please try again later.'}` })
      setIsSubmitting(false)
    }
  }

  if (!visible) return null

  return (
    <div className="inquiry-modal-overlay" onClick={onClose}>
      <motion.div className="inquiry-modal" onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="modal-header">
          <h3>Need help planning your trip?</h3>
          <p>Fill this quick form and we'll get back to you shortly.</p>
        </div>

        <form onSubmit={handleSubmit} className="inquiry-form">
          <div className="form-group">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
          </div>
          <div className="form-group">
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          </div>
          <div className="form-group">
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
          </div>
          <div className="form-group">
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message / Trip details" />
          </div>

          {feedback && (
            <div className={`feedback ${feedback.type}`}>{feedback.msg}</div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Close</button>
            <button type="submit" className="primary-btn" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default InquiryModal
