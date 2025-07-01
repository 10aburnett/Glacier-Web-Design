'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Building, 
  Camera, 
  Users,
  Calendar,
  DollarSign,
  FileText,
  Mail,
  Phone,
  User,
  MapPin,
  X
} from 'lucide-react'
import ParallaxBackground from '@/components/ParallaxBackground'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const projectTypes = [
  { id: 'business', icon: Building, title: 'Business Website', description: 'Professional corporate site' },
  { id: 'ecommerce', icon: ShoppingCart, title: 'E-commerce Store', description: 'Online store with payments' },
  { id: 'portfolio', icon: Camera, title: 'Portfolio Site', description: 'Showcase your work' },
  { id: 'landing', icon: Globe, title: 'Landing Page', description: 'Single conversion-focused page' },
  { id: 'blog', icon: FileText, title: 'Blog/Content Site', description: 'Content management system' },
  { id: 'custom', icon: Users, title: 'Custom Application', description: 'Unique functionality needs' }
]

const features = [
  { id: 'responsive', title: 'Mobile Responsive Design', price: 0, included: true },
  { id: 'seo', title: 'Search Engine Optimization', price: 500, description: 'Help your website rank higher on Google and attract more visitors through improved search visibility' },
  { id: 'cms', title: 'Content Management System (CMS)', price: 1200, description: 'Easy-to-use admin panel that lets you update text, images, and content without technical knowledge' },
  { id: 'ecommerce', title: 'E-commerce Functionality', price: 3500, description: 'Complete online store with product catalog, shopping cart, and secure payment processing (up to 100 products)' },
  { id: 'booking', title: 'Booking/Appointment System', price: 2000, description: 'Allow customers to book appointments or services directly through your website with automatic email confirmations' },
  { id: 'membership', title: 'User Registration/Login (basic members area)', price: 2500, description: 'Allow users to create accounts, sign in, and access member-only content and features' },
  { id: 'multilingual', title: 'Multi-language Support', price: 250, description: 'Make your website available in multiple languages to reach international customers' },
  { id: 'custom', title: 'Custom Functionality', price: 0, description: 'Anything outside the menu — priced after discovery' }
]

const timelines = [
  { id: 'priority', title: 'Priority', multiplier: 1.3 },
  { id: 'standard', title: 'Standard', multiplier: 1 },
  { id: 'flexible', title: 'Flexible', multiplier: 0.9 }
]

const budgetRanges = [
  { id: 'under-1k', title: 'Under £1,000', subtitle: 'Small projects' },
  { id: '1k-3k', title: '£1,000 - £3,000', subtitle: 'Medium projects' },
  { id: '3k-10k', title: '£3,000 - £10,000', subtitle: 'Large projects' },
  { id: '10k+', title: '£10,000+', subtitle: 'Enterprise projects' }
]

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    projectType: '',
    features: [] as string[],
    timeline: '',
    budget: '',
    pages: 5,
    hasCurrentSite: false,
    currentSiteUrl: '',
    inspiration: '',
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    projectDescription: '',
    goals: '',
    targetAudience: '',
    additionalNotes: '',
    uploadedFiles: [] as Array<{name: string, size: number, type: string, data: string}>
  })

  const totalSteps = 6

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }))
  }

  const handleFileUpload = async (files: FileList) => {
    const newFiles = Array.from(files).filter(file => 
      file.size <= 10 * 1024 * 1024 && // 10MB limit
      (file.type.startsWith('image/') || file.type === 'application/pdf')
    )
    
    // Convert files to base64 for API submission
    const convertedFiles = await Promise.all(
      newFiles.map(file => {
        return new Promise<{name: string, size: number, type: string, data: string}>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => {
            resolve({
              name: file.name,
              size: file.size,
              type: file.type,
              data: reader.result as string
            })
          }
          reader.readAsDataURL(file)
        })
      })
    )
    
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...convertedFiles]
    }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      await handleFileUpload(e.dataTransfer.files)
    }
  }

  const calculateEstimate = () => {
    // Base template prices - these REPLACE each other when switching templates
    const templatePrices = {
      business: 2000,    // Business website 
      portfolio: 1200,   // Portfolio site  
      landing: 500,      // Landing page 
      blog: 1200,        // Blog/Content site 
      ecommerce: 3500,   // E-commerce store 
      custom: 5000       // Custom application 
    }
    
    // Start with the selected template's base price
    let totalPrice = templatePrices[formData.projectType as keyof typeof templatePrices] || 2000
    
    // Add page pricing - first 5 pages included in base price, £150 per additional page
    if (formData.pages > 5) {
      const additionalPages = formData.pages - 5
      totalPrice += additionalPages * 150
    }
    
    // ONLY add feature costs if we're on page 2 or later (not when browsing templates on page 1)
    if (currentStep >= 2) {
      formData.features.forEach(featureId => {
        const feature = features.find(f => f.id === featureId)
        if (feature && feature.price > 0) {
          // Check if this feature is already included with the current template
          const isIncludedWithCurrentTemplate = (
            (featureId === 'responsive') || // Mobile responsive always included
            (featureId === 'ecommerce' && formData.projectType === 'ecommerce') || // E-commerce included with e-commerce template
            (featureId === 'cms' && formData.projectType === 'blog') // CMS included with blog template
          )
          
          // Only add cost for features that are NOT included with current template
          if (!isIncludedWithCurrentTemplate) {
            totalPrice += feature.price
          }
        }
      })
    }
    
    return totalPrice
  }

  const handleSubmit = async () => {
    try {
      console.log('Submitting quote with data:', formData)
      
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('Quote API response:', result)

      if (response.ok) {
        console.log('Quote submitted successfully:', result)
        setIsSubmitted(true)
      } else {
        console.error('Quote submission failed:', result)
        alert(`Failed to submit quote request: ${result.error || 'Unknown error'}. Please try again.`)
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
      alert('Network error. Please check your connection and try again.')
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">What type of project do you need?</h2>
              <p className="text-white/70">Select the option that best describes your project</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.map((type) => {
                const Icon = type.icon
                return (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => {
                      // Start with fresh features array - reset everything when switching templates
                      const newFeatures = ['responsive'] // Mobile responsive always included
                      
                      // Auto-include relevant features based on project type
                      if (type.id === 'ecommerce') {
                        newFeatures.push('ecommerce')
                      }
                      if (type.id === 'blog') {
                        newFeatures.push('cms')
                      }
                      
                      return { 
                        ...prev, 
                        projectType: type.id,
                        features: newFeatures
                      }
                    })}
                    className={`p-6 rounded-2xl border transition-all text-left ${
                      formData.projectType === type.id
                        ? 'bg-white/20 border-white/40 shadow-lg'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-8 h-8 text-glacier-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-1">{type.title}</h3>
                    <p className="text-white/60 text-sm">{type.description}</p>
                  </motion.button>
                )
              })}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">What features do you need?</h2>
              <p className="text-white/70">Select all features that apply to your project</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature) => {
                // Check if this feature should be included based on project type
                const isIncludedByProjectType = (
                  (feature.id === 'responsive' && formData.projectType) || // Mobile responsive included with all types
                  (feature.id === 'ecommerce' && formData.projectType === 'ecommerce') ||
                  (feature.id === 'cms' && formData.projectType === 'blog')
                )
                const isSelected = formData.features.includes(feature.id) || isIncludedByProjectType
                
                return (
                  <motion.button
                    key={feature.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => !isIncludedByProjectType && handleFeatureToggle(feature.id)}
                    className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
                      isSelected
                        ? 'bg-white/20 border-white/40'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    } ${isIncludedByProjectType ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div>
                      <h3 className="text-white font-medium">{feature.title}</h3>
                      {feature.description && (
                        <p className="text-white/50 text-xs mb-1">{feature.description}</p>
                      )}
                      {feature.included || isIncludedByProjectType ? (
                        <p className="text-glacier-400 text-sm font-semibold">
                          Included
                        </p>
                      ) : feature.id === 'multilingual' ? (
                        <p className="text-white/60 text-sm">+£250 per language</p>
                      ) : feature.price > 0 ? (
                        <p className="text-white/60 text-sm">+£{feature.price.toLocaleString()}</p>
                      ) : feature.id === 'custom' ? (
                        null
                      ) : (
                        <p className="text-white/60 text-sm">Custom pricing</p>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-glacier-400" />
                    )}
                  </motion.button>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-white/10 rounded-xl">
              <label className="block text-white font-medium mb-2">
                Estimated number of pages: {formData.pages}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={formData.pages}
                onChange={(e) => setFormData(prev => ({ ...prev, pages: parseInt(e.target.value) }))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-white/60 text-sm mt-1">
                <span>1 page</span>
                <span>20+ pages</span>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Timeline & Budget</h2>
              <p className="text-white/70">When do you need this completed and what's your budget range?</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Preferred Timeline</h3>
              <div className="grid grid-cols-3 gap-3">
                {timelines.map((timeline) => (
                  <motion.button
                    key={timeline.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => ({ ...prev, timeline: timeline.id }))}
                    className={`p-4 rounded-xl border transition-all text-center ${
                      formData.timeline === timeline.id
                        ? 'bg-white/20 border-white/40'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <h4 className="text-white font-medium">{timeline.title}</h4>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Budget Range</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {budgetRanges.map((budget) => (
                  <motion.button
                    key={budget.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => ({ ...prev, budget: budget.id }))}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      formData.budget === budget.id
                        ? 'bg-white/20 border-white/40'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <h4 className="text-white font-medium">{budget.title}</h4>
                    <p className="text-white/60 text-sm">{budget.subtitle}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Current Site & Inspiration</h2>
              <p className="text-white/70">Tell us about your existing site and design preferences</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="hasCurrentSite"
                  checked={formData.hasCurrentSite}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasCurrentSite: e.target.checked }))}
                  className="w-5 h-5 rounded bg-white/10 border-white/20"
                />
                <label htmlFor="hasCurrentSite" className="text-white">
                  I have an existing website
                </label>
              </div>

              {formData.hasCurrentSite && (
                <input
                  type="url"
                  placeholder="Current website URL"
                  value={formData.currentSiteUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentSiteUrl: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              )}

              <div>
                <label className="block text-white font-medium mb-2">
                  Inspiration websites or design preferences
                </label>
                <textarea
                  rows={4}
                  placeholder="Share any websites you like, design styles you prefer, or specific features you want to include..."
                  value={formData.inspiration}
                  onChange={(e) => setFormData(prev => ({ ...prev, inspiration: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
                />
              </div>

              <div>
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                />
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileUpload')?.click()}
                  className="p-6 border-2 border-dashed border-white/20 rounded-xl text-center hover:border-white/40 transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white/60">Upload inspiration images, logos, or brand assets</p>
                  <p className="text-white/40 text-sm mt-1">Drag and drop files here or click to browse</p>
                  <p className="text-white/40 text-xs mt-1">Max 10MB per file • Images and PDFs only</p>
                </div>

                {formData.uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-white/80 text-sm font-medium">Uploaded Files:</p>
                    {formData.uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-white/60" />
                          <span className="text-white/90 text-sm">{file.name}</span>
                          <span className="text-white/50 text-xs">
                            ({(file.size / 1024 / 1024).toFixed(1)} MB)
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(index)
                          }}
                          className="text-white/50 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Contact Information</h2>
              <p className="text-white/70">How can we reach you with your personalized quote?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Business/Project Name</label>
                <input
                  type="text"
                  placeholder="Your business name"
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Contact Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.contactName}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white font-medium mb-2">Location</label>
                <input
                  type="text"
                  placeholder="City, State/Province, Country"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Project Description</label>
              <textarea
                rows={4}
                placeholder="Describe your project goals, target audience, and any specific requirements..."
                value={formData.projectDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Quote Summary</h2>
              <p className="text-white/70">Review your project details and estimated cost</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  £{calculateEstimate().toLocaleString()}
                </div>
                <p className="text-glacier-400">Estimated project cost</p>
              </div>

              <div className="border-t border-white/20 pt-4">
                <h3 className="text-white font-semibold mb-3">Project Details:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Project Type:</span>
                    <span className="text-white">{projectTypes.find(t => t.id === formData.projectType)?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Pages:</span>
                    <span className="text-white">{formData.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Timeline:</span>
                    <span className="text-white">{timelines.find(t => t.id === formData.timeline)?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Selected Features:</span>
                    <span className="text-white">{formData.features.length} features</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-glacier-500/20 border border-glacier-400/30 rounded-xl p-4">
              <p className="text-white/90 text-sm text-center">
                This is an estimated quote. Final pricing will be determined after consultation. 
                We'll contact you within 24 hours to discuss your project in detail.
              </p>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Additional Notes</label>
              <textarea
                rows={3}
                placeholder="Any additional information or special requirements..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Fixed Parallax Iceberg Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <div 
          className="iceberg-background w-full h-[600vh] bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/IcebergBG5.svg?v=3)',
            backgroundSize: '160% 600vh',
          }}
        />
      </div>

      <ParallaxBackground />

      {/* Main Content - positioned above background */}
      <main className="relative z-10 min-h-screen">
        <Navbar />
        
        <div className="pt-20">
        <div className="section-padding py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Get Your <span className="text-gradient">Custom Quote</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Tell us about your project and receive a personalized quote within 24 hours
            </p>
          </div>

          {/* Progress Bar - only show if not submitted */}
          {!isSubmitted && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-4">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      i + 1 <= currentStep ? 'bg-glacier-500 text-white' : 'bg-white/20 text-white/60'
                    }`}>
                      {i + 1 <= currentStep ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    {i < totalSteps - 1 && (
                      <div className={`h-0.5 w-16 mx-2 ${
                        i + 1 < currentStep ? 'bg-glacier-500' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <span className="text-white/60 text-sm">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
            </div>
          )}

          {/* Live Running Total - Fixed Position - only show if not submitted */}
          {!isSubmitted && (
            <motion.div
              key={calculateEstimate()} // Re-animate when estimate changes
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <div className="glass-dark rounded-2xl p-4 backdrop-blur-xl border border-glacier-400/30 shadow-lg">
                <div className="text-center">
                  <p className="text-glacier-400 text-sm font-medium mb-1">Estimate</p>
                  <div className="text-2xl font-bold text-white">
                    £{calculateEstimate().toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Form Content */}
          <div className="max-w-4xl mx-auto">
            {isSubmitted ? (
              /* Success Message */
              <div className="glass-dark rounded-3xl p-8 md:p-12 backdrop-blur-xl text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-glacier-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Quote Request Submitted!
                  </h2>
                  
                  <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                    Thank you for your interest in working with Glacier Web Design. We've received your project details and will get back to you with a personalized quote within 24 hours.
                  </p>
                  
                  <div className="bg-white/10 rounded-xl p-6 mb-8">
                    <h3 className="text-white font-semibold mb-4">What happens next?</h3>
                    <div className="space-y-3 text-white/70 text-left max-w-md mx-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-glacier-400 rounded-full"></div>
                        <span>We'll review your project requirements</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-glacier-400 rounded-full"></div>
                        <span>Prepare a detailed, personalized quote</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-glacier-400 rounded-full"></div>
                        <span>Contact you within 24 hours to discuss next steps</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-3 bg-glacier-500 text-white rounded-full hover:bg-glacier-600 transition-all"
                  >
                    Return to Home
                  </motion.button>
                </motion.div>
              </div>
            ) : (
              /* Quote Form */
              <div className="glass-dark rounded-3xl p-8 md:p-12 backdrop-blur-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                      currentStep === 1
                        ? 'bg-white/5 text-white/40 cursor-not-allowed'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={currentStep === totalSteps ? handleSubmit : nextStep}
                    className="flex items-center gap-2 px-6 py-3 bg-glacier-500 text-white rounded-full hover:bg-glacier-600 transition-all"
                  >
                    {currentStep === totalSteps ? 'Submit Quote Request' : 'Continue'}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
        
        <Footer />
      </main>
    </>
  )
} 