import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './ProcessTimeline.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const STEPS = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We begin with a comprehensive discussion to understand your immigration goals and assess your eligibility.'
  },
  {
    number: '02',
    title: 'Case Evaluation',
    description: 'Our experts analyze your documents, background, and options to create a tailored immigration strategy.'
  },
  {
    number: '03',
    title: 'Strategy & Documentation',
    description: 'We prepare all required paperwork with precision, ensuring compliance with Saudi and UAE regulations.'
  },
  {
    number: '04',
    title: 'Submission & Follow-Up',
    description: 'Your application is submitted and tracked. We handle all communication with immigration authorities.'
  },
  {
    number: '05',
    title: 'Final Approval & Support',
    description: 'Celebrate your approval! We provide ongoing support for your transition to your new destination.'
  }
];

const ProcessTimeline = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const plane = planeRef.current;
    const steps = stepsRef.current;

    if (!section || !path || !plane) return;

    const pathLength = path.getTotalLength();

    // Initially hide the entire path (plane will reveal it as it flies)
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    // Create a timeline for synchronized animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 30%',
        scrub: 2
      }
    });

    // Animate plane along the path AND draw the line behind it simultaneously
    tl.to(plane, {
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: true
      },
      ease: 'none',
      duration: 1
    }, 0);

    // The line follows behind the plane (slightly delayed drawing)
    tl.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      duration: 1
    }, 0);

    // Animate each step
    steps.forEach((step, index) => {
      if (!step) return;

      gsap.set(step, {
        opacity: 0.15,
        y: 40,
        filter: 'blur(5px)'
      });

      const stepProgress = index / (steps.length - 1);
      const startPercent = stepProgress * 75;
      const endPercent = startPercent + 20;

      gsap.to(step, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: `top+=${startPercent}% 70%`,
          end: `top+=${endPercent}% 50%`,
          scrub: 1.5
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="process-section" ref={sectionRef}>
      <div className="process-container">
        <div className="process-header">
          <span className="process-label">Our Process</span>
          <h2 className="process-title">How We Work</h2>
          <p className="process-subtitle">A seamless journey from consultation to approval</p>
        </div>

        <div className="timeline-wrapper">
          {/* SVG Flight Path - smooth curves behind each text block */}
          <svg
            className="flight-path-svg"
            viewBox="0 0 1200 2000"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff6b00" />
                <stop offset="50%" stopColor="#ff9500" />
                <stop offset="100%" stopColor="#ffb347" />
              </linearGradient>
            </defs>

            {/* Smooth flight path through all 5 steps */}
            <path
              ref={pathRef}
              className="flight-path"
              d="M 600 0
                 
                 C 600 50, 600 80, 600 100
                 
                 C 600 140, 500 160, 350 180
                 C 150 210, 50 250, 50 320
                 C 50 390, 150 420, 350 440
                 C 500 455, 600 470, 600 500
                 
                 C 600 530, 700 550, 850 570
                 C 1050 600, 1150 640, 1150 710
                 C 1150 780, 1050 820, 850 840
                 C 700 855, 600 870, 600 900
                 
                 C 600 930, 500 950, 350 970
                 C 150 1000, 50 1040, 50 1110
                 C 50 1180, 150 1220, 350 1240
                 C 500 1255, 600 1270, 600 1370
                 
                 C 600 1330, 700 1350, 850 1370
                 C 1050 1400, 1150 1440, 1150 1510
                 C 1150 1580, 1050 1620, 850 1640
                 C 700 1655, 600 1670, 600 1770
                 
                 C 620 1750, 500 1750, 350 1770
                 C 150 1800, 50 1840, 50 1910
                 C 50 1950, 150 1980, 350 1990
                 C 500 1995, 600 2000, 600 2000"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Airplane - leads the line like airport displays */}
          <div className="plane-wrapper" ref={planeRef}>
            <svg
              className="plane-icon"
              viewBox="0 0 10 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 8.4853 14.8492 C 9.6568 14.8492 10.6066 15.799 10.6066 16.9706 L 10.6066 16.9706 C 10.6066 18.1421 9.6568 19.0919 8.4853 19.0919 L 4.9497 19.0919 L 1.0092 25.6676 C 0.8296 25.9672 0.5067 26.1514 0.1574 26.1535 L -0.1869 26.1555 C -0.8204 26.1594 -1.2978 25.5806 -1.1735 24.9595 L 0 19.0919 L -5.6569 19.0919 L -7.1317 20.5668 C -7.3193 20.7543 -7.5737 20.8597 -7.8388 20.8597 L -8.2367 20.8596 C -8.8961 20.8597 -9.3749 20.2326 -9.2015 19.5966 L -8.4853 16.9706 L -9.2015 14.3446 C -9.3749 13.7084 -8.8961 13.0815 -8.2367 13.0815 L -7.8388 13.0815 C -7.5737 13.0815 -7.3193 13.1868 -7.1317 13.3744 L -5.6569 14.8492 L 0 14.8492 L -1.1735 8.9817 C -1.2977 8.3605 -0.8204 7.7818 -0.1868 7.7856 L 0.1576 7.7877 C 0.5068 7.7898 0.8297 7.9741 1.0092 8.2737 L 4.9497 14.8492 L 8.4853 14.8492 Z" fill="#ff6b00"
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Center reference line (very subtle dotted) */}
          <div className="center-line"></div>

          {/* Steps */}
          <div className="steps-container">
            {STEPS.map((step, index) => (
              <div
                key={index}
                className="step-item"
                ref={el => stepsRef.current[index] = el}
              >
                <div className="step-dot">
                  <span className="step-number">{step.number}</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;