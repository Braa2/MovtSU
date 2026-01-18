import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'
import ScrollReveal from './ScrollReveal'
import ProcessTimeline from './ProcessTimeline'
import FluidBackground from './FluidBackground'
import './App.css'

const SERVICES = [
  { title: 'Work Visa Processing', desc: 'Navigate complex employment visa requirements with expert legal guidance.' },
  { title: 'Residency & Iqama Services', desc: 'Secure long-term residency permits for you and your family.' },
  { title: 'Business Setup & Licensing', desc: 'Establish your company with full legal compliance in KSA or UAE.' },
]

const FAQS = [
  {
    question: 'How long does the visa process typically take?',
    answer: 'The timeline varies depending on the visa type and individual circumstances. Work visas typically take 2-4 weeks, while residency permits may take 4-8 weeks. We provide detailed timelines during your initial consultation.'
  },
  {
    question: 'What documents do I need to apply for a Saudi work visa?',
    answer: 'Generally, you will need a valid passport, educational certificates (attested), medical reports, passport-sized photos, and an employment contract from your Saudi employer. We guide you through the complete documentation process.'
  },
  {
    question: 'Can my family join me in Saudi Arabia or UAE?',
    answer: 'Yes! Both countries offer family sponsorship programs. Once you have a valid residency permit and meet the minimum salary requirements, you can sponsor your spouse and children. We handle the entire family visa process.'
  },
  {
    question: 'What are the costs involved in immigration services?',
    answer: 'Our fees depend on the complexity of your case and the services required. We offer transparent pricing with no hidden fees. Schedule a free consultation to receive a detailed quote tailored to your needs.'
  },
  {
    question: 'Do you provide support after the visa is approved?',
    answer: 'Absolutely! Our support extends beyond visa approval. We assist with document attestation, Iqama processing, bank account setup, and ongoing legal consultation to ensure a smooth transition to your new home.'
  },
  {
    question: 'What happens if my visa application is rejected?',
    answer: 'While rejections are rare with proper preparation, we handle appeals and reapplications if needed. We analyze the rejection reason, address any issues, and resubmit with a stronger application at no additional consultation fee.'
  }
]

function App() {
  const [activeBg, setActiveBg] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const servicesTitleRef = useRef(null)
  const servicesSectionRef = useRef(null)
  const servicesRightRef = useRef(null)
  const heroRef = useRef(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Reliable image URLs (Pexels - no hotlink issues)
  const BG_IMAGES = {
    saudi: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&cs=tinysrgb&w=1920',
    uae: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1920'
  }

  // Preload images
  useEffect(() => {
    Object.values(BG_IMAGES).forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Hero section entrance animations
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    // Navbar animation
    anime({
      targets: '.floating-nav',
      translateY: [-100, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 300,
      easing: 'easeOutCubic'
    })

    // Hero title animation - word by word
    anime({
      targets: '.hero-title .word',
      translateY: [80, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: anime.stagger(100, { start: 600 }),
      easing: 'easeOutCubic'
    })

    // Hero subtitle animation
    anime({
      targets: '.hero-subtitle',
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 1200,
      easing: 'easeOutCubic'
    })

    // Hero button animation
    anime({
      targets: '.hero-btn',
      translateY: [30, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 800,
      delay: 1400,
      easing: 'easeOutBack'
    })

    // Trust section animation
    anime({
      targets: '.trust-section',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 1600,
      easing: 'easeOutCubic'
    })

    // Badges stagger animation
    anime({
      targets: '.badge',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100, { start: 1800 }),
      easing: 'easeOutCubic'
    })
  }, [])

  // Services header scroll animation
  useEffect(() => {
    const servicesTitleBlock = document.querySelector('.services-title-block')
    if (!servicesTitleBlock) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate label
            anime({
              targets: '.services-label',
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 800,
              easing: 'easeOutCubic'
            })

            // Animate main title
            anime({
              targets: '.services-sticky-title',
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: 200,
              easing: 'easeOutCubic'
            })

            // Animate subtitle
            anime({
              targets: '.services-subtitle',
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 800,
              delay: 400,
              easing: 'easeOutCubic'
            })

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(servicesTitleBlock)

    return () => observer.disconnect()
  }, [])

  // Parallax scroll effect for "What We Do" title - moves from first to last point
  // Only on desktop (>768px)
  useEffect(() => {
    const handleScroll = () => {
      // Disable parallax on mobile/tablet
      if (window.innerWidth <= 768) {
        if (servicesTitleRef.current) {
          servicesTitleRef.current.style.transform = 'translateY(0)'
        }
        return
      }

      if (!servicesTitleRef.current || !servicesRightRef.current) return

      const title = servicesTitleRef.current
      const rightColumn = servicesRightRef.current
      const serviceItems = rightColumn.querySelectorAll('.service-item')
      
      if (serviceItems.length === 0) return

      const firstItem = serviceItems[0]
      const lastItem = serviceItems[serviceItems.length - 1]
      
      // Get positions of first and last service points
      const firstRect = firstItem.getBoundingClientRect()
      const lastRect = lastItem.getBoundingClientRect()
      
      // Calculate the total travel distance (from first point to last point)
      const firstPointY = firstRect.top + 35 // Center of the point (70px / 2)
      const lastPointY = lastRect.top + 35
      
      const windowCenter = window.innerHeight / 2
      
      // Calculate progress: 0 when first point is at center, 1 when last point is at center
      const totalDistance = lastPointY - firstPointY
      const currentOffset = windowCenter - firstPointY
      
      let progress = 0
      if (totalDistance !== 0) {
        progress = currentOffset / Math.abs(totalDistance)
      }
      
      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, progress))
      
      // Calculate how much the title should move
      // It should travel the same vertical distance as the service items
      const titleTravel = Math.abs(totalDistance) * clampedProgress
      
      title.style.transform = `translateY(${titleTravel}px)`
    }

    // Also handle resize to reset on mobile
    const handleResize = () => {
      if (window.innerWidth <= 768 && servicesTitleRef.current) {
        servicesTitleRef.current.style.transform = 'translateY(0)'
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Smooth scroll function using anime.js
  const smoothScrollTo = (targetId) => {
    const target = document.getElementById(targetId)
    if (!target) return

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80

    anime({
      targets: { scrollY: window.scrollY },
      scrollY: targetPosition,
      duration: 1200,
      easing: 'easeInOutQuart',
      update: (anim) => {
        window.scrollTo(0, anim.animations[0].currentValue)
      }
    })
  }

  return (
    <div className="app-container">

      {/* Floating Pill Navbar */}
      <nav className="floating-nav">
        <div className="nav-brand" onClick={() => smoothScrollTo('hero')}>
          MovtoSU
        </div>
        <div className="nav-links">
          <span className="nav-link" onClick={() => smoothScrollTo('hero')}>Home</span>
          <span className="nav-link" onClick={() => smoothScrollTo('about')}>About</span>
          <span className="nav-link" onClick={() => smoothScrollTo('services')}>Services</span>
          <span className="nav-link" onClick={() => smoothScrollTo('faq')}>FAQ</span>
      </div>
        <button className="nav-contact-btn" onClick={() => smoothScrollTo('faq')}>
          Get Started  ✈️
        </button>
      </nav>

      {/* Hero Section */}
      <header id="hero" className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div 
          className={`country-bg ${activeBg === 'saudi' ? 'active' : ''}`} 
          style={{ backgroundImage: `url(${BG_IMAGES.saudi})` }} 
        />
        <div 
          className={`country-bg ${activeBg === 'uae' ? 'active' : ''}`} 
          style={{ backgroundImage: `url(${BG_IMAGES.uae})` }} 
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="word">We</span>{' '}
            <span className="word">help</span>{' '}
            <span className="word">people</span>{' '}
            <span className="word">move</span>
            <br />
            <span className="word">to</span>{' '}
            <span 
              className="word highlight saudi" 
              onMouseEnter={() => setActiveBg('saudi')} 
              onMouseLeave={() => setActiveBg(null)}
            >
              Saudi
            </span>{' '}
            <span className="word">or</span>{' '}
            <span 
              className="word highlight uae" 
              onMouseEnter={() => setActiveBg('uae')} 
              onMouseLeave={() => setActiveBg(null)}
            >
              UAE.
            </span>
          </h1>
          <p className="hero-subtitle">
            Book a consultation with us today and start your journey towards a 
            new life in the Kingdom of Saudi Arabia or the United Arab Emirates.
          </p>
          <button className="hero-btn" onClick={() => smoothScrollTo('about')}>
            Book a Consultation
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg>
          </button>
        </div>

        <div className="trust-section">
          <span className="trust-label">Licensed immigration consultants</span>
          <div className="badges">
            <div className="badge">
              <div className="badge-icon"></div>
              <span>Ministry of Justice (KSA)</span>
            </div>
            <div className="badge">
              <div className="badge-icon"></div>
              <span>Dubai Legal Affairs</span>
            </div>
            <div className="badge">
              <div className="badge-icon"></div>
              <span>Abu Dhabi Judicial Dept</span>
            </div>
          </div>
        </div>
      </header>

      {/* About Section with Scroll Reveal */}
      <section id="about" className="about-section">
        <div className="about-content">
          <ScrollReveal 
            baseOpacity={0.1}
            enableBlur={true}
            blurStrength={6}
            baseRotation={1}
            rotationEnd="center center"
            wordAnimationEnd="center center"
            textClassName="large"
          >
            
              <span className="word bold">MovtoSU</span>{' '}
              <span className="word accent">Law</span> 
              <span className="word">is a premier immigration law firm primarily focusing on Saudi and UAE Immigration.</span>

          </ScrollReveal>
          
          <ScrollReveal 
            baseOpacity={0.15}
            enableBlur={true}
            blurStrength={4}
            baseRotation={1}
            rotationEnd="center center"
            wordAnimationEnd="center center"
            textClassName="description"
          >
            We are devoted to providing a first-rate customer experience through increased efficiency and unparalleled communication. Our team of experienced attorneys navigates the complex immigration landscape so you can focus on your future.
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section - Parallax Title */}
      <section id="services" className="services-section" ref={servicesSectionRef}>
        <div className="services-container">
          {/* Left - Parallax Moving Title with Header */}
          <div className="services-left">
            <div className="services-title-block" ref={servicesTitleRef}>
              <span className="services-label">OUR SERVICES</span>
              <h2 className="services-sticky-title">What We Do</h2>
              <p className="services-subtitle">Expert legal guidance for your relocation journey</p>
            </div>
          </div>
          
          {/* Right - Service Items */}
          <div className="services-right" ref={servicesRightRef}>
            {SERVICES.map((service, i) => (
              <div key={i} className="service-item">
                <div className="service-point"></div>
                <div className="service-text">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <ProcessTimeline />

      {/* FAQ & Footer Section - Combined */}
      <footer id="faq" className="footer-combined">
        <FluidBackground
          colors={['#ff6b00', '#ff9500', '#ffb347']}
          speed={0.4}
        />
        
        {/* FAQ Content */}
        <div className="faq-container">
          <div className="faq-header">
            <span className="faq-label">Got Questions?</span>
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">Everything you need to know about immigrating to Saudi Arabia and UAE</p>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{faq.question}</h3>
                  <div className="faq-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" className="vertical-line"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Content */}
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="logo-text">MovtoSU <span className="logo-accent">Law</span></div>
              <p className="footer-tagline">Your trusted partner for immigration to Saudi Arabia and UAE.</p>
            </div>
            <div className="footer-nav">
              <div className="footer-col">
                <h4>Quick Links</h4>
                <a href="#">Home</a>
                <a href="#">About Us</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
              </div>
              <div className="footer-col">
                <h4>Services</h4>
                <a href="#">Work Visas</a>
                <a href="#">Residency</a>
                <a href="#">Business Setup</a>
                <a href="#">Consultation</a>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <a href="#">info@movtosu.law</a>
                <a href="#">+966 123 456 789</a>
                <a href="#">Riyadh, KSA</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 MovtoSU Law. All rights reserved.</span>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      </div>
  )
}

export default App