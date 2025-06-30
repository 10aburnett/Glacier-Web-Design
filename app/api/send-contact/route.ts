import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Create the email content
    const emailContent = `
      <h2>New Contact Message from Glacier Web Design</h2>
      
      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${formData.name}</li>
        <li><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></li>
        <li><strong>Company:</strong> ${formData.company || 'Not provided'}</li>
      </ul>
      
      <h3>Message:</h3>
      <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${formData.message.replace(/\n/g, '<br>')}
      </p>
      
      <hr>
      <p><small>This message was submitted through the Glacier Web Design website contact form.</small></p>
    `
    
    // Debug: Check email configuration
    console.log('=== CONTACT EMAIL CONFIGURATION DEBUG ===')
    console.log('GMAIL_USER:', process.env.GMAIL_USER ? 'Set ✓' : 'Missing ✗')
    console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set ✓' : 'Missing ✗')
    
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('❌ Gmail credentials not configured!')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    })

    // Email options
    const mailOptions = {
      from: `"Contact Form" <${process.env.GMAIL_USER}>`,
      to: 'Infoglacierdesign@gmail.com',
      subject: `New Contact Message - ${formData.name}`,
      html: emailContent,
      replyTo: formData.email
    }

    // Send email
    try {
      console.log('📧 Attempting to send contact email...')
      console.log('From:', mailOptions.from)
      console.log('To:', mailOptions.to)
      console.log('Subject:', mailOptions.subject)
      
      await transporter.sendMail(mailOptions)
      console.log('✅ Contact email sent successfully to Infoglacierdesign@gmail.com')
      return NextResponse.json({ message: 'Message sent successfully' })
    } catch (emailError: any) {
      console.error('❌ CONTACT EMAIL SENDING FAILED:')
      console.error('Error Code:', emailError.code)
      console.error('Error Message:', emailError.message)
      console.error('Response Code:', emailError.responseCode)
      console.error('Full Error:', emailError)
      
      // Still log the contact data so you can see it
      console.log('=== CONTACT MESSAGE RECEIVED ===')
      console.log('From:', formData.name, '(' + formData.email + ')')
      console.log('Company:', formData.company)
      console.log('Message:', formData.message)
      console.log('================================')
      
      return NextResponse.json({ 
        message: 'Message received successfully (email delivery pending)' 
      })
    }
    
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 