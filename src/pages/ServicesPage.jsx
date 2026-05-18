import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, PenTool, Megaphone } from 'lucide-react';

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
const services = [
  {
    icon: Users,
    title: 'Social Media Strategy & Management',
    description: 'Build a powerful social media presence that converts followers into customers.',
    details: [
      'Platform-specific content strategies',
      'Community management and engagement',
      'Performance analytics and reporting',
      'Brand voice development',
    ],
    outcome: 'Increased brand awareness, engagement, and customer acquisition through organic social media.',
    forWho: 'Businesses looking to establish authority and build loyal communities online.',
  },
  {
    icon: Target,
    title: 'Paid Advertising (Meta & TikTok)',
    description: 'ROI-focused ad campaigns that scale profitably and drive measurable results.',
    details: [
      'Strategic campaign planning and setup',
      'Audience research and targeting',
      'Creative development and testing',
      'Performance optimization and scaling',
    ],
    outcome: 'Lower customer acquisition costs and higher return on ad spend.',
    forWho: 'Growth-driven businesses ready to invest in scalable customer acquisition.',
  },
  {
    icon: PenTool,
    title: 'Content Strategy & Brand Storytelling',
    description: 'Compelling narratives that position your brand as a trusted authority.',
    details: [
      'Brand messaging and positioning',
      'Content calendar development',
      'Long-form and short-form content creation',
      'SEO-optimized content strategies',
    ],
    outcome: 'Enhanced brand authority, customer trust, and organic reach.',
    forWho: 'Brands that want to lead their industry through thought leadership.',
  },
  {
    icon: Megaphone,
    title: 'Influencer & Campaign Management',
    description: 'Strategic partnerships that amplify your reach and drive authentic engagement.',
    details: [
      'Influencer identification and vetting',
      'Campaign strategy and execution',
      'Contract negotiation and management',
      'Performance tracking and reporting',
    ],
    outcome: 'Expanded reach and credibility through authentic influencer partnerships.',
    forWho: 'Businesses seeking to tap into established audiences with targeted messaging.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ServicesPage() {
  return (
    <div className="min-h-screen pt-32">

      {/* ── Hero ── */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">

            <Reveal direction="up" delay={0}>
              <h1 className="text-5xl md:text-6xl mb-8">
                Strategic <span className="text-primary">Services</span> for Sustainable Growth
              </h1>
            </Reveal>

            <Reveal direction="up" delay={150}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I deliver comprehensive digital marketing solutions designed to drive real business outcomes.
              </p>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-20">

          {services.map((service, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >

              {/* Left — content */}
              <Reveal
                direction="right"
                delay={0}
                className={index % 2 === 1 ? 'lg:order-2' : ''}
              >
                <div className="space-y-8">

                  <div>
                    <service.icon className="w-16 h-16 text-primary mb-6 transition-transform duration-300 hover:scale-110" />
                    <h2 className="text-4xl mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl">What's Included:</h3>
                    <ul className="space-y-3">
                      {service.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3"
                          style={{
                            opacity: 1,
                            transition: `opacity 0.4s ease ${idx * 80}ms`,
                          }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </Reveal>

              {/* Right — card */}
              <Reveal
                direction="left"
                delay={150}
                className={index % 2 === 1 ? 'lg:order-1' : ''}
              >
                <div className="bg-secondary border border-primary/20 p-8 space-y-8
                hover:border-primary/40 hover:-translate-y-1
                transition-all duration-300 ease-out
                hover:shadow-[0_8px_30px_rgba(var(--primary-rgb),0.08)]">

                  <div>
                    <h3 className="text-xl mb-3">Who This Is For</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.forWho}</p>
                  </div>

                  <div className="border-t border-primary/20 pt-8">
                    <h3 className="text-xl mb-3">The Outcome</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.outcome}
                    </p>
                    <Link
                      to="/contact"
                      className="text-primary inline-flex items-center gap-2
                      hover:gap-4 transition-all duration-300 ease-out"
                    >
                      Get Started
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                </div>
              </Reveal>

            </div>
          ))}

        </div>
      </section>

      {/* ── Process ── */}
      <section className="px-6 lg:px-8 py-20 bg-secondary">
        <div className="max-w-7xl mx-auto">

          <Reveal direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6">
                What I <span className="text-primary">Deliver</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation' },
              { step: '02', title: 'Strategy Development' },
              { step: '03', title: 'Implementation' },
              { step: '04', title: 'Optimization' },
            ].map((item, index) => (
              <Reveal key={index} direction="up" delay={index * 150}>
                <div className="bg-black border border-primary/20 p-8
                hover:border-primary/40 hover:-translate-y-1
                transition-all duration-300 ease-out group">
                  <div className="text-4xl font-serif text-primary mb-4
                  transition-transform duration-300 group-hover:scale-110 inline-block">
                    {item.step}
                  </div>
                  <h3 className="text-xl mb-3">{item.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">

          <Reveal direction="up" delay={0}>
            <h2 className="text-4xl md:text-5xl mb-6">
              Ready to <span className="text-primary">Transform</span> Your Marketing?
            </h2>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Let's discuss which services will drive the most impact for your business.
            </p>
          </Reveal>

          <Reveal direction="up" delay={250}>
            <a
              href="https://calendly.com/omoteshobisola08/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-black px-8 py-4 text-center
              hover:bg-primary/90 transition-all duration-300 ease-out
              inline-flex items-center justify-center gap-2"
            >
              Book a Strategy Call
              <ArrowRight size={20} />
            </a>
          </Reveal>

        </div>
      </section>

    </div>
  );
}