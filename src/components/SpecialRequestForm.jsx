import React from 'react'
import { useForm } from 'react-hook-form'
import odooAPI from '../services/odooAPI'

const SpecialRequestForm = () => {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      const lead = await odooAPI.createLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        vehicleType: 'Special Request',
        pickupLocation: data.request || ''
      })

      if (lead.success) {
        alert('Request submitted — we will reach out soon!')
        reset()
      } else {
        alert('Failed to submit request: ' + lead.error)
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="special-request-form">
      <input {...register('name', { required: true })} placeholder="Full name" />
      <input {...register('email', { required: true })} placeholder="Email" />
      <input {...register('phone', { required: true })} placeholder="Phone" />
      <textarea {...register('request')} placeholder="Describe your special request" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default SpecialRequestForm
