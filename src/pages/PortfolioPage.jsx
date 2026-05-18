import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Project1 from '../assets/images/project1.png';
import Project2 from '../assets/images/project2.jpeg';
import Project3 from '../assets/images/project3.jpg';
import Project4 from '../assets/images/project4.png';
// ─── Scroll Reveal Hook ───────────────────────────────────────────────
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

// ─── Reveal Wrapper ───────────────────────────────────────────────────
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

// ─── Case Studies ─────────────────────────────────────────────────────
const caseStudies = [
  {
    title: 'Real Estate Brand Marketing',
    client: 'Desire Luxury Homes',
    challenge: 'Difficulty reaching high-net-worth individuals.',
    approach: 'Developed and executed a social media marketing strategy.',
    results: [
      'Designed content calendar and storytelling campaigns.',
      'Boosted engagement by 200% and follower growth by 967%.',
      'Managed paid ad campaigns for targeted reach.',
    ],
    category: 'Real Estate',
    image: Project1,
  },
  {
    title: 'Social Media Growth',
    client: 'Food by Minar',
    challenge: 'Weak brand positioning and unclear audience targeting.',
    approach: 'Built storytelling driven content plan for engagement.',
    results: [
      'Designed engaging visuals and videos for Instagram and TikTok.',
      'Increased engagement rate and follower base significantly.',
      'Created 30 day content strategy for consistency.',
    ],
    category: 'Food Brand',
    image: Project2,
  },
  {
    title: 'LinkedIn Growth & Engagement',
    client: 'Case Study',
    overview: 'A structured LinkedIn growth execution focused on visibility, engagement quality, and audience reach through strategic content systems.',
    approach: 'Storytelling driven framework with pain point content and active engagement strategy.',
    results: [
      'Reached 1,000 plus followers in a short growth cycle',
      'Generated 1,000 plus likes and comments on posts',
      'Improved engagement consistency and visibility',
    ],
    category: 'LinkedIn',
    image: Project4,
  },
  {
    title: 'SEO & Content Optimization',
    client: 'Business Services',
    challenge: 'Low organic visibility and weak SEO structure.',
    approach: 'Improved SEO performance and content targeting strategy.',
    results: [
      'Completed full SEO audit',
      'Implemented keyword targeting strategy',
      'Created structured content calendar',
      'Published 1500 plus word optimized blog',
      'Improved on page SEO performance',
    ],
    category: 'SEO',
    image: Project3,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────
export function PortfolioPage() {
  return (
    <div className="min-h-screen pt-32">

      {/* Hero */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">

          <Reveal>
            <h1 className="text-5xl md:text-6xl mb-8">
              Strategic <span className="text-primary">Case Studies</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-xl text-muted-foreground">
              Real results from structured execution and strategy.
            </p>
          </Reveal>

        </div>
      </section>

      {/* Case Studies */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-32">

          {caseStudies.map((study, index) => (
            <div key={index} className="space-y-12">

              {/* Header */}
              <div className="grid lg:grid-cols-2 gap-12">

                <Reveal direction="right">
                  <div className="space-y-6">
                    <div className="inline-block bg-primary/10 border border-primary px-4 py-2 text-primary text-sm">
                      {study.category}
                    </div>
                    <h2 className="text-4xl">{study.title}</h2>
                    <p className="text-muted-foreground">{study.client}</p>
                  </div>
                </Reveal>

                <Reveal direction="left" delay={150}>
                  <div className="aspect-video bg-secondary border border-primary/20 overflow-hidden">
                    <ImageWithFallback
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Reveal>

              </div>

              {/* Content */}
              <div className="grid lg:grid-cols-3 gap-12">

                {/* Overview or Challenge */}
                <Reveal>
                  <div className="space-y-4">
                    <h3 className="text-xl">
                      {study.overview ? 'Overview' : 'Challenge'}
                    </h3>
                    <p className="text-muted-foreground">
                      {study.overview || study.challenge}
                    </p>
                  </div>
                </Reveal>

                {/* Approach */}
                <Reveal delay={150}>
                  <div className="space-y-4">
                    <h3 className="text-xl">Approach</h3>
                    <p className="text-muted-foreground">
                      {study.approach}
                    </p>
                  </div>
                </Reveal>

                {/* Results */}
                <Reveal delay={250}>
                  <div className="bg-secondary border border-primary/20 p-8 space-y-6">

                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <h3 className="text-xl">Results</h3>
                    </div>

                    <ul className="space-y-4">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </Reveal>

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">

          <Reveal>
            <h2 className="text-4xl md:text-5xl mb-6">
              Build Your Next Growth Story
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-muted-foreground mb-10">
              Structured strategy. Measurable execution.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <Link
              to="/contact"
              className="bg-primary text-black px-10 py-4 inline-flex items-center gap-2"
            >
              Start Project
              <ArrowRight size={20} />
            </Link>
          </Reveal>

        </div>
      </section>

    </div>
  );
}