import React from 'react'
import { useForm } from 'react-hook-form'
import odooAPI from '../services/odooAPI'

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    // Create a CRM lead via odooAPI
    try {
      const lead = await odooAPI.createLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        vehicleType: 'Contact Inquiry',
        pickupLocation: data.message || ''
      })

      if (lead.success) {
        alert('Thank you — we will contact you shortly!')
        reset()
      } else {
        alert('Failed to send request: ' + lead.error)
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <input {...register('name', { required: true })} placeholder="Full name" />
      <input {...register('email', { required: true })} placeholder="Email" />
      <input {...register('phone', { required: true })} placeholder="Phone" />
      <textarea {...register('message')} placeholder="Your message" />
      <button type="submit">Send</button>
    </form>
  )
}

export default ContactForm
