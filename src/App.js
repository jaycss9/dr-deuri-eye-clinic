/**
 * SEO & CLIENT-SIDE RENDERING (CRA) NOTE:
 * Since this application is built with Create React App (client-rendered, no SSR),
 * the meta tags injected via `react-helmet` will not be crawlable out-of-the-box by
 * all search engine bots or social sharing crawlers that do not execute JavaScript.
 *
 * FOR PRODUCTION SEO / OPEN GRAPH SUPPORT:
 * - Option A: Use a static pre-rendering tool like `react-snap` or `prerender-spa-plugin`
 *   to generate static HTML files at build time.
 * - Option B: Migrate to a Server-Side Rendered / Static Site Generation framework
 *   such as Next.js or Remix for native, zero-config SEO crawling and OG preview generation.
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  ShieldCheck,
  Award,
  Heart,
  Activity,
  Eye,
  CheckCircle2,
  ChevronDown,
  Star,
  Menu,
  X,
  ExternalLink,
  Stethoscope,
  Sparkles,
  Users,
  Smile,
  Compass,
  Zap,
  Check,
  AlertCircle,
  Navigation
} from 'lucide-react';

// Custom inline SVG components for brand/social icons since they are not in the installed lucide-react package
function Facebook({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Twitter({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Instagram({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function Linkedin({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}


// ==============================================================================
// GLOBAL CONSTANTS & PLACEHOLDERS
// ==============================================================================
// REPLACE ME: Update with the clinic's actual official phone number
const PHONE_NUMBER_DISPLAY = "+91-XXXXXXXXXX";
const PHONE_NUMBER_LINK = "tel:+91XXXXXXXXXX";

// REPLACE ME: Update with the clinic's actual official WhatsApp number (with country code, no + or spaces)
const WHATSAPP_LINK = "https://wa.me/91XXXXXXXXXX?text=Hello%20Dr.%20Deuri%20Clinic,%20I%20would%20like%20to%20book%20an%20eye%20consultation.";

// ==============================================================================
// ANIMATION VARIANTS (Framer Motion)
// ==============================================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

// ==============================================================================
// SUB-COMPONENT: STICKY NAVIGATION BAR
// ==============================================================================
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Doctor", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Conditions", href: "#conditions" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking for active state
      const sections = ['home', 'about', 'services', 'why-choose-us', 'conditions', 'testimonials', 'faq', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Detect active section based on proximity to top of screen
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-md shadow-slate-100/30 py-3"
          : "bg-white border-b border-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo / Doctor Name */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Dr. Hari Narayan Deuri Eye Specialist Clinic Home"
          >
            <div className="relative flex items-center justify-center shrink-0">
              {/* Decorative spinning gradient ring on hover */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-medical-400 to-blue-500 opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-700 blur-[2px] shrink-0" />
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-medical-600 to-medical-500 flex items-center justify-center text-white shadow-md shadow-medical-500/20 shrink-0 transition-transform group-hover:scale-105 duration-300">
                <Eye className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" aria-hidden="true" />
              </div>
            </div>
            <div>
              <span className="block text-lg font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-medical-600 transition-colors">
                Dr. Hari Narayan Deuri
              </span>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-medical-600 mt-1">
                Eye Specialist • Assam
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-50 border border-slate-100 p-1.5 rounded-2xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-bold tracking-tight transition-all duration-200 py-2 px-3.5 rounded-xl ${
                    isActive
                      ? "text-medical-700 bg-white shadow-sm"
                      : "text-slate-600 hover:text-medical-600 hover:bg-white/50"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action Buttons: Phone & WhatsApp */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href={PHONE_NUMBER_LINK}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 hover:border-slate-300 transition-all duration-200 shadow-xs hover:scale-[1.02] active:scale-[0.98]"
              aria-label={`Call Dr. Hari Narayan Deuri at ${PHONE_NUMBER_DISPLAY}`}
            >
              <Phone className="w-3.5 h-3.5 text-medical-600" aria-hidden="true" />
              <span>{PHONE_NUMBER_DISPLAY}</span>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Book appointment via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={PHONE_NUMBER_LINK}
              className="md:hidden p-2.5 rounded-xl text-medical-700 bg-medical-50 border border-medical-200/50 hover:bg-medical-100 transition-colors"
              aria-label="Call clinic"
            >
              <Phone className="w-5 h-5 animate-pulse" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Drawer Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs xl:hidden"
              />

              {/* Drawer Content */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl xl:hidden flex flex-col p-6 border-l border-slate-100 overflow-y-auto"
              >
                {/* Header of Drawer */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-medical-600 to-medical-500 flex items-center justify-center text-white shadow-md shadow-medical-500/10">
                      <Eye className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-sm font-extrabold text-slate-900 leading-none">Dr. H. N. Deuri</span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-medical-600 mt-1">Eye Clinic</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links list */}
                <div className="flex flex-col gap-1.5 py-6 flex-grow">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                          isActive
                            ? "text-medical-600 bg-medical-50"
                            : "text-slate-700 hover:text-medical-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className="w-4 h-4 -rotate-90 opacity-40" />
                      </a>
                    );
                  })}
                </div>

                {/* Footer / CTA buttons in Drawer */}
                <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                  <a
                    href={PHONE_NUMBER_LINK}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-medical-700 bg-medical-50 hover:bg-medical-100 border border-medical-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call: {PHONE_NUMBER_DISPLAY}</span>
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md shadow-emerald-500/10"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Booking</span>
                  </a>
                  <div className="text-center pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mon - Sat OPD Schedule</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

// ==============================================================================
// SUB-COMPONENT: HERO SECTION
// ==============================================================================
function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-medical-50/70 via-white to-white pt-12 pb-20 lg:pt-20 lg:pb-28"
      aria-label="Hero Section"
    >
      {/* Decorative background blur accents */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-medical-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            {/* Trusted specialist badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-medical-100/80 border border-medical-200 text-medical-800 text-xs sm:text-sm font-semibold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-medical-600" aria-hidden="true" />
              <span>Trusted Specialist • 8+ Years Experience in Assam</span>
            </div>

            {/* Main SEO-optimized Hero Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
              Comprehensive Eye Care in <span className="text-medical-600 underline decoration-medical-300 decoration-wavy decoration-2">Narayanpur</span> &amp; <span className="text-medical-600">Gohpur</span>
            </h1>

            {/* Subheading emphasizing trust and affordability */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              Restoring crystal-clear vision with compassionate, patient-first ophthalmology. Dr. Hari Narayan Deuri offers trusted, affordable eye treatment in Assam with emergency care for families across 6+ towns.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={PHONE_NUMBER_LINK}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold text-white bg-medical-600 hover:bg-medical-700 transition-all shadow-lg shadow-medical-600/25 focus:ring-4 focus:ring-medical-400"
                aria-label="Call clinic now for immediate eye consultation"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                <span>Call Now: {PHONE_NUMBER_DISPLAY}</span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300/80 transition-all shadow-sm focus:ring-4 focus:ring-emerald-400"
                aria-label="Chat on WhatsApp with Dr. Hari Narayan Deuri"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                <span>WhatsApp Appointment</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-medical-600">8+ Yrs</p>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Clinical Experience</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-medical-600">6+ Towns</p>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Patients Served</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-medical-600">100%</p>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Affordable Care</p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Content: Two Side-by-Side Clinic Timing Cards */}
          <motion.div
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft-xl relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-medical-50 text-medical-600 rounded-xl">
                    <Clock className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Clinic Timings &amp; Locations</h2>
                    <p className="text-xs font-medium text-slate-500">Dedicated Daily OPD Schedules</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  OPD Open
                </span>
              </div>

              {/* Two side-by-side timing cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1: Narayanpur Clinic — Morning Timing */}
                <div className="p-5 rounded-2xl bg-medical-50/70 border border-medical-200/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-medical-700 bg-medical-100 px-2 py-0.5 rounded">
                        Morning Clinic
                      </span>
                      <MapPin className="w-4 h-4 text-medical-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Narayanpur Clinic</h3>
                    <p className="text-xs text-slate-600 mb-3">
                      Main OPD Centre, Near Narayanpur Chariali, Assam
                    </p>
                  </div>
                  <div className="pt-3 border-t border-medical-200/60 mt-2">
                    <p className="text-xs font-semibold text-slate-500">CONSULTATION HOURS</p>
                    <p className="text-sm font-extrabold text-medical-900 mt-0.5">09:00 AM – 01:30 PM</p>
                    <p className="text-xs font-medium text-slate-600 mt-1">Monday to Saturday</p>
                  </div>
                </div>

                {/* Card 2: Gohpur Clinic — Evening Timing */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                        Evening Clinic
                      </span>
                      <MapPin className="w-4 h-4 text-slate-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Gohpur Clinic</h3>
                    <p className="text-xs text-slate-600 mb-3">
                      Specialist Eye Care Centre, Gohpur Main Road, Assam
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 mt-2">
                    <p className="text-xs font-semibold text-slate-500">CONSULTATION HOURS</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">03:30 PM – 07:30 PM</p>
                    <p className="text-xs font-medium text-slate-600 mt-1">Monday to Saturday</p>
                  </div>
                </div>
              </div>

              {/* Emergency eye care note */}
              <div className="mt-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
                <p className="text-xs sm:text-sm font-medium text-amber-900">
                  <strong>Emergency Eye Care Available:</strong> Prioritized immediate attention for ocular trauma and sudden vision loss.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==============================================================================
// SUB-COMPONENT: ABOUT DOCTOR
// ==============================================================================
function AboutDoctorSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="about" className="py-20 lg:py-28 bg-white" aria-label="About Dr. Hari Narayan Deuri">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Doctor Photo Card */}
          <motion.div
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-medical-100 to-medical-200 border-4 border-white shadow-soft-xl relative flex items-center justify-center bg-slate-50">
                <img
                  src="/images/doctor-placeholder.jpg"
                  alt="Dr. Hari Narayan Deuri - Best Eye Doctor in Narayanpur, Gohpur, and Bihpuriagaon, Assam"
                  className="w-full h-full object-cover object-center relative z-10"
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    setImageLoaded(false);
                  }}
                />
                {/* Elegant fallback graphic when placeholder image is not yet loaded */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-medical-900/10 backdrop-blur-[2px]">
                    <div className="w-24 h-24 rounded-full bg-white/90 shadow-md flex items-center justify-center text-medical-600 mb-4">
                      <Stethoscope className="w-12 h-12" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-bold text-slate-800 bg-white/95 px-4 py-2 rounded-xl shadow-sm animate-pulse">
                      Loading Doctor Photo...
                    </p>
                  </div>
                )}
              </div>

              {/* Floating experience badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-5 rounded-2xl shadow-soft-xl border border-slate-100 flex items-center gap-4 max-w-xs">
                <div className="w-12 h-12 rounded-xl bg-medical-500 text-white flex items-center justify-center shrink-0 font-bold text-lg">
                  8+
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Years of Clinical Excellence</p>
                  <p className="text-xs text-slate-500">Trusted eye specialist in Assam</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: 3 Professional Paragraphs covering required topics */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-medical-600 bg-medical-50 px-3 py-1 rounded-md">
                About The Specialist
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Dedicated Ophthalmology Specialist Serving Northern Assam
              </h2>
            </div>

            {/* Paragraph 1: Experience, Patient Care, and Trust */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Dr. Hari Narayan Deuri is a highly regarded ophthalmic specialist with over <strong>8+ years of dedicated clinical experience</strong> diagnosing, managing, and treating a comprehensive spectrum of ocular conditions. Recognized as the <strong>best eye doctor in Narayanpur</strong> and the <strong>best eye doctor in Gohpur</strong>, he combines rigorous evidence-based medicine with an empathetic, patient-first philosophy. His practice is built on a foundation of trust, clear patient education, and precision diagnosis, ensuring that every individual—from young children to elderly grandparents—receives personalized eye care tailored to their visual needs.
            </p>

            {/* Paragraph 2: Affordability and Emergency Eye Care */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Understanding that quality healthcare should be accessible to all, Dr. Deuri is committed to providing <strong>affordable eye treatment in Assam</strong> without ever compromising on clinical standards or diagnostic precision. As an experienced <strong>cataract surgeon in Assam</strong> and primary eye care physician, he emphasizes transparent consultations and cost-effective treatment pathways. Furthermore, his clinics are fully equipped to handle <strong>emergency eye care</strong>, offering swift intervention for acute eye infections, corneal foreign bodies, sudden vision loss, and ocular trauma when every minute matters.
            </p>

            {/* Paragraph 3: Service across Assam and 6+ Towns */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Serving diverse communities across more than six regional towns—including Narayanpur, Gohpur, Bihpuriagaon, and surrounding districts—Dr. Deuri has earned a lasting reputation as a dependable <strong>eye specialist in Assam</strong>. Whether patients travel from remote villages or nearby urban centers, they find a welcoming environment equipped with modern diagnostic tools and a supportive staff dedicated to safeguarding sight and improving quality of life across the region.
            </p>

            {/* Key highlights checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                "8+ Years of Ophthalmic Practice",
                "Trusted in Narayanpur & Gohpur",
                "Affordable & Transparent Pricing",
                "Emergency Ocular Trauma Care",
                "Elderly-Friendly Consultation",
                "Modern Diagnostic Technology"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-medical-600 shrink-0" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==============================================================================
// SUB-COMPONENT: SERVICES (EXACTLY 12 SERVICES, 3x4 GRID ON DESKTOP)
// ==============================================================================
function ServicesSection() {
  const servicesList = [
    {
      title: "Cataract Surgery",
      description: "Advanced assessment and pre-operative guidance for stitchless, rapid-recovery cataract lens replacement.",
      icon: Eye
    },
    {
      title: "Eye Check-up",
      description: "Comprehensive visual acuity and ocular health screening for patients of all ages.",
      icon: Activity
    },
    {
      title: "Retina Care",
      description: "Expert screening and management for retinal disorders, macular health, and peripheral vision.",
      icon: Sparkles
    },
    {
      title: "Glaucoma",
      description: "Early intraocular pressure detection, optic nerve monitoring, and medical glaucoma management.",
      icon: ShieldCheck
    },
    {
      title: "Pediatric Eye Care",
      description: "Gentle, child-friendly eye examinations to detect refractive errors and lazy eye early.",
      icon: Smile
    },
    {
      title: "LASIK Consultation",
      description: "Thorough candidacy evaluations and guidance for laser vision correction procedures.",
      icon: Zap
    },
    {
      title: "Vision Testing",
      description: "Precision computerized eye testing for accurate distance and near visual acuity assessment.",
      icon: Compass
    },
    {
      title: "Eye Infection",
      description: "Prompt diagnosis and targeted medical therapy for bacterial, viral, and allergic infections.",
      icon: AlertCircle
    },
    {
      title: "Dry Eye",
      description: "Specialized tear-film evaluation and soothing treatment plans for chronic dry, gritty eyes.",
      icon: Heart
    },
    {
      title: "Diabetic Retinopathy",
      description: "Detailed retinal evaluations to prevent and monitor diabetes-related sight complications.",
      icon: Stethoscope
    },
    {
      title: "Spectacle Prescription",
      description: "Accurate corrective lens prescribing with high-contrast recommendations for reading and work.",
      icon: Award
    },
    {
      title: "Emergency Eye Care",
      description: "Immediate medical attention for ocular injuries, chemical splashes, and acute eye pain.",
      icon: Clock
    },
  ];

  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-slate-50 border-t border-b border-slate-200/60"
      aria-label="Our Clinical Eye Care Services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-medical-600 bg-medical-100 px-3.5 py-1 rounded-md">
            Comprehensive Ophthalmology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Specialized Eye Care Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            From routine check-ups and precision spectacles to emergency eye care and cataract surgical consultations, Dr. Hari Narayan Deuri delivers complete ocular healthcare.
          </p>
        </motion.div>

        {/* EXACTLY 12 SERVICES - Responsive 3x4 Grid on Desktop, 1-2 columns on mobile/tablet */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-soft-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center mb-5 shadow-sm">
                    <IconComponent className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-medical-600">
                    OPD Consultation Available
                  </span>
                  <a
                    href={PHONE_NUMBER_LINK}
                    className="text-xs font-bold text-slate-700 hover:text-medical-600 inline-flex items-center gap-1 transition-colors"
                    aria-label={`Book appointment for ${service.title}`}
                  >
                    <span>Book Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ==============================================================================
// SUB-COMPONENT: WHY CHOOSE US (EXACTLY 9 FEATURE CARDS)
// ==============================================================================
function WhyChooseUsSection() {
  const reasons = [
    {
      title: "8+ Years Experience",
      description: "Extensive clinical expertise handling complex ocular conditions with steady precision and care.",
      icon: Award
    },
    {
      title: "Affordable Treatment",
      description: "Transparent, ethically structured pricing ensuring top-tier medical eye treatment is accessible to all.",
      icon: Heart
    },
    {
      title: "Emergency Eye Care",
      description: "Immediate triage and urgent care for accidental ocular trauma, infections, and sudden sight loss.",
      icon: Clock
    },
    {
      title: "Trusted Specialist",
      description: "Recognized as the best eye doctor in Narayanpur, Gohpur, and Bihpuriagaon across thousands of families.",
      icon: ShieldCheck
    },
    {
      title: "Modern Equipment",
      description: "Equipped with high-precision ophthalmic diagnostic tools for early detection and accurate testing.",
      icon: Zap
    },
    {
      title: "Friendly Consultation",
      description: "Patient, elderly-friendly communication that explains eye health diagnoses in clear, reassuring terms.",
      icon: Smile
    },
    {
      title: "Accurate Diagnosis",
      description: "Evidence-based clinical examination protocols ensuring correct prescriptions and effective therapies.",
      icon: CheckCircle2
    },
    {
      title: "Multiple Clinic Locations",
      description: "Convenient daily OPD timings across Narayanpur (morning) and Gohpur (evening) for easy patient access.",
      icon: MapPin
    },
    {
      title: "Patient First Approach",
      description: "Compassionate healthcare where patient comfort, safety, and visual restoration remain top priority.",
      icon: Users
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-20 lg:py-28 bg-white"
      aria-label="Why Choose Dr. Hari Narayan Deuri Clinic"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-medical-600 bg-medical-50 px-3.5 py-1 rounded-md">
            The Clinic Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Why Patients Across Assam Trust Our Care
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Combining senior ophthalmic experience with affordability, modern diagnostics, and a compassionate bedside manner.
          </p>
        </motion.div>

        {/* EXACTLY 9 FEATURE CARDS */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reasons.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="p-6 sm:p-7 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-medical-200 shadow-sm hover:shadow-soft-xl transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-medical-600 text-white flex items-center justify-center mb-5 shadow-sm">
                  <IconComponent className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ==============================================================================
// SUB-COMPONENT: CONDITIONS TREATED (COLORFUL PILLS/TAGS)
// ==============================================================================
function ConditionsTreatedSection() {
  const conditions = [
    { name: "Cataract", color: "bg-blue-100 text-blue-900 border-blue-200" },
    { name: "Glaucoma", color: "bg-emerald-100 text-emerald-900 border-emerald-200" },
    { name: "Dry Eyes", color: "bg-sky-100 text-sky-900 border-sky-200" },
    { name: "Allergies", color: "bg-purple-100 text-purple-900 border-purple-200" },
    { name: "Retina Disorders", color: "bg-indigo-100 text-indigo-900 border-indigo-200" },
    { name: "Diabetic Eye Disease", color: "bg-amber-100 text-amber-900 border-amber-200" },
    { name: "Vision Problems", color: "bg-cyan-100 text-cyan-900 border-cyan-200" },
    { name: "Eye Infection", color: "bg-rose-100 text-rose-900 border-rose-200" },
    { name: "Conjunctivitis", color: "bg-teal-100 text-teal-900 border-teal-200" },
    { name: "Corneal Disease", color: "bg-violet-100 text-violet-900 border-violet-200" },
    { name: "Squint", color: "bg-orange-100 text-orange-900 border-orange-200" },
    { name: "Refractive Errors", color: "bg-blue-100 text-blue-900 border-blue-200" },
  ];

  return (
    <section
      id="conditions"
      className="py-20 bg-gradient-to-b from-white via-medical-50/50 to-white border-t border-slate-100"
      aria-label="Eye Conditions We Treat"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-medical-600 bg-medical-100 px-3.5 py-1 rounded-md">
            Clinical Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Eye Conditions Treated
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            We provide expert diagnostic evaluations and treatment protocols for a wide variety of ocular symptoms and diseases.
          </p>
        </motion.div>

        {/* Colorful Pills/Tags Grid */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {conditions.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`px-5 py-3 rounded-2xl text-sm sm:text-base font-bold border shadow-sm cursor-default transition-transform ${item.color}`}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 opacity-80" aria-hidden="true" />
                <span>{item.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ==============================================================================
// SUB-COMPONENT: TESTIMONIALS (3 REALISTIC PATIENT TESTIMONIALS)
// ==============================================================================
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Pradip Saikia",
      location: "Narayanpur, Assam",
      rating: 5,
      text: "Dr. Hari Narayan Deuri is truly the best eye doctor in Narayanpur. My mother had severe cataract issues, and his consultation was so patient and reassuring. He explained the surgical lens options clearly without any pressure. Highly recommended for affordable eye treatment in Assam!"
    },
    {
      name: "Bhaben Hazarika",
      location: "Gohpur, Assam",
      rating: 5,
      text: "I visited the Gohpur evening clinic for an urgent corneal irritation and severe redness. Dr. Deuri attended to me immediately and prescribed drops that relieved the pain within hours. We are blessed to have such a skilled eye specialist in Assam serving our town."
    },
    {
      name: "Runumi Borah",
      location: "Bihpuriagaon, Assam",
      rating: 5,
      text: "We traveled from Bihpuriagaon for my father's glaucoma check-up. The clinic is very well-maintained with modern testing equipment. Dr. Deuri's elderly-friendly attitude and accurate prescription made a huge difference. Undoubtedly the most trusted eye doctor in Bihpuriagaon area."
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-slate-50 border-t border-b border-slate-200/70"
      aria-label="Patient Testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-medical-600 bg-medical-100 px-3.5 py-1 rounded-md">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Trusted by Patients Across 6+ Towns
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Read authentic feedback from patients who have experienced our compassionate ophthalmic care in Narayanpur and Gohpur.
          </p>
        </motion.div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft-xl flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-5" aria-label={`Rated ${t.rating} out of 5 stars`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-slate-700 text-base italic leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Patient Identity */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-medical-100 text-medical-800 font-bold flex items-center justify-center text-base">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                  <p className="text-xs font-semibold text-slate-500">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==============================================================================
// SUB-COMPONENT: FAQ (EXACTLY 4 QUESTIONS, ACCORDION WITH FRAMER MOTION)
// ==============================================================================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // Open first question by default for elderly accessibility

  const faqs = [
    {
      question: "What are the clinic OPD timings in Narayanpur and Gohpur?",
      answer:
        "Dr. Hari Narayan Deuri consults at two dedicated locations daily from Monday to Saturday. The Narayanpur Clinic operates in the morning from 09:00 AM to 01:30 PM. The Gohpur Clinic operates in the evening from 03:30 PM to 07:30 PM. Emergency eye trauma appointments are prioritized."
    },
    {
      question: "Why is Dr. Hari Narayan Deuri considered the best eye doctor in Narayanpur and Gohpur?",
      answer:
        "With 8+ years of specialized ophthalmology experience, Dr. Deuri combines accurate clinical diagnosis, modern diagnostic equipment, and an ethical, patient-first approach. He is well-known across 6+ towns in Assam for elderly-friendly consultations and affordable eye treatment."
    },
    {
      question: "Do you offer emergency eye care for injuries or sudden vision loss?",
      answer:
        "Yes. We provide urgent assessment and medical intervention for ocular trauma, chemical exposure, acute red eye, foreign body sensation, and sudden vision loss. If you experience an eye emergency, please call our clinic phone immediately or visit during OPD hours."
    },
    {
      question: "How do I book an appointment or inquire about cataract surgeon fees in Assam?",
      answer:
        "You can easily book an appointment by calling our helpline number directly or clicking the WhatsApp button on this website. Our team will share available time slots and transparent information regarding consultation fees and cataract surgery assessment."
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white" aria-label="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-medical-600 bg-medical-50 px-3.5 py-1 rounded-md">
            Patient Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Clear, reassuring answers to common questions about clinic schedules and ophthalmic care.
          </p>
        </motion.div>

        {/* EXACTLY 4 ACCORDION QUESTIONS */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-white border border-slate-200 text-slate-700 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-medical-50 border-medical-200 text-medical-600" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                  </div>
                </button>

                {/* Smooth Framer Motion Accordion Collapse/Expand (height/opacity transition) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="p-5 sm:p-6 pt-2 text-slate-600 text-base leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==============================================================================
// SUB-COMPONENT: CONTACT SECTION (INFO + GOOGLE MAPS PLACEHOLDER)
// ==============================================================================
function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80"
      aria-label="Contact Dr. Hari Narayan Deuri Eye Clinic"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-medical-600 bg-medical-100 px-3.5 py-1 rounded-md">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Visit Our Eye Care Clinics in Assam
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Call us directly or walk into our daily OPD centers in Narayanpur and Gohpur.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft-xl space-y-6">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Dr. Hari Narayan Deuri
                </h3>
                <p className="text-sm font-semibold text-medical-600 mt-1">
                  Senior Eye Specialist • 8+ Years Experience
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                {/* Phone Contact */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 bg-medical-50 text-medical-600 rounded-xl shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      OPD Appointment Helpline
                    </p>
                    <a
                      href={PHONE_NUMBER_LINK}
                      className="text-lg font-extrabold text-slate-900 hover:text-medical-600 transition-colors block mt-0.5"
                    >
                      {PHONE_NUMBER_DISPLAY}
                    </a>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block mt-1">
                      REPLACE ME WITH ACTUAL NUMBER
                    </span>
                  </div>
                </div>

                {/* Narayanpur Clinic Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 bg-medical-50 text-medical-600 rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Narayanpur Clinic (Morning)
                    </p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      Main Eye Clinic, Near Narayanpur Chariali, Narayanpur, Assam 784164
                    </p>
                    <p className="text-xs text-medical-700 font-bold mt-1">
                      OPD: 09:00 AM – 01:30 PM (Mon-Sat)
                    </p>
                  </div>
                </div>

                {/* Gohpur Clinic Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 bg-slate-100 text-slate-700 rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Gohpur Clinic (Evening)
                    </p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      Specialist Eye Centre, Gohpur Main Road, Gohpur, Assam 784168
                    </p>
                    <p className="text-xs text-slate-700 font-bold mt-1">
                      OPD: 03:30 PM – 07:30 PM (Mon-Sat)
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <a
                  href={PHONE_NUMBER_LINK}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-medical-600 hover:bg-medical-700 transition-all shadow-md shadow-medical-600/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Clinic</span>
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Google Maps Embed Placeholder */}
          <div className="lg:col-span-7">
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft-xl overflow-hidden">
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 relative border border-slate-200">
                {/* 
                  GOOGLE MAPS IFRAME PLACEHOLDER:
                  REPLACE WITH ACTUAL EMBED URL in the `src` attribute below when ready.
                  For example: `https://www.google.com/maps/embed?pb=!1m18!...`
                */}
                <iframe
                  title="Dr. Hari Narayan Deuri Clinic Map Location - Narayanpur and Gohpur Assam"
                  src="https://www.google.com/maps/embed?pb="
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Visible overlay placeholder banner reminding where to drop real URL */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/75 p-6 text-center text-white backdrop-blur-[1px]">
                  <div className="w-16 h-16 rounded-full bg-medical-500/90 flex items-center justify-center mb-4 shadow-lg">
                    <Navigation className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold">
                    Google Maps Interactive Embed Placeholder
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-md mt-2">
                    REPLACE WITH ACTUAL EMBED URL of Dr. Hari Narayan Deuri&apos;s Narayanpur or Gohpur Clinic in the iframe src attribute.
                  </p>
                  <span className="mt-4 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                    Map Embed Placeholder • Replace Me
                  </span>
                </div>
              </div>

              {/* Map Footer Helper */}
              <div className="px-3 py-3 mt-1 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                <span>Serving Narayanpur, Gohpur, Bihpuriagaon, and Lakhimpur districts.</span>
                <span className="font-semibold text-medical-600">Ample Patient Parking Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==============================================================================
// SUB-COMPONENT: FOOTER
// ==============================================================================
function Footer() {
  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Dr. Deuri", href: "#about" },
    { name: "Eye Care Services", href: "#services" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Conditions Treated", href: "#conditions" },
    { name: "Patient Reviews", href: "#testimonials" },
    { name: "FAQs", href: "#faq" },
    { name: "Contact Clinic", href: "#contact" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Doctor Identity & USP */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-medical-500 flex items-center justify-center text-white">
                <Eye className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-base font-bold text-white">
                  Dr. Hari Narayan Deuri
                </span>
                <span className="block text-xs font-medium text-medical-400 uppercase tracking-wider">
                  Senior Eye Specialist • Assam
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Providing trusted, affordable eye treatment in Assam. Dedicated daily OPD clinics serving Narayanpur, Gohpur, Bihpuriagaon, and 6+ regional towns.
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded">
                Emergency Eye Care Available
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Clinic Timings */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              OPD Timings (Mon – Sat)
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <p className="font-bold text-white">Narayanpur Morning Clinic</p>
                <p className="text-medical-400 font-extrabold mt-0.5">09:00 AM – 01:30 PM</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <p className="font-bold text-white">Gohpur Evening Clinic</p>
                <p className="text-slate-200 font-extrabold mt-0.5">03:30 PM – 07:30 PM</p>
              </div>
              <p className="text-xs text-slate-500">Sunday Closed / Emergencies On Call</p>
            </div>
          </div>

          {/* Column 4: Contact & Social Icons */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-slate-400">
                Helpline Phone:{" "}
                <a href={PHONE_NUMBER_LINK} className="text-white font-bold hover:underline">
                  {PHONE_NUMBER_DISPLAY}
                </a>
              </p>
              <p className="text-xs text-slate-500">
                (Replace placeholder phone number with clinic official number)
              </p>
              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-400 mb-2">Social Profiles:</p>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((social) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        aria-label={`Visit Dr. Hari Narayan Deuri on ${social.name}`}
                        className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-medical-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                      >
                        <SocialIcon className="w-4 h-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Copyright & SEO Keywords string */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dr. Hari Narayan Deuri Eye Clinic. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Best Eye Doctor in Narayanpur • Best Eye Doctor in Gohpur • Best Eye Doctor in Bihpuriagaon • Eye Specialist in Assam
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==============================================================================
// MAIN APP COMPONENT
// ==============================================================================
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 
        REACT-HELMET SEO META TAGS:
        Optimized for local ophthalmology search terms in Assam.
      */}
      <Helmet>
        <html lang="en" />
        <title>Dr. Hari Narayan Deuri - Best Eye Doctor in Narayanpur & Gohpur | Eye Specialist in Assam</title>
        <meta
          name="description"
          content="Dr. Hari Narayan Deuri is a senior eye specialist in Assam with 8+ years of experience offering cataract surgery, emergency eye care, and affordable eye treatment in Narayanpur, Gohpur, and Bihpuriagaon."
        />
        <meta
          name="keywords"
          content="best eye doctor in narayanpur, best eye doctor in gohpur, best eye doctor in bihpuriagaon, eye specialist in assam, cataract surgeon in assam, affordable eye treatment in assam, emergency eye care"
        />
        <meta name="author" content="Dr. Hari Narayan Deuri" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Social Sharing Meta Tags */}
        <meta property="og:title" content="Dr. Hari Narayan Deuri - Best Eye Doctor in Narayanpur & Gohpur, Assam" />
        <meta
          property="og:description"
          content="Trusted eye specialist in Assam offering cataract surgery, dry eye treatment, and affordable emergency eye care across 6+ towns."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drdeurieyeclinic.com" />
        <meta property="og:image" content="https://drdeurieyeclinic.com/images/doctor-placeholder.jpg" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr. Hari Narayan Deuri - Eye Specialist in Assam" />
        <meta
          name="twitter:description"
          content="Affordable, trusted eye care and cataract consultations in Narayanpur and Gohpur."
        />
      </Helmet>

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. About Doctor Section */}
        <AboutDoctorSection />

        {/* 3. Services Section (12 Services) */}
        <ServicesSection />

        {/* 4. Why Choose Us Section (9 Feature Cards) */}
        <WhyChooseUsSection />

        {/* 5. Conditions Treated Section (Colorful Pills/Tags) */}
        <ConditionsTreatedSection />

        {/* 6. Testimonials Section (3 Reviews) */}
        <TestimonialsSection />

        {/* 7. FAQ Section (4 Questions, Framer Motion Accordion) */}
        <FAQSection />

        {/* 8. Contact Section (Map Placeholder & Clinic Addresses) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
