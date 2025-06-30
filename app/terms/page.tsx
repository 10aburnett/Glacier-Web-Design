'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsPage() {
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
              <span className="text-white">Terms of</span>
              <br />
              <span className="text-gradient">Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-glacier-200 leading-relaxed">
              Please read these terms carefully before using our services. 
              By using our services, you agree to be bound by these terms.
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
                  <strong>Last updated:</strong> January 2025
                </p>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                    <p className="text-glacier-200">
                      By accessing and using Glacier Web Design's services, you accept and agree to be bound by 
                      the terms and provision of this agreement. If you do not agree to abide by the above, 
                      please do not use this service.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                    <p className="text-glacier-200 mb-4">
                      Glacier Web Design provides web design, development, optimization, and related digital services. 
                      Our services include but are not limited to:
                    </p>
                    <ul className="list-disc list-inside text-glacier-200 space-y-2 ml-4">
                      <li>Website design and redesign</li>
                      <li>Web development and programming</li>
                      <li>Search engine optimization (SEO)</li>
                      <li>Website hosting and maintenance</li>
                      <li>Brand identity and digital marketing services</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Project Terms</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Payment Terms</h3>
                        <ul className="list-disc list-inside text-glacier-200 space-y-1 ml-4">
                          <li>10% deposit required before project commencement</li>
                          <li>Final payment due upon project completion</li>
                          <li>Late payments may incur additional fees</li>
                          <li>All payments are non-refundable unless specified otherwise</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Project Timeline</h3>
                        <ul className="list-disc list-inside text-glacier-200 space-y-1 ml-4">
                          <li>Timelines are estimates and may vary based on project complexity</li>
                          <li>Client delays in providing feedback or materials may extend timelines</li>
                          <li>We will communicate any timeline changes promptly</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Post-Project Maintenance</h3>
                        <p className="text-glacier-200">
                          Upon project completion, Glacier Web Design is not responsible for the ongoing 
                          maintenance, security, performance, or condition of the delivered website unless 
                          explicitly agreed upon in a separate maintenance contract. Clients assume full 
                          responsibility for website upkeep, updates, backups, and security after project delivery, 
                          unless ongoing support services have been specifically contracted and paid for.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Client Responsibilities</h2>
                    <p className="text-glacier-200 mb-4">
                      Clients are responsible for:
                    </p>
                    <ul className="list-disc list-inside text-glacier-200 space-y-2 ml-4">
                      <li>Providing accurate and complete project requirements</li>
                      <li>Supplying necessary content, images, and materials in a timely manner</li>
                      <li>Providing timely feedback and approvals</li>
                      <li>Ensuring all provided content is original or properly licensed</li>
                      <li>Making payments according to the agreed schedule</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Client Content</h3>
                        <p className="text-glacier-200">
                          Clients retain ownership of all content they provide. However, by providing content, 
                          clients grant Glacier Web Design a license to use, modify, and display the content 
                          for the purpose of completing the project.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Developed Work</h3>
                        <p className="text-glacier-200">
                          Upon full payment, clients receive ownership of the final website design and custom code. 
                          Glacier Web Design retains the right to use the work for portfolio and marketing purposes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">6. Warranties and Limitations</h2>
                    <p className="text-glacier-200 mb-4">
                      We provide our services "as is" without any warranties. We do not guarantee:
                    </p>
                    <ul className="list-disc list-inside text-glacier-200 space-y-2 ml-4">
                      <li>Specific search engine rankings or traffic increases</li>
                      <li>Compatibility with all future browser updates</li>
                      <li>Uninterrupted service or error-free operation</li>
                      <li>Protection against all security vulnerabilities</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                    <p className="text-glacier-200">
                      Glacier Web Design's liability is limited to the amount paid for services. We are not 
                      responsible for indirect, incidental, or consequential damages arising from the use 
                      of our services.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
                    <p className="text-glacier-200">
                      Either party may terminate services with written notice. Upon termination, the client 
                      is responsible for payment of all work completed. Partial refunds may be considered 
                      on a case-by-case basis.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">9. Modifications</h2>
                    <p className="text-glacier-200">
                      We reserve the right to modify these terms at any time. Changes will be effective 
                      immediately upon posting on our website. Continued use of our services constitutes 
                      acceptance of modified terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
                    <p className="text-glacier-200">
                      These terms are governed by and construed in accordance with applicable local laws. 
                      Any disputes will be resolved through binding arbitration or in competent courts.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                    <p className="text-glacier-200">
                      If you have questions about these terms, please contact us:
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