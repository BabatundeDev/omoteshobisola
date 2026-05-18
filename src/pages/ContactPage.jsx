import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.15, ...options }
      );

      const el = ref.current;
      if (el) observer.observe(el);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return [ref, isVisible];
}

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, isVisible] = useScrollReveal();

  const directionMap = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(50px)',
    right: 'translateX(-50px)',
    fade: 'translateY(0px)',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0,0)' : directionMap[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const expectItems = [
  'Initial response within 24 hours',
  'Discovery call to understand your needs',
  'Customized proposal and strategy',
  'Transparent pricing and timelines',
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    alert('Thank you for your interest! We will get back to you within 24 hours.');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = (name) =>
    `w-full bg-input-background border px-4 py-3 text-foreground focus:outline-none resize-none transition-all duration-300 ${focusedField === name
      ? 'border-primary shadow-[0_0_0_2px_rgba(var(--primary-rgb),0.15)]'
      : 'border-primary/20 hover:border-primary/40'
    }`;

  return (
    <div className="min-h-screen pt-32">

      {/* ── Hero ── */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">

            <Reveal direction="up" delay={0}>
              <h1 className="text-5xl md:text-6xl mb-8">
                Let's <span className="text-primary">Work Together</span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={150}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Ready to transform your digital marketing strategy? Share your goals with us,
                and we'll show you how we can help you achieve them.
              </p>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Form & Info ── */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <Reveal direction="right" delay={0}>
              <div className="bg-secondary border border-primary/20 p-8 md:p-12
              transition-shadow duration-300
              hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.08)]">

                <h2 className="text-3xl mb-8">Send a Message</h2>

                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  className="space-y-6"
                >

                  {/* Web3Forms Access Key */}
                  <input
                    type="hidden"
                    name="access_key"
                    value="45bfee07-5cd9-43d0-9f44-940a9cc0cd16"
                  />

                  {/* Subject */}
                  <input
                    type="hidden"
                    name="subject"
                    value="New Portfolio Contact Submission"
                  />

                  {/* Disable Captcha */}
                  <input
                    type="hidden"
                    name="botcheck"
                    className="hidden"
                  />

                  {/* Name */}
                  <div>
                    <label className="block text-sm mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      className={inputClass('name')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      className={inputClass('email')}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm mb-2">
                      Company Name
                    </label>

                    <input
                      type="text"
                      name="company"
                      className={inputClass('company')}
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm mb-2">
                      Service Interest
                    </label>

                    <select
                      name="service"
                      required
                      className={inputClass('service')}
                    >
                      <option value="">Select a service</option>
                      <option value="social-media">Social Media Strategy</option>
                      <option value="paid-ads">Paid Advertising</option>
                      <option value="content">Content Strategy</option>
                      <option value="influencer">Influencer Marketing</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm mb-2">
                      Message
                    </label>

                    <textarea
                      name="message"
                      rows={6}
                      required
                      className={inputClass('message')}
                      placeholder="Tell us about your business goals..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-black px-6 py-4
    inline-flex items-center justify-center gap-2
    cursor-pointer
    transition-all duration-300
    hover:bg-primary/90 hover:gap-3 active:scale-[0.98]"
                  >
                    Send Message
                  </button>

                </form>
              </div>
            </Reveal>

            {/* Contact Info */}
            <div className="space-y-12">

              <Reveal direction="left" delay={100}>
                <div>
                  <h2 className="text-3xl mb-8">Get in Touch</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We respond to all inquiries within 24 hours. For urgent matters, please include
                    your phone number in the message.
                  </p>
                </div>
              </Reveal>

              <div className="space-y-8">

                {/* Email */}
                <Reveal direction="left" delay={200}>
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center
                      transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                        <Mail className="w-6 h-6 text-primary transition-transform duration-300 group-hover:rotate-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl mb-2">Email</h3>
                      <a
                        href="mailto:omoteshobisola08@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300
                        relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                        after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                      >
                        omoteshobisola08@gmail.com
                      </a>
                    </div>
                  </div>
                </Reveal>

                {/* Location */}
                <Reveal direction="left" delay={300}>
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center
                      transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                        <MapPin className="w-6 h-6 text-primary transition-transform duration-300 group-hover:-translate-y-1" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl mb-2">Location</h3>
                      <p className="text-muted-foreground">Osun, Nigeria</p>
                    </div>
                  </div>
                </Reveal>

              </div>

              {/* What to Expect */}
              <Reveal direction="left" delay={400}>
                <div className="bg-secondary border border-primary/20 p-8 space-y-4
                transition-shadow duration-300
                hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.07)]">
                  <h3 className="text-xl">What to Expect</h3>
                  <ul className="space-y-3">
                    {expectItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Note ── */}
      <section className="px-6 lg:px-8 py-20 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">

          <Reveal direction="up" delay={0}>
            <h2 className="text-3xl mb-6">
              Serious About <span className="text-primary">Growth</span>?
            </h2>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We work with businesses that are committed to long-term success and willing to invest
              in strategic digital marketing. If that's you, we'd love to hear from you.
            </p>
          </Reveal>

        </div>
      </section>

    </div>
  );
}