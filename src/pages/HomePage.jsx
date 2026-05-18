import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Users } from 'lucide-react';

import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Omotesho from '/src/assets/images/omotesho.png';
import Bisola from '/src/assets/images/Bisola.jpeg';
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-10 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div className="space-y-6 pt-20">
              <Reveal direction="up" delay={0}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                  Social Media Growth & Customer
                  <span className="text-primary"> Acquisition</span> Specialist
                </h1>
              </Reveal>

              <Reveal direction="up" delay={150}>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  I help brands grow visibility, attract customers, and convert attention into revenue.
                </p>
              </Reveal>

              <Reveal direction="up" delay={250}>
                <div className="flex flex-col sm:flex-row gap-4">

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

                  <a
                    href="https://wa.me/+2348024660463"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-primary text-primary px-8 py-4 text-center
              hover:bg-primary/10 transition-all duration-300 ease-out
              inline-flex items-center justify-center gap-2"
                  >
                    Chat on WhatsApp
                  </a>

                </div>
              </Reveal>
            </div>

            {/* Image */}
            <Reveal direction="left" delay={200}>
              <div className="relative flex justify-center lg:justify-end">

                <div className="relative w-full max-w-md">

                  <ImageWithFallback
                    src={Omotesho}
                    alt="Digital Marketing Strategy"
                    className="w-full h-auto object-cover"
                  />

                  <div className="absolute bottom-4 left-4 bg-primary text-black p-5">
                    <p className="text-2xl font-serif mb-1">98%</p>
                    <p className="text-sm">Client satisfaction rate</p>
                  </div>

                </div>

              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">

          <Reveal direction="up" delay={0}>
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl md:text-5xl mb-6">
                Strategic Solutions, <span className="text-primary">Measurable Results</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We don't chase trends. We build strategic frameworks that drive real business outcomes.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Social Media Strategy',
                description: 'Platform-specific strategies that convert followers into customers.',
                icon: Users,
              },
              {
                title: 'Paid Advertising',
                description: 'ROI-focused Meta and TikTok campaigns that scale profitably.',
                icon: Target,
              },
              {
                title: 'Content Strategy',
                description: 'Compelling brand narratives that build authority and trust.',
                icon: TrendingUp,
              },
            ].map((service, index) => (
              <Reveal key={index} direction="up" delay={index * 150}>
                <div
                  className="bg-black border border-primary/20 p-8
                  hover:border-primary/40 hover:-translate-y-1
                  transition-all duration-300 ease-out group h-full"
                >
                  <service.icon className="w-12 h-12 text-primary mb-6 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-2xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="text-primary inline-flex items-center gap-2
                    group-hover:gap-4 transition-all duration-300 ease-out"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Section ── */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <Reveal direction="up" delay={0}>
                <h2 className="text-4xl md:text-5xl mb-8">
                  Why <span className="text-primary">Omotesho</span> Bisola?
                </h2>
              </Reveal>

              <div className="space-y-8">
                {[
                  {
                    title: 'Strategy-First Approach',
                    description: 'Every campaign begins with thorough research, clear objectives, and measurable KPIs.',
                  },
                  {
                    title: 'Business-Focused',
                    description: 'We optimize for revenue, not vanity metrics.',
                  },
                  {
                    title: 'Systems & Sustainability',
                    description: 'We build scalable marketing systems.',
                  },
                ].map((item, index) => (
                  <Reveal key={index} direction="right" delay={index * 150}>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-primary/20 hover:scale-110">
                        <span className="text-primary font-serif text-xl">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal direction="left" delay={200}>
              <div className="aspect-[4/3] bg-secondary border border-primary/20 overflow-hidden">
                <ImageWithFallback
                  src={Bisola}
                  alt="Professional Team"
                  className="w-full h-full object-cover
                  transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">

          <Reveal direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6">
                My <span className="text-primary">Approach</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery' },
              { step: '02', title: 'Strategy' },
              { step: '03', title: 'Execution' },
              { step: '04', title: 'Optimization' },
            ].map((item, index) => (
              <Reveal key={index} direction="up" delay={index * 150}>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-black border border-primary
                  flex items-center justify-center
                  transition-all duration-300 hover:scale-110 hover:bg-primary/10">
                    <span className="text-3xl font-serif text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-xl mb-3">{item.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal direction="up" delay={0}>
            <h2 className="text-4xl md:text-5xl mb-6">
              Ready to <span className="text-primary">Scale Your Business</span>?
            </h2>
          </Reveal>

          <Reveal direction="up" delay={150}>
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