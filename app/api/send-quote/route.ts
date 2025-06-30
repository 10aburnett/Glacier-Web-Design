import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Format the project type name
    const projectTypes = {
      business: 'Business Website',
      portfolio: 'Portfolio Site',
      landing: 'Landing Page',
      blog: 'Blog/Content Site',
      ecommerce: 'E-commerce Store',
      custom: 'Custom Application'
    }
    
    // Format the timeline
    const timelines = {
      priority: 'Priority',
      standard: 'Standard',
      flexible: 'Flexible'
    }
    
    // Format the budget ranges
    const budgetRanges = {
      'under-1k': 'Under £1,000',
      '1k-3k': '£1,000 - £3,000',
      '3k-10k': '£3,000 - £10,000',
      '10k+': '£10,000+'
    }
    
    // Format features list
    const featureNames = {
      responsive: 'Mobile Responsive Design',
      seo: 'Search Engine Optimization',
      cms: 'Content Management System (CMS)',
      ecommerce: 'E-commerce Functionality',
      booking: 'Booking/Appointment System',
      membership: 'User Registration/Login',
      multilingual: 'Multi-language Support',
      custom: 'Custom Functionality'
    }
    
    const selectedFeatures = formData.features.map((featureId: string) => 
      featureNames[featureId as keyof typeof featureNames] || featureId
    ).join(', ')
    
    // Create the email content
    const emailContent = `
      <h2>New Quote Request from Glacier Web Design</h2>
      
      <h3>Project Details:</h3>
      <ul>
        <li><strong>Project Type:</strong> ${projectTypes[formData.projectType as keyof typeof projectTypes] || formData.projectType}</li>
        <li><strong>Number of Pages:</strong> ${formData.pages}</li>
        <li><strong>Selected Features:</strong> ${selectedFeatures || 'None selected'}</li>
        <li><strong>Timeline Preference:</strong> ${timelines[formData.timeline as keyof typeof timelines] || formData.timeline}</li>
        <li><strong>Budget Range:</strong> ${budgetRanges[formData.budget as keyof typeof budgetRanges] || formData.budget}</li>
      </ul>
      
      <h3>Current Website & Inspiration:</h3>
      <ul>
        <li><strong>Has Current Website:</strong> ${formData.hasCurrentSite ? 'Yes' : 'No'}</li>
        ${formData.currentSiteUrl ? `<li><strong>Current Website URL:</strong> <a href="${formData.currentSiteUrl}">${formData.currentSiteUrl}</a></li>` : ''}
        ${formData.inspiration ? `<li><strong>Inspiration/Design Preferences:</strong> ${formData.inspiration}</li>` : ''}
        <li><strong>Uploaded Files:</strong> ${formData.uploadedFiles?.length ? formData.uploadedFiles.map((file: any) => file.name).join(', ') : 'None'}</li>
      </ul>
      
      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Business/Project Name:</strong> ${formData.businessName || 'Not provided'}</li>
        <li><strong>Contact Name:</strong> ${formData.contactName || 'Not provided'}</li>
        <li><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></li>
        <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
        <li><strong>Location:</strong> ${formData.location || 'Not provided'}</li>
      </ul>
      
      <h3>Project Description:</h3>
      <p>${formData.projectDescription || 'No description provided'}</p>
      
      ${formData.additionalNotes ? `
      <h3>Additional Notes:</h3>
      <p>${formData.additionalNotes}</p>
      ` : ''}
      
      <hr>
      <p><small>This quote request was submitted through the Glacier Web Design website quote form.</small></p>
    `
    
    // Debug: Check email configuration
    console.log('=== EMAIL CONFIGURATION DEBUG ===')
    console.log('GMAIL_USER:', process.env.GMAIL_USER ? 'Set ✓' : 'Missing ✗')
    console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set ✓' : 'Missing ✗')
    
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('❌ Gmail credentials not configured!')
      console.log('Current GMAIL_USER value:', process.env.GMAIL_USER)
      console.log('Current GMAIL_APP_PASSWORD value:', process.env.GMAIL_APP_PASSWORD ? '[HIDDEN]' : 'undefined')
      console.log('')
      console.log('🔧 TO FIX:')
      console.log('1. Go to https://myaccount.google.com/security')
      console.log('2. Enable 2-Step Verification')
      console.log('3. Click "App passwords"')
      console.log('4. Generate password for "Mail"')
      console.log('5. Update .env.local with the 16-character password')
      console.log('================================')
    }

    // Create email transporter (using a simple SMTP service)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER || 'your-email@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password'
      }
    })

    // Process file attachments
    const attachments = formData.uploadedFiles?.map((file: any) => ({
      filename: file.name,
      content: file.data.split(',')[1], // Remove data:mime;base64, prefix
      encoding: 'base64',
      contentType: file.type
    })) || []

    // Email options
    const mailOptions = {
      from: `"Quote Form" <${process.env.GMAIL_USER || 'Infoglacierdesign@gmail.com'}>`,
      to: 'Infoglacierdesign@gmail.com',
      subject: `New Quote Request - ${formData.contactName || 'Unknown'} (${projectTypes[formData.projectType as keyof typeof projectTypes] || formData.projectType})`,
      html: emailContent,
      replyTo: formData.email || 'Infoglacierdesign@gmail.com',
      attachments: attachments
    }

    // Try to send email, but don't fail if email service isn't configured
    try {
      console.log('📧 Attempting to send email...')
      console.log('From:', mailOptions.from)
      console.log('To:', mailOptions.to)
      console.log('Subject:', mailOptions.subject)
      console.log('📎 Attachments:', attachments.length, 'files -', attachments.map(a => a.filename).join(', '))
      
      await transporter.sendMail(mailOptions)
      console.log('✅ Email sent successfully to Infoglacierdesign@gmail.com')
      return NextResponse.json({ message: 'Quote request sent successfully' })
    } catch (emailError: any) {
      console.error('❌ EMAIL SENDING FAILED:')
      console.error('Error Code:', emailError.code)
      console.error('Error Message:', emailError.message)
      console.error('Response Code:', emailError.responseCode)
      console.error('Full Error:', emailError)
      
      if (emailError.code === 'EAUTH') {
        console.log('')
        console.log('🔐 AUTHENTICATION ERROR - This means:')
        console.log('- Your Gmail username/password is incorrect')
        console.log('- You need to use an App Password, not your regular Gmail password')
        console.log('- 2-Step Verification must be enabled on your Google account')
        console.log('')
        console.log('📱 Get App Password here: https://myaccount.google.com/apppasswords')
      }
      
      // Still log the quote data so you can see it
      console.log('=== QUOTE REQUEST RECEIVED ===')
      console.log('From:', formData.contactName, '(' + formData.email + ')')
      console.log('Project:', projectTypes[formData.projectType as keyof typeof projectTypes])
      console.log('Budget:', budgetRanges[formData.budget as keyof typeof budgetRanges])
      console.log('Timeline:', timelines[formData.timeline as keyof typeof timelines])
      console.log('Features:', selectedFeatures)
      console.log('Pages:', formData.pages)
      console.log('Phone:', formData.phone)
      console.log('Description:', formData.projectDescription)
      console.log('================================')
      
      return NextResponse.json({ 
        message: 'Quote request received successfully (email delivery pending)' 
      })
    }
    
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 