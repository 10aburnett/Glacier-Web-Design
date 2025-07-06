'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Link from 'next/link'
import { useScrollToTop } from '@/components/LenisProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  MessageCircle, 
  Target, 
  Sparkles, 
  Users, 
  Zap, 
  MapPin, 
  Heart,
  Clock,
  DollarSign,
  PhoneCall,
  CheckCircle,
  ArrowRight,
  Calendar,
  Mail
} from 'lucide-react'

const advantages = [
  {
    icon: MessageCircle,
    title: "We Speak Human, Not Tech",
    description: "Let's be honest — most web agencies bury you in jargon. We don't. We explain things simply, clearly, and honestly. You'll always know what's happening and why.",
    gradient: "from-glacier-500 to-glacier-600"
  },
  {
    icon: Target,
    title: "Design That Actually Works",
    description: "Your website isn't just decoration. It should bring in customers, bookings, calls — whatever your business needs to grow. We focus on sleek, modern design that's built to convert.",
    gradient: "from-glacier-400 to-glacier-500"
  },
  {
    icon: Sparkles,
    title: "Fresh Eyes, No Templates",
    description: "Because we're new, we aren't stuck in old habits. We don't recycle templates or phone it in. Every site we build is crafted from scratch to reflect your unique brand and goals.",
    gradient: "from-glacier-600 to-glacier-700"
  },
  {
    icon: Heart,
    title: "Every Project Matters",
    description: "We don't have 50 past clients to show — yet. But that means every project is personal. We go above and beyond to make you proud and to make sure your site becomes our next success story.",
    gradient: "from-glacier-500 to-fintech-primary"
  }
]

const processPoints = [
  {
    icon: Zap,
    title: "Powered by AI + Code",
    description: "We use the same cutting-edge tools used by top tech startups — like Cursor, Tailwind, and AI-powered workflows — to move fast and build smart.",
    gradient: "from-fintech-accent to-glacier-400"
  },
  {
    icon: MapPin,
    title: "We Come to You",
    description: "We don't sit in a fancy office waiting for leads. We walk into your café, your studio, your workshop — because we want to understand your business firsthand.",
    gradient: "from-glacier-600 to-fintech-accent"
  },
  {
    icon: Users,
    title: "No Middlemen. Just Will and Alex.",
    description: "You're working directly with the people designing and building your site. No handoffs, no fluff, no markup. Just us, building something great with you.",
    gradient: "from-fintech-primary to-glacier-500"
  }
]

const workflowSteps = [
  {
    step: "01",
    title: "Personal Discovery",
    description: "We start with a real conversation — no sales pitch. We visit your space, understand your business, and listen to your goals."
  },
  {
    step: "02", 
    title: "Flexible Timeline",
    description: "Need it fast? We can deliver. Want to take it slow? That works too. We adapt our timeline to your business needs and budget."
  },
  {
    step: "03",
    title: "Direct Communication",
    description: "You have Will and Alex's direct contact. Quick questions, updates, changes — we're always available, not hidden behind support tickets."
  },
  {
    step: "04",
    title: "Transparent Collaboration",
    description: "Watch your site come to life in real-time. We share progress daily and iterate based on your feedback until it's perfect."
  }
]

export default function WhyGlacierPage() {
  const { scrollToTop, navigateAndScrollToTop } = useScrollToTop()
  
  // Ensure page loads at top
  useEffect(() => {
    scrollToTop()
  }, [scrollToTop])
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-ice-950 via-glacier-950 to-ice-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-glacier-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-fintech-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-mobile-section-heading lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="text-white">Why</span>
              <br />
              <span className="text-gradient">Glacier?</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16">
        <div className="section-padding">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div
                  key={index}
                  className="backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-white/30 rounded-2xl p-6 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 group hover:bg-white/10"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${advantage.gradient} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-2xl bg-ice-950 flex items-center justify-center group-hover:bg-ice-900 transition-colors">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{advantage.title}</h3>
                  <p className="text-glacier-200 leading-relaxed">{advantage.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meet Will & Alex */}
      <section className="py-16">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Will & Alex</h2>
            <p className="text-xl text-glacier-200">The two-person team behind every Glacier project</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {processPoints.map((point, index) => {
              const Icon = point.icon
              return (
                <div
                  key={index}
                  className="backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-white/30 rounded-2xl p-6 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 group text-center hover:bg-white/10"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${point.gradient} p-0.5 mb-6 mx-auto`}>
                    <div className="w-full h-full rounded-2xl bg-ice-950 flex items-center justify-center group-hover:bg-ice-900 transition-colors">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{point.title}</h3>
                  <p className="text-glacier-200 leading-relaxed">{point.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing & Timeline */}
      <section className="py-16">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Flexible & Fair</h2>
            <p className="text-xl text-glacier-200">Pricing and timelines that work for your business</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pricing Card */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-white/30 rounded-2xl p-8 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 hover:bg-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glacier-500 to-glacier-600 p-0.5">
                  <div className="w-full h-full rounded-xl bg-ice-950 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">Flexible Pricing</h3>
              </div>
              <p className="text-glacier-200 leading-relaxed mb-6">
                We deliberately undercut industry standards because we're building our reputation, not padding profit margins. 
                Our pricing adapts to your budget and project scope.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-glacier-200">
                  <CheckCircle className="w-5 h-5 text-glacier-400 flex-shrink-0" />
                  <span>30-50% below agency rates</span>
                </li>
                <li className="flex items-center gap-3 text-glacier-200">
                  <CheckCircle className="w-5 h-5 text-glacier-400 flex-shrink-0" />
                  <span>Payment plans available</span>
                </li>
                <li className="flex items-center gap-3 text-glacier-200">
                  <CheckCircle className="w-5 h-5 text-glacier-400 flex-shrink-0" />
                  <span>No hidden fees or markups</span>
                </li>
              </ul>
            </div>

            {/* Timeline Card */}
            <div className="backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-white/30 rounded-2xl p-8 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 hover:bg-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fintech-accent to-glacier-400 p-0.5">
                  <div className="w-full h-full rounded-xl bg-ice-950 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">Flexible Timeline</h3>
              </div>
              <p className="text-glacier-200 leading-relaxed mb-6">
                Your timeline becomes our timeline. Whether you need it done quickly for a launch 
                or want to spread it out for budget reasons, we adapt to your business needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-glacier-200">
                  <CheckCircle className="w-5 h-5 text-fintech-accent flex-shrink-0" />
                  <span>Priority projects in 1-2 weeks</span>
                </li>
                <li className="flex items-center gap-3 text-glacier-200">
                  <CheckCircle className="w-5 h-5 text-fintech-accent flex-shrink-0" />
                  <span>Standard delivery in 3-4 weeks</span>
                </li>
                <li className="flex items-center gap-3 text-glacier-200">
                  <CheckCircle className="w-5 h-5 text-fintech-accent flex-shrink-0" />
                  <span>Extended timelines for budget flexibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Workflow */}
      <section className="py-16">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Personal Touch, Every Step</h2>
            <p className="text-xl text-glacier-200">What working with us actually looks like</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className="backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-white/30 rounded-2xl p-6 shadow-2xl shadow-black/20 hover:shadow-black/30 mb-4 last:mb-0 transition-all duration-300 hover:bg-white/10"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-glacier-500 to-glacier-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-glacier-200 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Value Prop */}
      <section className="py-16">
        <div className="section-padding">
          <div
            className="backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-white/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 max-w-4xl mx-auto text-center hover:bg-white/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-glacier-500 to-fintech-primary p-0.5 mb-6 mx-auto">
              <div className="w-full h-full rounded-2xl bg-ice-950 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">A Website You'll Actually Love</h2>
            <p className="text-xl text-glacier-200 mb-8 leading-relaxed">
              Our job isn't done until you're excited to show your website to the world. 
              We care deeply about the details, the design, and how it feels to you.
            </p>
            <p className="text-lg text-glacier-300 mb-8">
              Whether your website is 10 years old or doesn't even exist yet, 
              we'll help you build something fresh, fast, and future-ready.
            </p>
            
            <div className="flex justify-center">
              <button 
                onClick={() => navigateAndScrollToTop('/contact')}
                className="btn-primary inline-flex items-center justify-center"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}