'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-ice-950 via-glacier-950 to-ice-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Privacy</span>
              <br />
              <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-glacier-200 leading-relaxed">
              Your privacy is important to us. This policy outlines how we collect, 
              use, and protect your personal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-dark rounded-2xl p-8 md:p-12 backdrop-blur-xl border border-white/10">
              <div className="prose prose-invert max-w-none">
                <p className="text-glacier-200 mb-6 text-sm">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                    <p className="text-glacier-200 mb-4">
                      We collect information you provide directly to us, such as when you create an account, 
                      request a quote, contact us, or use our services. This may include:
                    </p>
                    <ul className="list-disc list-inside text-glacier-200 space-y-2 ml-4">
                      <li>Name and contact information (email address, phone number)</li>
                      <li>Business information and project requirements</li>
                      <li>Payment information when you purchase our services</li>
                      <li>Communications between you and Glacier Web Design</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                    <p className="text-glacier-200 mb-4">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-glacier-200 space-y-2 ml-4">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process transactions and send related information</li>
                      <li>Send you technical notices, updates, and support messages</li>
                      <li>Respond to your comments, questions, and customer service requests</li>
                      <li>Communicate with you about products, services, and events</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                    <p className="text-glacier-200 mb-4">
                      We do not sell, trade, or otherwise transfer your personal information to third parties 
                      without your consent, except as described in this policy:
                    </p>
                    <ul className="list-disc list-inside text-glacier-200 space-y-2 ml-4">
                      <li>With your consent or at your direction</li>
                      <li>To comply with legal obligations</li>
                      <li>To protect and defend our rights and property</li>
                      <li>With service providers who assist in our operations</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                    <p className="text-glacier-200 mb-4">
                      We implement appropriate security measures to protect your personal information against 
                      unauthorized access, alteration, disclosure, or destruction. These measures include:
                    </p>
                    <ul className="list-disc list-inside text-glacier-200 space-y-2 ml-4">
                      <li>Encryption of sensitive data</li>
                      <li>Regular security assessments</li>
                      <li>Restricted access to personal information</li>
                      <li>Secure data storage and transmission</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
                    <p className="text-glacier-200 mb-4">
                      We use cookies and similar tracking technologies to track activity on our website 
                      and hold certain information. You can instruct your browser to refuse all cookies 
                      or to indicate when a cookie is being sent.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                    <p className="text-glacier-200 mb-4">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-glacier-200 space-y-2 ml-4">
                      <li>Access and receive a copy of your personal information</li>
                      <li>Rectify inaccurate personal information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Object to processing of your personal information</li>
                      <li>Request restriction of processing your personal information</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                    <p className="text-glacier-200 mb-4">
                      We may update this privacy policy from time to time. We will notify you of any 
                      changes by posting the new privacy policy on this page and updating the "Last updated" date.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                    <p className="text-glacier-200">
                      If you have any questions about this privacy policy or our practices, please contact us at:
                    </p>
                    <div className="mt-4 text-glacier-200">
                      <p><strong>Email:</strong> <a href="mailto:Infoglacierdesign@gmail.com" className="text-glacier-400 hover:text-glacier-300 transition-colors">Infoglacierdesign@gmail.com</a></p>
                      <p><strong>Phone:</strong> Access granted to clients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 