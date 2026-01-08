'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Camera, Heart, Star, User, Mail, Phone, MapPin, Award, Calendar, Image as ImageIcon, ChevronRight, Circle, Play, Send, Sparkles, Clock, MessageCircle, CheckCircle2, ArrowRight, Instagram, Facebook, Twitter, Linkedin, Video, Zap, Camera as CameraIcon, Aperture, Globe, ArrowUpRight, Download } from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

type JourneyNode = {
  id: string
  title: string
  icon: React.ElementType
  section: string
  image?: string
}

const journeyNodes: JourneyNode[] = [
  { id: 'welcome', title: 'Welcome', icon: Camera, section: 'welcome' },
  { id: 'services', title: 'Our Services', icon: Award, section: 'services' },
  { id: 'prewedding', title: 'Pre-wedding', icon: Heart, section: 'prewedding', image: '/images/prewedding-hero.png' },
  { id: 'ceremonies', title: 'Ceremonies', icon: Star, section: 'ceremonies', image: '/images/wedding-ceremony.png' },
  { id: 'portfolio', title: 'Portfolio', icon: ImageIcon, section: 'portfolio' },
  { id: 'about', title: 'About Us', icon: User, section: 'about', image: '/images/studio-interior.png' },
  { id: 'contact', title: 'Contact', icon: Mail, section: 'contact' },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState('welcome')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const isContactInView = useInView(contactRef, { once: false, amount: 0.3 })

  // Generate deterministic particle positions
  const particlePositions = useMemo(() => [
    { top: 25, left: 12, duration: 3.5 },
    { top: 48, left: 43, duration: 4.2 },
    { top: 22, left: 16, duration: 3.8 },
    { top: 51, left: 68, duration: 4.5 },
    { top: 40, left: 85, duration: 3.2 },
    { top: 25, left: 46, duration: 4.8 },
    { top: 39, left: 50, duration: 3.6 },
    { top: 23, left: 67, duration: 4.1 }
  ], [])

  // Generate deterministic sparkle positions around logo
  const sparklePositions = useMemo(() => [
    { top: 20, left: 50 },
    { top: 50, left: 93 },
    { top: 80, left: 75 },
    { top: 100, left: 50 },
    { top: 80, left: 25 },
    { top: 50, left: 7 }
  ], [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const sections = journeyNodes.map(node => document.getElementById(node.section))
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight

      setScrollProgress(scrollPosition / documentHeight)

      // Find active section
      let currentSection = 'welcome'
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            currentSection = journeyNodes[index].section
          }
        }
      })
      setActiveSection(currentSection)

      // Parallax effect
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    alert('Thank you for your inquiry! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', eventType: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Mind Map Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed left-0 top-0 h-full w-72 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 z-50 overflow-y-auto hidden lg:block`}
      >
        <div className="p-6">
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative w-28 h-28 mx-auto mb-4"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(251, 191, 36, 0.3)',
                    '0 0 40px rgba(251, 191, 36, 0.5)',
                    '0 0 20px rgba(251, 191, 36, 0.3)'
                  ],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
              />
              <motion.img
                src="/images/studio-logo.png"
                alt="Sumanth Clicks"
                className="relative w-full h-full object-contain rounded-full p-2"
                animate={{
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              {/* Sparkles */}
              {mounted && sparklePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-amber-400 rounded-full"
                  style={{
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-center bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent"
            >
              Sumanth Clicks
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-slate-400 text-sm mt-1"
            >
              Capturing Moments, Creating Memories
            </motion.p>
          </div>

          {/* Mind Map Tree */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Your Journey
            </div>
            {journeyNodes.map((node, index) => (
              <div key={node.id} className="relative">
                {/* Connection Line */}
                {index < journeyNodes.length - 1 && (
                  <motion.div
                    className="absolute left-5 top-10 w-0.5 h-full bg-gradient-to-b from-amber-500/50 via-amber-500/30 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  />
                )}

                <motion.button
                  onClick={() => scrollToSection(node.section)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative ${
                    activeSection === node.section
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/50 shadow-lg shadow-amber-500/10'
                      : 'hover:bg-slate-800/50 border border-transparent'
                  }`}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <motion.div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeSection === node.section
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 scale-110 shadow-lg'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}
                    whileHover={{ scale: activeSection === node.section ? 1.1 : 1.1, rotate: 5 }}
                  >
                    <node.icon size={18} />
                    {activeSection === node.section && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber-400/30"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  <div className="relative z-10 flex-1 text-left">
                    <div
                      className={`font-medium transition-colors ${
                        activeSection === node.section ? 'text-amber-400' : 'text-slate-300'
                      }`}
                    >
                      {node.title}
                    </div>
                  </div>

                  {activeSection === node.section && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent rounded-xl -z-0"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {activeSection !== node.section && (
                    <ChevronRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </motion.button>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 p-4 bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-xl border border-slate-700/30"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Journey Progress
              </span>
              <span className="text-xs text-amber-400 font-semibold">{Math.round(scrollProgress * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full"
                style={{ width: `${scrollProgress * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-lg"
      >
        <MenuIcon isOpen={isMobileMenuOpen} />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 30 }}
            className="lg:hidden fixed inset-0 z-40 pt-20 px-4 bg-slate-950/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-sm mx-auto border border-slate-700/50"
            >
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Navigate Journey
              </h2>
              <div className="space-y-2">
                {journeyNodes.map((node) => (
                  <motion.button
                    key={node.id}
                    onClick={() => scrollToSection(node.section)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      activeSection === node.section
                        ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/50'
                        : 'hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <node.icon size={20} className={activeSection === node.section ? 'text-amber-400' : 'text-slate-400'} />
                    <span className={activeSection === node.section ? 'text-amber-400 font-medium' : 'text-slate-300'}>
                      {node.title}
                    </span>
                    {activeSection === node.section && <CheckCircle2 className="w-4 h-4 text-amber-400 ml-auto" />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-72">
        {/* Welcome Section */}
        <section id="welcome" className="min-h-screen relative flex items-center justify-center overflow-hidden">
          {/* Parallax Background */}
          <div ref={parallaxRef} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-slate-900/70" />
            <motion.div
              className="absolute inset-0 bg-[url('/images/studio-logo.png')] bg-cover bg-center opacity-[0.03] blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Floating Elements */}
          {mounted && particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/40 rounded-full"
              style={{
                top: `${pos.top}%`,
                left: `${pos.left}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
            />
          ))}

          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative w-40 h-40 mx-auto mb-10"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(251, 191, 36, 0.4)',
                    '0 0 60px rgba(251, 191, 36, 0.6)',
                    '0 0 30px rgba(251, 191, 36, 0.4)'
                  ],
                  rotate: 360
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              <motion.img
                src="/images/studio-logo.png"
                alt="Sumanth Clicks Logo"
                className="relative w-full h-full object-contain rounded-full p-3"
                animate={{
                  rotate: [-360, 0]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4" />
                Professional Photography & Videography
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent animate-gradient">
                Sumanth Clicks
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto"
            >
              Capturing Your Most Precious Moments
            </motion.p>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              With artistry and passion, we transform your special moments into timeless memories. Specializing in
              pre-wedding shoots, wedding ceremonies, and all your special occasions across India.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                onClick={() => scrollToSection('services')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-semibold text-slate-900 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all flex items-center gap-2"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-slate-600 hover:border-amber-500 rounded-full font-semibold text-slate-300 hover:text-amber-400 transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Contact Now
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-8 h-8 text-amber-400 rotate-90" />
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="min-h-screen py-24 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-slate-900" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">Our Services</h2>
              </motion.div>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
                Comprehensive photography and videography solutions for every occasion
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: 'Pre-Wedding Photography',
                  description: 'Romantic and creative pre-wedding shoots that capture your love story in stunning locations',
                  color: 'from-pink-500 to-rose-600',
                  features: ['Romantic Locations', 'Creative Themes', 'Professional Editing']
                },
                {
                  icon: Star,
                  title: 'Wedding Ceremonies',
                  description: 'Complete wedding coverage from mehndi to reception, preserving every precious moment',
                  color: 'from-amber-500 to-orange-600',
                  features: ['Full Day Coverage', 'Traditional & Candid', 'Multi-camera Setup']
                },
                {
                  icon: Camera,
                  title: 'Portrait Photography',
                  description: 'Professional portraits that showcase your personality and style',
                  color: 'from-purple-500 to-indigo-600',
                  features: ['Studio Sessions', 'Outdoor Portraits', 'Family Photoshoots']
                },
                {
                  icon: Video,
                  title: 'Cinematic Videography',
                  description: 'Cinematic wedding films and event videos that tell your story beautifully',
                  color: 'from-cyan-500 to-blue-600',
                  features: ['4K Quality', 'Drone Shots', 'Storytelling Style']
                },
                {
                  icon: Calendar,
                  title: 'Event Coverage',
                  description: 'Corporate events, parties, and special occasions captured professionally',
                  color: 'from-emerald-500 to-teal-600',
                  features: ['Corporate Events', 'Parties', 'Special Occasions']
                },
                {
                  icon: Download,
                  title: 'Photo Albums',
                  description: 'Beautifully designed photo albums and coffee table books',
                  color: 'from-amber-500 to-yellow-600',
                  features: ['Premium Albums', 'Coffee Table Books', 'Digital Gallery']
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 overflow-hidden"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-amber-600 group-hover:bg-clip-text transition-all">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-wedding Section */}
        <section id="prewedding" className="min-h-screen py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/prewedding-hero.png"
              alt="Pre-wedding"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Pre-Wedding Photography</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Your love story deserves to be told beautifully. Our pre-wedding photography sessions capture the chemistry,
                romance, and excitement of your journey together. From intimate portraits to playful candid moments,
                we create timeless images that you'll cherish forever.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🌅', title: 'Romantic Locations', desc: 'Sunset beaches, mountains' },
                  { icon: '🏢', title: 'Indoor Studio', desc: 'Creative studio setups' },
                  { icon: '👗', title: 'Traditional', desc: 'Cultural themes' },
                  { icon: '✨', title: 'Contemporary', desc: 'Modern artistic styles' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ceremonies Section */}
        <section id="ceremonies" className="min-h-screen py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/wedding-ceremony.png"
              alt="Wedding Ceremonies"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 flex justify-end">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg ml-auto"
              >
                <Star className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-right">Wedding Ceremonies</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed text-right">
                From the intimate moments of mehndi and haldi to the grand celebrations of the wedding and reception,
                we capture every ceremony with artistry and attention to detail. Our team documents your special day
                with a perfect blend of traditional and candid photography.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎨', title: 'Mehndi', desc: 'Colorful ceremonies', color: 'from-pink-500 to-rose-500' },
                  { icon: '💛', title: 'Haldi', desc: 'Joyful moments', color: 'from-yellow-500 to-orange-500' },
                  { icon: '💍', title: 'Engagement', desc: 'Beautiful beginnings', color: 'from-purple-500 to-indigo-500' },
                  { icon: '🎊', title: 'Reception', desc: 'Grand celebrations', color: 'from-emerald-500 to-teal-500' }
                ].map((ceremony, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 text-center"
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${ceremony.color} flex items-center justify-center mx-auto mb-3`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-xl">{ceremony.icon}</span>
                    </motion.div>
                    <h3 className="font-bold mb-1">{ceremony.title}</h3>
                    <p className="text-sm text-slate-400">{ceremony.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="min-h-screen py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-slate-900" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">Our Portfolio</h2>
              </motion.div>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mt-4">
                A glimpse into the beautiful moments we've captured
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { image: '/images/bride-portrait.png', title: 'Bride Portrait', category: 'Wedding' },
                { image: '/images/groom-portrait.png', title: 'Groom Portrait', category: 'Wedding' },
                { image: '/images/candid-moment.png', title: 'Candid Moments', category: 'Wedding' },
                { image: '/images/reception-hall.png', title: 'Reception', category: 'Ceremony' },
                { image: '/images/prewedding-hero.png', title: 'Love Story', category: 'Pre-wedding' },
                { image: '/images/photo-album.png', title: 'Memories', category: 'Album' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <motion.div
                      className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-6 h-6 text-slate-900" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-xs text-amber-400 font-medium mb-1 uppercase tracking-wider"
                    >
                      {item.category}
                    </motion.div>
                    <div className="text-xl font-bold">{item.title}</div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/studio-interior.png"
              alt="Studio Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-900" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">About Us</h2>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                At Sumanth Clicks, we believe that every moment is worth capturing. With years of experience in
                professional photography and videography, we bring passion, creativity, and technical expertise to
                every shoot. Our team specializes in Indian weddings and ceremonies, understanding the cultural
                significance of every ritual and celebration.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Creative Excellence',
                  'Professional Team',
                  'State-of-the-art Equipment',
                  'Timely Delivery',
                  'Customer Satisfaction',
                  'Affordable Pricing'
                ].map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-slate-800/50 backdrop-blur-xl rounded-full border border-slate-700/50 text-sm text-slate-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { value: '500+', label: 'Weddings Covered', icon: '💒' },
                { value: '1000+', label: 'Happy Couples', icon: '❤️' },
                { value: '10+', label: 'Years Experience', icon: '📸' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 text-center"
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="min-h-screen py-24 px-4 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, -180, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="w-6 h-6 text-slate-900" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">Get In Touch</h2>
              </motion.div>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-lg max-w-2xl mx-auto mt-4"
              >
                Ready to create beautiful memories? Let's talk about your special day.
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Phone - Highlighted */}
                <motion.div
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="group relative bg-gradient-to-r from-amber-500/10 to-amber-600/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/30 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="relative flex items-start gap-4">
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Phone className="w-7 h-7 text-slate-900" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-amber-400">Call Us Directly</h3>
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl md:text-3xl font-bold text-white mb-1"
                      >
                        +91 70930 1442
                      </motion.div>
                      <p className="text-slate-400 text-sm">Available 24/7 for inquiries</p>
                      <motion.div
                        className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-slate-900 font-semibold text-sm cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </motion.div>
                    </div>
                  </div>
                  {/* Decorative Element */}
                  <motion.div
                    className="absolute -right-6 -top-6 w-20 h-20 bg-amber-400/20 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="group relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-amber-500 group-hover:to-amber-600 transition-colors"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Mail className="w-7 h-7 text-white group-hover:text-slate-900 transition-colors" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">Email Us</h3>
                      <p className="text-white text-lg mb-1">hello@sumanthclicks.com</p>
                      <p className="text-slate-400 text-sm">We reply within 24 hours</p>
                    </div>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="group relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-amber-500 group-hover:to-amber-600 transition-colors"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <MapPin className="w-7 h-7 text-white group-hover:text-slate-900 transition-colors" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">Location</h3>
                      <p className="text-white text-lg mb-1">Available across India</p>
                      <p className="text-slate-400 text-sm">We travel to your venue</p>
                    </div>
                  </div>
                </motion.div>

                {/* Social Media */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <h3 className="font-bold text-lg mb-4 text-slate-300">Follow Us</h3>
                  <div className="flex gap-4">
                    {[Instagram, Facebook, Twitter, Linkedin].map((SocialIcon, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        whileHover={{ y: -4, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 flex items-center justify-center hover:border-amber-500 hover:from-amber-500 hover:to-amber-600 hover:bg-gradient-to-br transition-all"
                      >
                        <SocialIcon className="w-5 h-5 text-slate-300 hover:text-slate-900 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <motion.div
                  className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50"
                  whileHover={{ borderColor: 'rgba(251, 191, 36, 0.3)' }}
                >
                  {/* Decorative Header */}
                  <motion.div
                    className="mb-8 flex items-center gap-3 pb-6 border-b border-slate-700/50"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center"
                      animate={{
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <MessageCircle className="w-6 h-6 text-slate-900" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold">Send Us a Message</h3>
                      <p className="text-slate-400 text-sm">We'll get back to you shortly</p>
                    </div>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-sm font-medium mb-2 text-slate-300">Your Name</label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-500"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Phone Input */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      <label className="block text-sm font-medium mb-2 text-slate-300">Phone Number</label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-500"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                    >
                      <label className="block text-sm font-medium mb-2 text-slate-300">Email Address</label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-500"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Event Type Select */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                    >
                      <label className="block text-sm font-medium mb-2 text-slate-300">Event Type</label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select event type</option>
                          <option value="prewedding">Pre-wedding Shoot</option>
                          <option value="wedding">Wedding Ceremony</option>
                          <option value="portrait">Portrait Photography</option>
                          <option value="videography">Videography</option>
                          <option value="event">Other Events</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
                      </motion.div>
                    </motion.div>

                    {/* Message Textarea */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.0 }}
                    >
                      <label className="block text-sm font-medium mb-2 text-slate-300">Your Message</label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your event and requirements..."
                          rows={4}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-500 resize-none"
                        />
                      </motion.div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl font-semibold text-slate-900 hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.1 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    {/* Quick Contact */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 }}
                      className="text-center pt-4 border-t border-slate-700/50"
                    >
                      <p className="text-slate-400 text-sm mb-3">Need immediate assistance?</p>
                      <motion.a
                        href="tel:+91709301442"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white font-semibold text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        Call: +91 70930 1442
                      </motion.a>
                    </motion.div>
                  </form>
                </motion.div>

                {/* Floating Decorations */}
                {isContactInView && (
                  <>
                    <motion.div
                      className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400/30 rounded-lg"
                      animate={{ rotate: 45, y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute -bottom-4 -left-4 w-6 h-6 bg-rose-400/30 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </>
                )}
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { icon: CheckCircle2, text: '24/7 Support', color: 'from-blue-500 to-cyan-500' },
                { icon: Zap, text: 'Quick Response', color: 'from-amber-500 to-orange-500' },
                { icon: CameraIcon, text: 'Expert Team', color: 'from-purple-500 to-indigo-500' },
                { icon: Heart, text: 'Client Satisfaction', color: 'from-pink-500 to-rose-500' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-slate-700/30 text-center"
                >
                  <motion.div
                    className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="text-slate-300 text-sm font-medium">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-slate-800/50 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 mb-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/images/studio-logo.png"
                    alt="Sumanth Clicks"
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-xl font-bold">Sumanth Clicks</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Professional Photography & Videography Studio. Capturing moments, creating memories across India.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  {['Services', 'Portfolio', 'About Us', 'Contact'].map((link, index) => (
                    <motion.a
                      key={index}
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      whileHover={{ x: 4 }}
                      className="block text-slate-400 text-sm hover:text-amber-400 transition-colors"
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4">Contact Info</h4>
                <div className="space-y-2 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>+91 70930 1442</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>hello@sumanthclicks.com</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-slate-800 text-center text-slate-400 text-sm"
            >
              <p>© 2026 Sumanth Clicks. All rights reserved. Capturing moments, creating memories.</p>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  )
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-6">
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
        className="absolute top-0 left-0 w-full h-0.5 bg-white"
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1 }}
        className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2"
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
        className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
      />
    </div>
  )
}
