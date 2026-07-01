"use client";

import { useState, useEffect, useRef  } from "react";

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

    // STEP 2: Work tab state
  const [activePanel, setActivePanel] = useState("proj");
  const [activeSection, setActiveSection] = useState("");

  const [selectedProject, setSelectedProject] = useState(null);

  // Certification carousel — fixed-height viewport, freely scrollable
  // (no per-card snapping). The viewport intentionally shows a
  // partial card at the bottom so users can see there's more to
  // scroll. certScrollFracState tracks continuous scroll position
  // (0–1) for a smooth, scrollbar-like slider; certsPage tracks just
  // the nearest card, used only for the screen-reader announcement.
  const [certsViewportHeight, setCertsViewportHeight] = useState(null);
  const [certsPage, setCertsPage] = useState(0);
  const [certScrollFracState, setCertScrollFracState] = useState(0);

  // STEP 3: Refs
  const expScrollRef = useRef(null);
  const projScrollRef = useRef(null);
  const expBtnRef = useRef(null);
  const projBtnRef = useRef(null);
  const workTabBgRef = useRef(null);
  const eduColRef = useRef(null);
  const pubColRef = useRef(null);
  const certListRef = useRef(null);
  const certCardSampleRef = useRef(null);
  const certCardRefs = useRef([]);
  const certTrackRef = useRef(null);

  // STEP 4: Principles array
  const principles = [
    "Fix the root, not the symptom",
    "Frugal beats expensive when cleverness is available",
    "Data earns its keep when it changes a decision",
    "Engineering begins where reality is",
    "Build for the person after you",
    "Curiosity is a professional skill",
  ];

  // Certification carousel "scrollbar" — a fixed-size column of dots
  // that simply reflects continuous scroll progress (like a minimal
  // scrollbar), independent of how many certification cards exist.
  const CERT_DOT_COUNT = 8;
  const certScrollDots = Array.from({ length: CERT_DOT_COUNT });

  // Certifications — data-driven so the carousel can paginate cleanly.
  // Add new certs here; the carousel re-paginates automatically.
  const certifications = [
    {
      year: "Jul'2025",
      title: "DIGITAL NINJA",
      org: "ASHOK LEYLAND",
      href: "https://drive.google.com/file/d/1-1sN3tvg1NwSo_JPliR94UjiWdOS7ZL8/view?usp=sharing",
    },
    {
      year: "Oct'2022",
      title: "Data Visualisation using Python",
      org: "INFOSYS",
      href: "https://drive.google.com/file/d/1ZXL0igBHTdwzTE_IGF5MQRy27rB_XkXF/view?usp=sharing",
    },
    {
      year: "Oct'2022",
      title: "Explore Machine Learning using Python",
      org: "INFOSYS",
      href: "https://drive.google.com/file/d/1tlTKA9NhVciiISHJ01Ur88l_9ctEu2ml/view?usp=sharing",
    },
    {
      year: "Oct'2022",
      title: "Introduction to Artificial Intelligence",
      org: "INFOSYS",
      href: "https://drive.google.com/file/d/11vV-MDc4v0fPqkgZODq_UREAE-rLUS3A/view?usp=sharing",
    },
    {
      year: "Oct'2022",
      title: "Introduction to Data Science",
      org: "INFOSYS",
      href: "https://drive.google.com/file/d/1UIXl8TDTYHIEEzT8EO35NMJ-1k9fqFX2/view?usp=sharing",
    },
    {
      year: "Oct'2022",
      title: "Python for Data Science",
      org: "INFOSYS",
      href: "https://drive.google.com/file/d/1LL7Hwyyh0cA6xJsQsbBVldICg1IGzthv/view?usp=sharing",
    },
    {
      year: "Feb'2022",
      title: "Learn Ethical Hacking from Scratch",
      org: "ZSECURITY",
      href: "https://drive.google.com/file/d/1isJQSRqxnHO9Nev0W1W21cBOCk95Tizz/view?usp=drive_link",
    },
    {
      year: "Feb'2022",
      title: "Fundamentals of Graphic Design",
      org: "CALARTS",
      href: "https://drive.google.com/file/d/18d6bFydk7gpwdk2Y1THbdI_fakOcapJO/view?usp=sharing",
    },
    {
      year: "Apr'2021 – Jan'2022",
      title: "Master Diploma in Product Design",
      org: "CADD CENTRE",
      href: "https://drive.google.com/file/d/1FAq1RXGeie5Sl1TUkCJ7nx3QbedIlZ3R/view?usp=sharing",
    },
    {
      year: "Jul'2021",
      title: "Electrical engineering with a modern electrical CAD System",
      org: "WS CAD",
      href: "https://drive.google.com/file/d/1eXFWnOhd4aibo0EJ2hgl3lXluKvfp14e/view?usp=sharing",
    },
    {
      year: "Jul'2021",
      title: "Introduction to Programming with MATLAB",
      org: "VANDERBILT UNIVERSITY",
      href: "https://drive.google.com/file/d/1ZoGMpo6kjti8RCrblhRRm65aJKgAYdMk/view?usp=sharing",
    },
  ];

    const projects = {
        vision: {
            title: "Frugal Vision System for Process Confirmation",

            subtitle: "96% Defect Reduction • 2,200 → 90 PPM",

            image: "/images/vision.jpeg",

            challenge: [
            "Manual process confirmation resulted in 2,200 PPM defects.",
            "Commercial vision systems exceeded the allocated project budget.",
            "Required a scalable, low-cost solution suitable for multiple assembly stations."
            ],

            solution: [
            "Designed and developed a Python/OpenCV vision system for real-time assembly verification.",
            "Integrated Raspberry Pi, industrial cameras, and PLC communication for automated inspection.",
            "Implemented image processing, feature matching, and process confirmation before downstream assembly."
            ],

            impact: [
            "Reduced defects from 2,200 PPM to 90 PPM (96% reduction).",
            "Horizontally deployed across 103 similar assembly applications.",
            "Delivered commercial-grade capability at a fraction of conventional system cost."
            ],

            technologies: [
            "Python",
            "OpenCV",
            "Raspberry Pi",
            "Industrial Cameras",
            "Computer Vision",
            "PLC / Modbus Communication"
            ]
        },

        WIS: {
            title: "Digital WIS Guidance System for First-Time-Right Assembly",

            subtitle: "Paperless Digital Work Instructions • Error-Free Assembly",

            image: "/images/wis.jpeg",

            challenge: [
                "Paper-based work instructions were difficult to interpret during vehicle assembly.",
                "Operators spent additional time identifying configuration-specific build instructions.",
                "Manual reference to engineering documents increased assembly errors and process delays."
            ],

            solution: [
                "Developed a Kotlin-based Android application to digitize Work Instruction Sheets (WIS).",
                "Linked Configuration Build Numbers (CBNs) with engineering data for automatic instruction retrieval.",
                "Created an interactive line-side guidance system that standardized operator decisions and assembly."
            ],

            impact: [
                "Reduced dependency on paper-based work instructions across the assembly line.",
                "Improved first-time-right assembly through configuration-aware digital guidance.",
                "Enhanced operator productivity, process standardization, and overall build quality."
            ],

            technologies: [
                "Kotlin",
                "Android Studio",
                "Android SDK",
                "JSON",
                "SQLite",
                "Digital Work Instructions"
            ]
        },

        traceability: {
            title: "Digital Process Traceability & Evidence Management Platform",

            subtitle: "End-to-End Digital Traceability • Quality Governance",

            image: "/images/traceability.jpeg",

            challenge: [
                "Manufacturing records and process evidence were maintained across disconnected systems.",
                "Failure investigations required manual collection of images and production records.",
                "Limited traceability reduced audit readiness and delayed root-cause analysis."
            ],

            solution: [
                "Developed a Java-based platform to digitize manufacturing traceability and process evidence.",
                "Integrated process records with image capture to create a unified production history.",
                "Built a searchable digital repository for faster investigations and quality governance."
            ],

            impact: [
                "Established end-to-end traceability across manufacturing and inspection processes.",
                "Reduced investigation time through centralized visual process evidence and records.",
                "Improved compliance, audit readiness, and data-driven quality management."
            ],

            technologies: [
                "Java",
                "Android Studio",
                "SQLite",
                "Digital Traceability",
                "Image Management",
                "Quality Systems"
            ]
        },

        digitalTwin: {
            title: "AMR/AGV Route Optimisation through Digital Twin Simulation",

            subtitle: "Digital Twin Simulation • Smart Factory Logistics",

            image: "/images/digitaltwin.jpeg",

            challenge: [
                "Material movement strategies were difficult to evaluate using conventional planning methods.",
                "Physical layout changes for AMR/AGV deployment involved significant cost and operational risk.",
                "Facility planners lacked a virtual environment to validate logistics and material flow."
            ],

            solution: [
                "Developed a digital twin using 3D facility data to simulate manufacturing operations.",
                "Modelled AMR/AGV routing strategies to evaluate material flow and traffic behaviour.",
                "Performed virtual experiments to optimise logistics, layouts, and production planning decisions."
            ],

            impact: [
                "Enabled risk-free validation of autonomous material handling strategies before deployment.",
                "Improved facility planning through data-driven route optimisation and simulation insights.",
                "Supported smart factory transformation with scalable digital decision-making tools."
            ],

            technologies: [
                "Digital Twin",
                "Process Simulation",
                "AMR / AGV",
                "3D Facility Modelling",
                "Material Flow Analysis",
                "Smart Manufacturing"
            ]
        },

        robotics: {
            title: "Planetary Gear Mobility Mechanism for a Social Robot",

            subtitle: "Topology Optimisation • Lightweight Mechanical Design",

            image: "/images/robotics.jpeg",

            challenge: [
                "Conventional robotic drive mechanisms increased weight and limited mobility performance.",
                "Mechanical components required structural strength without compromising manufacturability.",
                "The design had to support rapid prototyping using additive manufacturing techniques."
            ],

            solution: [
                "Designed a planetary gear-driven mobility mechanism using CAD modelling and engineering analysis.",
                "Applied topology optimisation to minimise component weight while maintaining structural integrity.",
                "Optimised the design for additive manufacturing to enable rapid prototyping and functional validation."
            ],

            impact: [
                "Achieved a lightweight, structurally efficient mobility mechanism for robotic applications.",
                "Improved manufacturability through topology-optimised components suitable for 3D printing.",
                "Demonstrated the integration of mechanical design, optimisation, and advanced manufacturing."
            ],

            technologies: [
                "SolidWorks",
                "Topology Optimisation",
                "Planetary Gear Design",
                "Additive Manufacturing",
                "3D Printing",
                "Mechanical Design"
            ]
        },

        traffic: {
            title: "Smart Traffic Monitoring & Control System for In-Plant Logistics",

            subtitle: "15% TAT Reduction • RFID-Based Logistics Visibility",

            image: "/images/traffic.jpeg",

            challenge: [
                "Vehicle movement across the plant relied on manual tracking with limited real-time visibility.",
                "Traffic congestion and zone occupancy delayed material movement and increased turnaround time.",
                "Decision-makers lacked centralized logistics data to optimize in-plant vehicle operations."
            ],

            solution: [
                "Designed an RFID-enabled platform to digitally monitor vehicle movement across manufacturing zones.",
                "Integrated SAP S/4 HANA with analytics dashboards to provide real-time logistics visibility.",
                "Developed centralized traffic monitoring for congestion analysis and data-driven operational decisions."
            ],

            impact: [
                "Reduced in-plant vehicle turnaround time by 15% through real-time traffic visibility.",
                "Improved material flow efficiency using centralized monitoring and congestion analytics.",
                "Enhanced logistics planning, operational safety, and data-driven decision-making."
            ],

            technologies: [
                "RFID",
                "SAP S/4 HANA",
                "Power BI",
                "SQL",
                "Logistics Analytics",
                "Smart Manufacturing"
            ]
        },

        variant: {
            title: "Vision-Based Variant Verification for Multi-Model BIW Assembly",

            subtitle: "Poka-Yoke Automation • Wrong-Fitment Prevention",

            image: "/images/variant.jpeg",

            challenge: [
                "Mixed-model BIW production increased the risk of variant-specific assembly errors.",
                "Manual verification could not reliably distinguish DOST and SAATHI back panel assemblies.",
                "Wrong-fitment defects resulted in costly cabin rework and vehicle scrappage."
            ],

            solution: [
                "Developed a Python/OpenCV vision system to automatically verify back panel variants.",
                "Implemented image-based feature matching to identify model-specific BIW assemblies.",
                "Integrated automated validation into the assembly process to provide real-time Poka-Yoke protection."
            ],

            impact: [
                "Eliminated wrong-fitment risk through automated variant verification before assembly.",
                "Prevented costly cabin rework and scrappage across mixed-model production lines.",
                "Improved first-time-right manufacturing and strengthened assembly quality assurance."
            ],

            technologies: [
                "Python",
                "OpenCV",
                "Computer Vision",
                "Feature Matching",
                "Poka-Yoke",
                "Manufacturing Automation"
            ]
        },
        
        enterpriseTwin: {
            title: "Enterprise Digital Twin Deployment for Operations",

            subtitle: "24,000+ sqm Digitized • Industry 4.0 Transformation",

            image: "/images/enterpriseTwin.jpeg",

            challenge: [
                "Large manufacturing facilities lacked a unified digital representation for planning and analysis.",
                "Layout modifications and expansion studies required time-consuming on-site assessments.",
                "Engineering teams needed accurate factory data to support Industry 4.0 transformation initiatives."
            ],

            solution: [
                "Led enterprise-scale digital twin deployment using LiDAR scanning and panoramic image capture.",
                "Developed detailed 3D factory models to replicate manufacturing operations and facility layouts.",
                "Enabled virtual planning for layout optimisation, material flow analysis, and future capacity expansion."
            ],

            impact: [
                "Digitally replicated over 24,000 sqm of manufacturing facilities for engineering operations.",
                "Accelerated layout planning through virtual factory visualization and simulation capabilities.",
                "Supported enterprise-wide Industry 4.0 initiatives with scalable digital infrastructure."
            ],

            technologies: [
                "LiDAR",
                "3DEXPERIENCE",
                "Digital Twin",
                "3D Modelling",
                "Panoramic Imaging",
                "Industry 4.0"
            ]
        },

        energy: {
            title: "Online Energy Monitoring System for Smart Manufacturing",

            subtitle: "100% Energy Visibility • Industrial IoT Analytics",

            image: "/images/energy.jpeg",

            challenge: [
                "Energy consumption across production lines lacked real-time monitoring and centralized visibility.",
                "Manual analysis made it difficult to identify abnormal power usage and operational inefficiencies.",
                "Engineering teams required plant-wide energy insights to support sustainability initiatives."
            ],

            solution: [
                "Implemented an Industrial IoT platform integrating smart meters, PLCs, and energy monitoring systems.",
                "Developed real-time dashboards to monitor line, shop, and plant-level energy consumption.",
                "Configured KPI-based analytics and abnormal consumption alerts to support proactive energy management."
            ],

            impact: [
                "Established 100% real-time visibility of plant-wide energy consumption across manufacturing operations.",
                "Enabled data-driven optimization through centralized dashboards and actionable energy KPIs.",
                "Supported sustainability initiatives by improving energy efficiency and operational decision-making."
            ],

            technologies: [
                "Industrial IoT",
                "PLC",
                "Smart Meters",
                "Power BI",
                "Energy Analytics",
                "Industry 4.0"
            ]
        },

        capacity: {
            title: "Production Capacity Intelligence Dashboard",

            subtitle: "Predictive Capacity Planning • Data-Driven Decisions",

            image: "/images/capacity.jpeg",

            challenge: [
                "Production planning relied on fragmented capacity and demand information across multiple sources.",
                "Stakeholders lacked real-time visibility into future production constraints and resource utilization.",
                "Capacity planning decisions were reactive, limiting preparedness for changing market demand."
            ],

            solution: [
                "Developed an interactive Power BI dashboard integrating production capacity, demand, and growth forecasts.",
                "Visualized manufacturing constraints through dynamic KPIs, trend analysis, and scenario comparisons.",
                "Enabled data-driven capacity planning by consolidating business and production intelligence."
            ],

            impact: [
                "Improved decision-making through centralized real-time production capacity visibility.",
                "Enabled proactive planning by aligning manufacturing resources with future demand projections.",
                "Supported strategic capacity optimization using predictive analytics and interactive dashboards."
            ],

            technologies: [
                "Power BI",
                "Demand Forecasting",
                "DAX",
                "Power Query",
                "Data Analytics",
                "Manufacturing Intelligence"
            ]
        },

    };
  // STEP 5: Reveal animation
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  const bg = workTabBgRef.current;

  const activeBtn =
    activePanel === "exp"
      ? expBtnRef.current
      : projBtnRef.current;

  if (!bg || !activeBtn) return;

  bg.style.width = `${activeBtn.offsetWidth}px`;
  bg.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
}, [activePanel]);

    const enableDragScroll = (element) => {
    if (!element) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    element.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
        element.style.cursor = "grabbing";
    });

    element.addEventListener("mouseleave", () => {
        isDown = false;
        element.style.cursor = "grab";
    });

    element.addEventListener("mouseup", () => {
        isDown = false;
        element.style.cursor = "grab";
    });

    element.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        e.preventDefault();

        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 1.2;

        element.scrollLeft = scrollLeft - walk;
    });
    };

    useEffect(() => {
    enableDragScroll(expScrollRef.current);
    enableDragScroll(projScrollRef.current);
    }, []);;

    // Size the certification carousel viewport to match whichever
    // sibling column (Education / Publications) is tallest — however
    // many certification cards fit inside that height are shown at
    // once, and the rest are reached by scrolling. A small PEEK is
    // shaved off the bottom so the next (partially cut-off) card
    // hints that there's more to scroll.
    useEffect(() => {
        const PEEK = 28; // px of the next card visible at the bottom

        const measure = () => {
            const headEl = certListRef.current?.previousElementSibling; // .academic-col-head
            const headH = headEl?.offsetHeight || 0;
            const hintH = 28; // reserved space for the "scroll for more" hint line below

            const eduH = eduColRef.current?.offsetHeight || 0;
            const pubH = pubColRef.current?.offsetHeight || 0;
            const tallest = Math.max(eduH, pubH);

            const sampleH = certCardSampleRef.current?.offsetHeight || 140;
            const fallback = sampleH * 1.6; // ~1 card + peek, used until siblings have rendered

            const viewportH =
                tallest > 0
                    ? Math.max(tallest - headH - hintH, sampleH * 0.6)
                    : fallback;

            setCertsViewportHeight(Math.max(viewportH - PEEK, sampleH * 0.6));
        };

        measure();

        const ro = new ResizeObserver(measure);
        if (eduColRef.current) ro.observe(eduColRef.current);
        if (pubColRef.current) ro.observe(pubColRef.current);
        if (certCardSampleRef.current) ro.observe(certCardSampleRef.current);

        window.addEventListener("resize", measure);
        // Re-measure after fonts/images settle
        const t = setTimeout(measure, 300);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
            clearTimeout(t);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const certTotalPages = certifications.length;

    // Continuous scroll position as a 0–1 fraction, used to drive a
    // smooth slider that isn't tied to individual card boundaries —
    // dragging it scrolls proportionally, just like a real scrollbar.
    const setCertScrollFrac = (frac) => {
        setCertScrollFracState(Math.min(Math.max(frac, 0), 1));
    };

    const onCertSliderChange = (frac) => {
        const el = certListRef.current;
        if (el) {
            const maxScroll = el.scrollHeight - el.clientHeight;
            el.scrollTop = frac * maxScroll;
        }
        setCertScrollFrac(frac);
    };

    useEffect(() => {
        const el = certListRef.current;
        if (!el) return;

        let raf = null;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = null;
                const maxScroll = el.scrollHeight - el.clientHeight;
                const frac = maxScroll > 0 ? el.scrollTop / maxScroll : 0;
                setCertScrollFrac(frac);

                // Also track the nearest card, purely for the
                // screen-reader announcement.
                const cards = certCardRefs.current;
                let bestIdx = 0;
                let bestDist = Infinity;
                cards.forEach((card, idx) => {
                    if (!card) return;
                    const dist = Math.abs(card.offsetTop - el.scrollTop);
                    if (dist < bestDist) {
                        bestDist = dist;
                        bestIdx = idx;
                    }
                });
                setCertsPage(bestIdx);
            });
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            el.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [certTotalPages]);


    useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
        let current = "";

        sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.id;
        }
        });

        setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll(); // initialize

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
    }, []);    

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <div className="nav-logo">
            M. Thanveer <em>G</em>
          </div>

          <div className="nav-links">
            <a href="#hero" className={activeSection === "hero" ? "active-nav" : ""}>Home</a>
            <a href="#principles" className={activeSection === "principles" ? "active-nav" : ""}>Principles</a>
            <a href="#about" className={activeSection === "about" ? "active-nav" : ""}>About</a>
            <a href="#work" className={activeSection === "work" ? "active-nav" : ""}>Work</a>
            <a href="#skills" className={activeSection === "skills" ? "active-nav" : ""}>Skills</a>
            <a href="#academic" className={activeSection === "academic" ? "active-nav" : ""}>Academic</a>
            <a href="#awards" className={activeSection === "awards" ? "active-nav" : ""}>Awards</a>
            <a href="#contact" className={activeSection === "contact" ? "active-nav" : ""}>Contact</a>

            <a href="/resume.pdf" download className="nav-cv">Download CV</a>
          </div>

          <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`mob-menu ${menuOpen ? "open" : ""}`}
        id="mobMenu"
      >
        <button className="mob-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>

        <a href="#hero" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#principles" onClick={() => setMenuOpen(false)}>Principles</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
        <a href="#academic" onClick={() => setMenuOpen(false)}>Academic</a>
        <a href="#awards" onClick={() => setMenuOpen(false)}>Awards</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a href="/resume.pdf" download onClick={() => setMenuOpen(false)}>Download CV</a>
      </div>


        {/* MANIFESTO TICKER */}
        <div id="ticker">
        <div className="ticker-track" aria-hidden="true">
            {[...principles, ...principles].map((p, i) => (
            <span key={i} className="ticker-item">
                <span className="ticker-dot"></span>
                {p}
            </span>
            ))}
        </div>
        </div>

      {/* HERO */}

      <section id="hero">
        <div className="container">
            <div className="hero-layout">

            <div>
                <span className="hero-eyebrow">Engineer · Maker · Masters Candidate</span>
                <h1 className="hero-name">Mohamed<br/>Than<em>veer</em></h1>
                <div className="hero-ctas">
                <a href="#work" className="btn btn-dark">See My Work</a>
                <a href="#contact" className="btn btn-ghost">Let&apos;s Connect</a>
                <a href="/resume.pdf" download className="btn btn-ghost">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>
                    Resume
                </a>
                </div>
            </div>

            <div className="hero-panel reveal reveal-d1">
                <div>
                <p className="hero-intro-label">In an overview</p>
                <p className="hero-intro-text">
                    I am driven by opportunities where engineering meets intelligence—building systems that combine physics, data, and automation to create meaningful impact. Currently at TU Delft, I am exploring precision engineering and intelligent manufacturing while seeking roles that shape the next generation of high-tech systems.
                </p>
                </div>
                <div className="hero-divider"></div>
                <div className="hero-stats">
                <div className="stat">
                    <div className="stat-num">20<sup>+</sup></div>
                    <div className="stat-label">Cross-functional engineering projects delivered</div>
                </div>
                <div className="stat">
                    <div className="stat-num">15<sup>+</sup></div>
                    <div className="stat-label">Implementation of Industry 4.0 initiatives</div>
                </div>
                <div className="stat">
                    <div className="stat-num">3<sup>+</sup></div>
                    <div className="stat-label">Years leading digital manufacturing at scale</div>
                </div>
                <div className="stat">
                    <div className="stat-num">5<sup>+</sup></div>
                    <div className="stat-label">National industry awards</div>
                </div>
                </div>
            </div>

            </div>
        </div>
        </section>

        {/* PRINCIPLES */}
        <section id="principles">
        <div className="container">
            <div className="principles-header section-intro reveal">
            <h4>What I Stand For</h4>
            <h2>The principles I work by</h2>
            <p>Every project has reinforced these principles, and every new challenge continues to refine them.</p>
            </div>

            <div className="principles-grid">
            <div className="principle reveal">
                <p className="principle-num">I</p>
                <h3>Fix the root, not the symptom</h3>
                <p>The best improvements often come from understanding why a problem occurs, designing a solution that prevents it from recurring, and building systems that make quality repeatable.</p>
            </div>
            <div className="principle reveal reveal-d1">
                <p className="principle-num">II</p>
                <h3>Frugal beats expensive when cleverness is available</h3>
                <p>Some of the most effective solutions don&apos;t come from larger budgets, but from understanding the problem deeply and making thoughtful engineering decisions.</p>
            </div>
            <div className="principle reveal reveal-d2">
                <p className="principle-num">III</p>
                <h3>Data earns its keep when it changes a decision</h3>
                <p>Data becomes valuable when it helps people make better decisions and shed light on the grey areas. I believe analytics should always lead to meaningful action.</p>
            </div>
            <div className="principle reveal">
                <p className="principle-num">IV</p>
                <h3>Engineering begins where reality is</h3>
                <p>Some of my most valuable lessons have come from observing processes, listening to operators and understanding how work happens in practice.</p>
            </div>
            <div className="principle reveal reveal-d1">
                <p className="principle-num">V</p>
                <h3>Build for the person after you</h3>
                <p>Whether it&apos;s code, documentation or a manufacturing process, I try to leave work that others can understand, improve and build upon. Good work doesn&apos;t die when you move on.</p>
            </div>
            <div className="principle reveal reveal-d2">
                <p className="principle-num">VI</p>
                <h3>Curiosity is a professional skill</h3>
                <p>Exploring different disciplines has helped me connect ideas across  manufacturing, software and analytics. That curiosity continues to shape the individual I&apos;m becoming.</p>
            </div>
            </div>
        </div>
        </section>

        {/* ABOUT / INTRO */}
        <section id="about">
        <div className="container">
            <div className="about-layout">

            <div className="about-photo-box reveal">
                <div className="about-photo">
                <img src="/images/profile.jpeg" alt="Mohamed Thanveer G" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <svg className="photo-placeholder-icon" width="56" height="56" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" stroke="#888078" strokeWidth="1.5"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#888078" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="photo-placeholder-text">Replace with your photo</p>
                </div>
                <p className="about-location">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#888078" strokeWidth="1.5"/></svg><strong>
                Delft, Netherlands · Open to relocation </strong>
                </p>
            </div>

            <div className="about-content">
                <div className="reveal">
                <h4>Who I am</h4>
                <h2>Connecting Technology, People & Possibilities</h2>
                </div>
                <div className="about-body reveal reveal-d1">
                <p>
                    My journey began in mechanical engineering, where I developed a fascination for how machines are designed, how products are built, and how engineering shapes the world around us. Over time, that curiosity expanded beyond individual components to the larger systems they belong to.
                </p>
                <p>
                    At Ashok Leyland&apos;s Project Planning and Digital Manufacturing division, I worked on initiatives that connected engineering with transformation—spanning Industry 4.0 technologies, digitalisation, process and facility planning, capacity and capability enhancement, computer vision, IoT systems, and digital twins. Each project reinforced a simple idea: the most impactful engineering happens when technology, people, and processes work together seamlessly.
                </p>
                <p>
                    As I worked across manufacturing systems, I became increasingly interested in the decisions that shape engineering outcomes. This led me to pursue a PG Diploma in Management with a specialization in Data Analytics. The program strengthened my understanding of business strategy, analytics, and decision science, enabling me to translate data into insights and engineering solutions into measurable value.
                </p>
                <p>

                    <strong>Today, as an MSc student in High-Tech Engineering at TU Delft, I am exploring precision engineering at the micro and nano scale while building on my experiences in intelligent manufacturing and digital transformation. My interests lie in creating systems that bridge physics with intelligence, manufacturing with data, and innovation with real-world impact.</strong>
                </p>
                <p>
                    To me, engineering is ultimately about designing systems that empower people, industries, and society to move forward.
                </p>
                </div>
                <div className="fact-row reveal reveal-d2">
                <div className="fact">
                    <span className="fact-label">Current role</span>
                    <span className="fact-value">Student @ Delft University of Technology, Netherlands</span>
                </div>
                <div className="fact">
                    <span className="fact-label">Email</span>
                    <span className="fact-value"><a href="mailto:thanveerdecem@gmail.com">thanveerdecem@gmail.com</a></span>
                </div>
                <div className="fact">
                    <span className="fact-label">Masters Degree</span>
                    <span className="fact-value">MS Mechanical Engineering (Track: High-Tech Engineering)</span>
                </div>
                <div className="fact">
                    <span className="fact-label">LinkedIn</span>
                    <span className="fact-value"><a href="https://www.linkedin.com/in/mohamed-thanveer-a338ab212" target="_blank" rel="noopener">View Profile</a></span>
                </div>
                </div>
            </div>

            </div>
        </div>
        </section>


        {/* WORK — Experience + Projects, shared tabbed section */}
        <section id="work">
        <div className="container">

            <div className="work-header reveal">
            <div className="work-header-left section-intro">
                <h4>Career Path &amp; Selected Work</h4>
                <h2 id="workTitle">{activePanel === "exp"? "Work Experience": "Key Projects"}</h2>
                
            </div>
            <div className="work-header-right">
                <div className="work-tabs" id="workTabs">
                <div ref={workTabBgRef} className="work-tab-bg"></div>
                <button ref={projBtnRef} className={`work-tab ${activePanel === "proj" ? "active" : ""}`} onClick={() => setActivePanel("proj")}>Projects</button>
                <button ref={expBtnRef} className={`work-tab ${activePanel === "exp" ? "active" : ""}`}onClick={() => setActivePanel("exp")}>Experience</button>
                </div>
                <div className="work-scroll-hint" id="workHint">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span id="workHintText">{activePanel === "exp"? "Scroll to explore": "Drag to scroll"}</span>
                </div>
            </div>
            </div>

            <div className="work-panels">

            {/* EXPERIENCE PANEL */}
            <div className={`work-panel ${activePanel === "exp" ? "active" : ""}`} id="panel-exp">
                <div className="exp-track-outer">
                <div className="exp-spine"></div>

                <div className="exp-scroll" ref={expScrollRef}>

                    {/* CARD 1 */}
                    <div className="exp-stop">
                    <div className="exp-stop-head">
                        <div className="exp-dot active"></div>
                        <span className="exp-year">Feb 2024 — Aug 2026</span>
                        <span className="exp-badge now">Deputy Manager</span>
                    </div>

                    <div className="exp-card">
                        <p className="exp-role">Deputy Manager</p>
                        <p className="exp-company">Ashok Leyland Ltd.</p>
                        <p className="exp-loc">Project Planning & Digital Manufacturing · Chennai</p>

                        <ul className="exp-bullets">
                        <li>Led Industry 4.0 initiatives across capability, capacity, and facility planning for commercial vehicle manufacturing.</li>
                        <li>Delivered digital manufacturing solutions spanning computer vision, IoT, digital twins, simulation, and analytics.</li>
                        <li>Managed projects from concept to deployment, including stakeholder alignment, budgets, RFQ/RFPs, and ROI evaluation.</li>
                        <li>Drove process optimisation through Lean, Six Sigma, simulation, and business process reengineering.</li>
                        <li>Collaborated with engineering, operations, and external partners to implement scalable manufacturing improvements.</li>
                        </ul>
                    </div>
                    </div>

                    {/* CARD 2 */}
                    <div className="exp-stop">
                    <div className="exp-stop-head">
                        <div className="exp-dot"></div>
                        <span className="exp-year">Jul 2023 — Feb 2024</span>
                        <span className="exp-badge">Graduate Trainee</span>
                    </div>

                    <div className="exp-card">
                        <p className="exp-role">Graduate Engineering Trainee</p>
                        <p className="exp-company">Ashok Leyland Ltd.</p>
                        <p className="exp-loc">Hosur, India</p>

                        <ul className="exp-bullets">
                        <li>Rotational training across Operations, Product Development, and Aftermarket Support.</li>
                        <li>End-to-end exposure: customer order to final delivery and servicing.</li>
                        <li>Root cause analysis bridging digital systems and shop floor operations.</li>
                        </ul>
                    </div>
                    </div>

                    {/* CARD 3 */}
                    <div className="exp-stop">
                    <div className="exp-stop-head">
                        <div className="exp-dot"></div>
                        <span className="exp-year">Aug 2022</span>
                        <span className="exp-badge">Internship</span>
                    </div>

                    <div className="exp-card">
                        <p className="exp-role">Process Design Intern</p>
                        <p className="exp-company">Kupps and Sachs India Pvt. Ltd.</p>
                        <p className="exp-loc">Chennai, India</p>

                        <ul className="exp-bullets">
                        <li>P&ID development for oil &amp; gas process layouts.</li>
                        <li>Pressure vessel design and validation to ASME standards.</li>
                        <li>Structural calculations for mechanical erection and installation.</li>
                        </ul>
                    </div>
                    </div>

                    {/* CARD 4 */}
                    <div className="exp-stop">
                    <div className="exp-stop-head">
                        <div className="exp-dot"></div>
                        <span className="exp-year">May — Aug 2022</span>
                        <span className="exp-badge">Internship</span>
                    </div>

                    <div className="exp-card">
                        <p className="exp-role">Mechanical Design Intern</p>
                        <p className="exp-company">Atum Robotics</p>
                        <p className="exp-loc">Chennai, India</p>

                        <ul className="exp-bullets">
                        <li>Planetary gear-driven mobility mechanism for a social robot in Fusion 360.</li>
                        <li>Topology optimisation for 3D-printed components — improved strength-to-weight.</li>
                        <li>Structural load simulation and cross-functional manufacturability review.</li>
                        </ul>
                    </div>
                    </div>

                    {/* SCROLL SPACING */}
                    <div className="exp-stop" style={{ flex: "0 0 40px", padding: 0 }}></div>

                </div>
                </div>
            </div>

            {/* PROJECTS PANEL */}
            <div className={`work-panel ${activePanel === "proj" ? "active" : ""}`} id="panel-proj">
                <div className="proj-scroll" ref={projScrollRef}>

                {/* CARD 1 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/vision cover.jpeg" alt="vision-system" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag tag-hl">Python</span><span className="tag tag-hl">OpenCV</span><span className="tag">Computer Vision</span>
                    </div>
                    <h3 className="proj-title">Frugal Vision System for Process Confirmation</h3>
                    <div className="proj-metric">⚡ PPM 2,200 → 90 — 96% Defect reduction</div>
                    <p className="proj-desc">Engineered a frugal machine vision solution using Python and OpenCV for real-time process confirmation and assembly validation. The system enabled automated defect detection, reduced process variation, and achieved a 96% reduction in field defects while delivering commercial-level capability at a fraction of conventional vision system costs. The solution was scaled across 103 such cases as horizontal delployment.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.vision)} > View Details </button>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/wis cover.jpeg" alt="Digital WIS Guidance System" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag tag-hl">Kotlin</span><span className="tag tag-hl">Android Studio</span><span className="tag">App Dev</span>
                    </div>
                    <h3 className="proj-title">Digital WIS Guidance System for First-Time-Right Assembly</h3>
                    <div className="proj-metric">📍 Real-time operator guidance for error-free assembly</div>
                    <p className="proj-desc">Architected a digital operator guidance system that transformed paper-based work instructions into an interactive line-side application. By linking Configuration Build Numbers with engineering data, the solution improved process standardisation, accelerated operator decision-making, and enhanced build quality.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.WIS)} > View Details </button>
                    </div>
                </div>

                {/* CARD 3 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/traceability cover.jpeg" alt="traceability-platform" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag">Java</span><span className="tag">Android Studio</span><span className="tag tag-hl">App Dev</span>
                    </div>
                    <h3 className="proj-title">Digital Process Traceability & Evidence Management Platform</h3>
                    <div className="proj-metric">📦 End-to-end digital traceability across manufacturing processes</div>
                    <p className="proj-desc">Designed and implemented a digital traceability ecosystem that linked manufacturing operations with visual process evidence, strengthening quality governance, accelerating failure investigations, and improving compliance across production workflows.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.traceability)} > View Details </button>
                    </div>
                </div>

                {/* CARD 4 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/digitaltwin cover.jpeg" alt="Digital Twin Simulation" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag">Digital Twin</span><span className="tag tag-hl">Simulation</span>{/*<span className="tag">3D Printing</span>*/}
                    </div>
                    <h3 className="proj-title">AMR/AGV Route Optimisation through Digital Twin Simulation</h3>
                    <div className="proj-metric">📦 Enhanced material flow and facility utilisation</div>
                    <p className="proj-desc">Created a digital twin of manufacturing operations using 3D spatial data and process simulation to evaluate autonomous logistics strategies. The framework enabled virtual experimentation, route optimisation, and informed facility planning decisions for next-generation smart factories.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.digitalTwin)} > View Details </button>
                    </div>
                </div>

                {/* CARD 5 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/robotics cover.jpeg" alt="Robotics Project" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag">Topology</span><span className="tag tag-hl">Additive Mfg.</span>{/*<span className="tag">3D Printing</span>*/}
                    </div>
                    <h3 className="proj-title">Planetary Gear Mobility Mechanism for a Social Robot</h3>
                    <div className="proj-metric">⚙️ Lightweight design with enhanced structural efficiency</div>
                    <p className="proj-desc">Designed and developed a planetary gear-driven mobility mechanism for a social robot, integrating CAD modelling, topology optimisation, and additive manufacturing principles. The project focused on achieving lightweight, structurally efficient components that enhanced mobility performance while ensuring manufacturability through 3D printing for rapid prototyping.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.robotics)} > View Details </button>
                    </div>
                </div>

                {/* CARD 6 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/traffic cover.jpeg" alt="Traffic Project" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag">RFID</span><span className="tag tag-hl">SAP S4 HANA</span><span className="tag">Analytics</span>
                    </div>
                    <h3 className="proj-title">Smart Traffic Monitoring & Control System for In-Plant Logistics</h3>
                    <div className="proj-metric">🚚 15% TAT reduction through real-time traffic visibility</div>
                    <p className="proj-desc">Designed and spearheaded an RFID-enabled traffic monitoring platform for in-plant logistics, transforming manual vehicle tracking into a centralized digital control system, thereby ensuring real-time visibility of vehicle movement, congestion hotspots, and zone occupancy across plant operations, enabling data-driven decision making to improve turnaround time, safety, and material flow efficiency.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.traffic)} > View Details </button>
                    </div>
                </div>

                {/* CARD 7 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/variant cover.jpeg" alt="Variant Project" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag tag-hl">Python</span><span className="tag tag-hl">OpenCV</span><span className="tag">Computer Vision</span>
                    </div>
                    <h3 className="proj-title">Vision-Based Variant Verification for Multi-Model BIW Assembly</h3>
                    <div className="proj-metric">🛡 Eliminated wrong-fitment risk and prevented cabin scrappage</div>
                    <p className="proj-desc">Designed a vision-based poka-yoke system for a mixed-model Body-in-White (BIW) line to automatically verify variant-specific back panel assemblies. The solution enabled error-proof manufacturing across DOST and SAATHI vehicle platforms, preventing costly wrong-fitment defects and improving first-time-right assembly quality.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.variant)} > View Details </button>
                    </div>
                </div>

                {/* CARD 8 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/enterpriseTwin cover.jpeg" alt="Enterprise Digital Twin" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag tag-hl">LiDAR</span><span className="tag tag-hl">Digital Twin</span><span className="tag">3DS</span>
                    </div>
                    <h3 className="proj-title">Enterprise Digital Twin Deployment for Operations</h3>
                    <div className="proj-metric">🏭 24,000+ sqm digitally replicated across manufacturing operations</div>
                    <p className="proj-desc">Led the horizontal deployment of digital twin technology across manufacturing facilities, extending a proven 24,000 sqm chassis shop pilot to engine assembly operations. Leveraged LiDAR scanning, panoramic imaging, and 3D modelling to create virtual factory environments supporting layout optimization, material flow studies, decongestion planning, and future capacity expansion under Industry 4.0 initiatives.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.enterpriseTwin)} > View Details </button>
                    </div>
                </div>

                {/* CARD 9 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/energy cover.jpeg" alt="Online Energy Monitoring System" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag tag-hl">Industrial IoT</span><span className="tag tag-hl">Connectivity</span>{/*<span className="tag">Smart Mfg</span>*/}
                    </div>
                    <h3 className="proj-title">Online Energy Monitoring System for Smart Manufacturing</h3>
                    <div className="proj-metric">⚡ 100% plant-wide energy visibility with KPI-driven optimization</div>
                    <p className="proj-desc">Led the implementation of an Industry 4.0 energy monitoring platform to establish real-time visibility of line, shop, and plant-level power consumption. Integrated smart meters, PLCs, and analytics dashboards to identify inefficiencies, optimize energy usage, trigger abnormal consumption alerts, and support data-driven sustainability initiatives across manufacturing operations.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.energy)} > View Details </button>
                    </div>
                </div>

                {/* CARD 10 */}
                <div className="proj-card">
                    <div className="proj-img">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#888078" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#888078" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="#888078" strokeWidth="1.5"/></svg>
                    <img src="/images/capacity cover.jpeg" alt="Production Capacity Intelligence Dashboard" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </div>
                    <div className="proj-body">
                    <div className="proj-tags">
                        <span className="tag tag-hl">Power BI</span><span className="tag tag-hl">Demand Forecasting</span>{/*<span className="tag">Smart Mfg</span>*/}
                    </div>
                    <h3 className="proj-title">Production Capacity Intelligence Dashboard</h3>
                    <div className="proj-metric">⚡ Real-time capacity visibility for proactive decision-making</div>
                    <p className="proj-desc">Developed an interactive Power BI dashboard integrating production capacity, demand forecasts, and market growth projections to support proactive planning decisions. Enabled stakeholders to visualize constraints, evaluate scenarios, and align manufacturing resources with future business requirements.</p>
                    <button type="button" className="proj-link" onClick={() => setSelectedProject(projects.capacity)} > View Details </button>
                    </div>
                </div>

                {/* ADD MORE placeholder */}
                <div className="proj-add">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="#C4603A" strokeWidth="1.5" opacity="0.4"/><path d="M12 8v8M8 12h8" stroke="#C4603A" strokeWidth="1.5"/></svg>
                    <h3 style={{ fontSize: '0.88rem', color: 'var(--muted)', fontFamily: 'var(--f-body)' }}>More to come</h3>
                    <p>The learning continues...</p>
                </div>

                </div>
            </div>

            </div>
        </div>
        </section>

        {/*SKILLS*/}
        <section id="skills">
        <div className="container">
            <div className="skills-intro section-intro reveal">
            <h4>Technical Arsenal</h4>
            <h2>Capabilities &amp; Technologies</h2>
            </div>
            <div className="skills-table reveal">
            <div className="skills-row">
                <div className="skills-cat">Smart Manufacturing</div>
                <div className="skills-tags">
                <span className="tag tag-hl">Digital Twin</span>
                <span className="tag  tag-hl">Computer Vision</span>
                <span className="tag tag-hl">Industrial IoT</span>
                <span className="tag">Manufacturing Traceability</span>
                <span className="tag">Poka-Yoke Systems</span>
                <span className="tag tag-hl">Factory Digitization</span>
                <span className="tag tag-hl">Digital Transformation/Industry 4.0</span>
                
                </div>
            </div>
            <div className="skills-row">
                <div className="skills-cat">Data, Analytics & Decision Intelligence</div>
                <div className="skills-tags">
                <span className="tag">Power BI</span>
                <span className="tag">Tableau</span>
                <span className="tag">GA4</span>
                <span className="tag tag-hl">Statistical Modelling</span>
                <span className="tag tag-hl">Machine Learning</span>
                <span className="tag tag-hl">Design of Experiments (DOE)</span>
                <span className="tag tag-hl">Minitab</span>
                <span className="tag">JMP</span>
                <span className="tag">Data Visualization</span>
                <span className="tag">Predictive Analytics</span>
                </div>
            </div>
            <div className="skills-row">
                <div className="skills-cat">Engineering Design & Simulation</div>
                <div className="skills-tags">
                <span className="tag tag-hl">Dassault 3DEXPERIENCE</span>
                <span className="tag tag-hl">Creo</span>
                <span className="tag tag-hl">SolidWorks</span>
                <span className="tag tag-hl">Autodesk Inventor</span>
                <span className="tag">Fusion 360</span>
                <span className="tag">AutoCAD</span>
                <span className="tag">ANSYS</span>
                <span className="tag">DEFORM</span>
                <span className="tag tag-hl">Topology Optimization</span>
                <span className="tag tag-hl">Generative Design</span>
                
                
                </div>
            </div>
            <div className="skills-row">
                <div className="skills-cat">Software Development & Automation</div>
                <div className="skills-tags">
                <span className="tag">Python</span>
                <span className="tag">JavaScript</span>
                <span className="tag">Next.js</span>
                <span className="tag">Kotlin</span>
                <span className="tag tag-hl">Flutter</span>
                <span className="tag tag-hl">Android Studio</span>
                <span className="tag tag-hl">OpenCV</span>
                <span className="tag tag-hl">Scikit-learn/Pandas/Numpy</span>
                <span className="tag">TensorFlow</span>
                <span className="tag">API Integration</span>
                <span className="tag">Firebase</span>
                <span className="tag tag-hl">Tailwind CSS</span>
                <span className="tag tag-hl">Rapid Prototyping</span>
                

                </div>
            </div>
            <div className="skills-row">
                <div className="skills-cat">Project & Operations Engineering</div>
                <div className="skills-tags">
                <span className="tag tag-hl">Agile Project Management</span>
                <span className="tag tag-hl">Budget Management</span>
                <span className="tag tag-hl">Capacity & Capability Planning</span>
                <span className="tag">Facility Planning</span>
                <span className="tag">SAP S/4HANA</span>
                <span className="tag tag-hl">Process Planning</span>
                <span className="tag tag-hl">Cross-functional Leadership</span>
                <span className="tag tag-hl">Digital Transformation</span>
                <span className="tag">Vendor Management</span>
                <span className="tag">Lean & Six Sigma</span>
                </div>
            </div>
            </div>
        </div>
        </section>

        {/* ACADEMIC — Education, Certifications & Publications as parallel columns */}
        <section id="academic">
        <div className="container">
            <div className="academic-intro section-intro reveal">
            <h4>Academic Journey & Research</h4>
            <h2>Education, Certifications &amp; Publications</h2>
            </div>

            <div className="academic-grid">

            {/* COLUMN 1 — EDUCATION */}
            <div className="academic-col reveal" ref={eduColRef}>
                <div className="academic-col-head">
                <div className="academic-col-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M22 10L12 5 2 10l10 5 10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.6"/></svg>
                </div>
                <div>
                    <p className="academic-col-title">Education</p>
                    <p className="academic-col-sub">Degrees &amp; Diplomas</p>
                </div>
                </div>

                {/* UPCOMING MASTERS */}
                <div className="ac-card edu-eng upcoming">
                <div className="ac-meta-row">
                    <span className="ac-year">Aug 2026 — Present</span>
                    <span className="ac-pill">Ongoing</span>
                </div>
                
                <p className="ac-title">MS Mechanical Engineering (Track: High-Tech Engineering)</p>
                <p className="ac-sub">Delft University of Technology, Netherlands</p>
                <p className="ac-detail">Exploring precision technologies that connect advanced manufacturing, intelligent systems, and the engineering challenges of the future.</p>
                </div>

                {/* PG DIPLOMA */}
                <div className="ac-card edu-mgmt">
                <div className="ac-meta-row">
                    <span className="ac-year">Apr 2024 — Jul 2026</span>
                    <span className="ac-pill">GPA 4.0 / 4.0</span>
                </div>
                <p className="ac-title">PG Diploma in Management (Data Analytics)</p>
                <p className="ac-sub">Great Lakes Institute of Management, India</p>
                <p className="ac-detail">Developed expertise in analytics-driven decision making, business strategy, and data science—bridging engineering solutions with operational and organizational impact.</p>
                </div>

                {/* B.E. MECHANICAL */}
                <div className="ac-card edu-eng">
                <div className="ac-meta-row">
                    <span className="ac-year">Jun 2019 — Jun 2023</span>
                    <span className="ac-pill">GPA 9.29 / 10</span>
                </div>
                <p className="ac-title">B.E. Mechanical Engineering</p>
                <p className="ac-sub">College of Engineering Guindy, Anna University, India</p>
                <p className="ac-detail">Thesis: Machinability of Ti6Al4V and Inconel 625 using carbide inserts. CFD analysis of bi-polar plates for fuel cells.</p>
                </div>
            </div>

            {/* COLUMN 2 — PUBLICATIONS */}
            <div className="academic-col reveal reveal-d2" ref={pubColRef}>
                <div className="academic-col-head">
                <div className="academic-col-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M4 4h11l5 5v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M8 9h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </div>
                <div>
                    <p className="academic-col-title">Publications</p>
                    <p className="academic-col-sub">Research &amp; Thesis</p>
                </div>
                </div>

                <div className="ac-card">
                <div className="ac-meta-row">
                    <span className="ac-pill"><span className="ac-pub-index">01</span>Procedia CIRP</span>
                    <span className="ac-pub-status">Publication</span>
                </div>
                <p className="ac-title">Combined Influence of Depth of Cut and Feed Rate on the Performance of Tools with Different Cutting Radius in Machining Ti6Al4V</p>
                <p className="ac-detail"><em>Mohamed Thanveer G</em>, Manimaran. M, Joyson Selvakumar. S, Samuel Raj. D</p>
                
                <a href="https://doi.org/10.1016/j.procir.2026.03.019" className="ac-link" target="_blank" rel="noopener">View Publication ↗</a>
                </div>

                <div className="ac-card">
                <div className="ac-meta-row">
                    <span className="ac-pill"><span className="ac-pub-index">02</span>CEG, Anna Univ.</span>
                    <span className="ac-pub-status">Thesis</span>
                </div>
                <p className="ac-title">Effect of Cutting Edge Radius Preparation on the Machinability of Coated Carbide Inserts During Turning of Inconel 625</p>
                <p className="ac-detail">Guided by Dr Samuel Raj. D, Dept. of Mechanical Engineering, CEG.</p>
                <a href="https://drive.google.com/file/d/1YonxW_mCgQ_2-EOcGuWtDgVUb4FbW4Zt/view?usp=drivesdk" className="ac-link" target="_blank" rel="noopener">View Thesis ↗</a>
                </div>

                <div className="ac-card">
                <div className="ac-meta-row">
                    <span className="ac-pill"><span className="ac-pub-index">03</span>CEG, Anna Univ.</span>
                    <span className="ac-pub-status">Thesis</span>
                </div>
                <p className="ac-title">Design and Analysis of Bipolar Plate using Computational Fluid Dynamics for a PEM Fuel Cell</p>
                <p className="ac-detail">Guided by Dr Balamurugan. C, Dept. of Mechanical Engineering, CEG.</p>
                <a href="https://drive.google.com/file/d/1eB_yfkVZ2LxIYLc-_zFg2JylrwNnjxHr/view?usp=drivesdk" className="ac-link" target="_blank" rel="noopener">View Thesis ↗</a>
                </div>

            </div>

            {/* COLUMN 3 — CERTIFICATIONS */}
            <div className="academic-col reveal reveal-d1">
                <div className="academic-col-head">
                <div className="academic-col-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.6"/><path d="M8.5 13L7 21l5-2 5 2-1.5-8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                </div>
                <div>
                    <p className="academic-col-title">Certifications</p>
                    <p className="academic-col-sub">Verified Learning</p>
                </div>
                </div>

                <div className="cert-body">
                    <div
                        className="cert-viewport"
                        ref={certListRef}
                        role="region"
                        aria-roledescription="scrollable list"
                        aria-label="Certifications"
                        tabIndex={certTotalPages > 1 ? 0 : -1}
                        onKeyDown={
                            certTotalPages > 1
                                ? (e) => {
                                      if (e.key === "ArrowDown") {
                                          e.preventDefault();
                                          certListRef.current?.scrollBy({ top: 80, behavior: "smooth" });
                                      } else if (e.key === "ArrowUp") {
                                          e.preventDefault();
                                          certListRef.current?.scrollBy({ top: -80, behavior: "smooth" });
                                      }
                                  }
                                : undefined
                        }
                        style={
                            certsViewportHeight
                                ? { height: `${certsViewportHeight}px` }
                                : undefined
                        }
                    >
                        <div className="cert-track" ref={certTrackRef}>
                            {certifications.map((cert, i) => (
                                <div
                                    key={i}
                                    className={`ac-card${cert.upcoming ? " upcoming" : ""}`}
                                    style={cert.upcoming ? { opacity: 0.5 } : undefined}
                                    data-cert-index={i}
                                    // First real card is also the height sample
                                    ref={(node) => {
                                        certCardRefs.current[i] = node;
                                        if (i === 0) certCardSampleRef.current = node;
                                    }}
                                >
                                    <div className="ac-meta-row">
                                        <span className="ac-year">{cert.year}</span>
                                    </div>
                                    <p
                                        className="ac-title"
                                        style={cert.upcoming ? { color: "var(--muted)" } : undefined}
                                    >
                                        {cert.title}
                                    </p>
                                    {cert.upcoming ? (
                                        <p className="ac-sub" style={{ color: "var(--muted)" }}>
                                            {cert.org}
                                        </p>
                                    ) : (
                                        <div className="ac-sub-row">
                                            <span className="ac-sub">{cert.org}</span>
                                            {cert.href && (
                                                <a
                                                    href={cert.href}
                                                    className="ac-link"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View Certification ↗
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SLIDER — vertical, beside the carousel, continuous (not
                        tied to individual cards) — only shown when there's
                        more than one cert. Dragging it scrolls proportionally,
                        like a real scrollbar, and it tracks scroll position
                        automatically as you scroll naturally. */}
                    {certTotalPages > 1 && (
                        <div className="cert-slider-wrap">
                            <input
                                type="range"
                                className="cert-slider"
                                min={0}
                                max={1}
                                step={0.001}
                                value={certScrollFracState}
                                onChange={(e) => onCertSliderChange(Number(e.target.value))}
                                aria-label="Scroll through certifications"
                                aria-valuetext={`Certification ${certsPage + 1} of ${certTotalPages}`}
                            />
                            <div className="cert-dots" aria-hidden="true">
                                {certScrollDots.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`cert-dot${
                                            i === Math.round(certScrollFracState * (CERT_DOT_COUNT - 1))
                                                ? " active"
                                                : ""
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Screen-reader-only live announcement of position changes */}
                <p className="sr-only" aria-live="polite">
                    {`Showing certification ${certsPage + 1} of ${certTotalPages}`}
                </p>

                {/* Scroll hint — only relevant once there's more than one cert */}
                {certTotalPages > 1 && (
                    <p className="cert-hint">
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Scroll for more certifications
                    </p>
                )}
            </div>
            </div>
        </div>
        </section>

        {/* AWARDS */}
        <section id="awards">
        <div className="container">
            <div className="awards-intro section-intro reveal">
            <h4>Recognition</h4>
            <h2>Honours &amp; Awards</h2>
            </div>
            <div className="awards-list reveal">

            <div className="award-row">
                <span className="award-date">May 2025</span>
                <div><p className="award-title-text">RISE — Reward for Individual&apos;s Search for Excellence</p><p className="award-org-text">Ashok Leyland</p></div>
                <span className="award-icon-cell">🏆</span>
            </div>
            <div className="award-row">
                <span className="award-date">Dec 2024</span>
                <div><p className="award-title-text">Platinum Award — 9th CII National Kaizen Circle Competition</p><p className="award-org-text">Confederation of Indian Industry (CII)</p></div>
                <span className="award-icon-cell">🥇</span>
            </div>
            <div className="award-row">
                <span className="award-date">Nov 2024</span>
                <div><p className="award-title-text">2× Gold Awards — 17th Chennai Chapter Kaizen Competition</p><p className="award-org-text">Quality Circle Forum of India (QCFI)</p></div>
                <span className="award-icon-cell">🥇</span>
            </div>

        
            </div>
        </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
        <div className="container">
            <div className="contact-layout">

            <div className="contact-left section-intro reveal">
                <h4>Get In Touch</h4>
                <h2>Let&apos;s connect</h2>
                <p>Whether you&apos;re a recruiter, a researcher, or someone curious about what happens when mechanical engineering meets intelligent systems — I&apos;d like to hear from you.</p>
                <div className="contact-links">
                <a href="mailto:thanveerdecem@gmail.com" className="c-link">
                    <div className="c-icon"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5"/><path d="M22 6L12 13 2 6" stroke="currentColor" strokeWidth="1.5"/></svg></div>
                    <div><span className="c-lbl">Email</span><span className="c-val">thanveerdecem@gmail.com</span></div>
                </a>
                <a href="https://www.linkedin.com/in/mohamed-thanveer-a338ab212" target="_blank" rel="noopener" className="c-link">
                    <div className="c-icon"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10v7M7 7v.5M12 17v-4a2 2 0 014 0v4M12 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                    <div><span className="c-lbl">LinkedIn</span><span className="c-val">mohamed-thanveer-a338ab212</span></div>
                </a>
                <a href="tel:+917358823984" className="c-link">
                    <div className="c-icon"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 15a16 16 0 006.06 6.06l.44-.44a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5"/></svg></div>
                    <div><span className="c-lbl">Phone</span><span className="c-val">+91 7358823984</span></div>
                </a>
                </div>
            </div>

            <div className="reveal reveal-d1">
                <form className="contact-form" action="https://formspree.io/f/mdavbkpg" method="POST">
                <div className="f-row">
                    <div className="f-group"><label className="f-label" htmlFor="cn">Name</label><input className="f-input" id="cn" name="name" type="text" placeholder="Your name" required /></div>
                    <div className="f-group"><label className="f-label" htmlFor="ce">Email</label><input className="f-input" id="ce" name="email" type="email" placeholder="your@email.com" required /></div>
                </div>
                <div className="f-group"><label className="f-label" htmlFor="cs">Subject</label><input className="f-input" id="cs" name="subject" type="text" placeholder="Masters inquiry / Hiring / Collaboration…" /></div>
                <div className="f-group"><label className="f-label" htmlFor="cm">Message</label><textarea className="f-textarea" id="cm" name="message" placeholder="What's on your mind?" required></textarea></div>
                <button type="submit" className="f-btn">
                    Send Message
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2"/></svg>
                </button>
                
                </form>
            </div>

            </div>
        </div>
        </section>


        {selectedProject && (
            <div
                className="project-modal-overlay"
                onClick={() => setSelectedProject(null)}
            >
                <div
                    className="project-modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="modal-close"
                        aria-label="Close"
                        onClick={() => setSelectedProject(null)}
                    >
                        ✕
                    </button>

                    {/* ---------- IMAGE ---------- */}
                    <div className="modal-left">
                        <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                        />
                    </div>

                    {/* ---------- CONTENT ---------- */}
                    <div className="modal-right">

                        <h2>{selectedProject.title}</h2>

                        <p className="project-subtitle">
                            {selectedProject.subtitle}
                        </p>

                        <div className="project-grid">

                            {/* Challenge */}
                            <div className="project-card">
                                <h4>Challenge</h4>

                                <div className="project-list">
                                    {selectedProject.challenge.map((item, i) => (
                                        <p key={i} className="project-point">
                                            <span className="point-icon">✔</span>
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Solution */}
                            <div className="project-card">
                                <h4>Solution</h4>

                                <div className="project-list">
                                    {selectedProject.solution.map((item, i) => (
                                        <p key={i} className="project-point">
                                            <span className="point-icon">✔</span>
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Impact */}
                            <div className="project-card">
                                <h4>Impact</h4>

                                <div className="project-list">
                                    {selectedProject.impact.map((item, i) => (
                                        <p key={i} className="project-point">
                                            <span className="point-icon">✔</span>
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="project-card">
                                <h4>Technologies</h4>

                                <div className="modal-tech">
                                    {selectedProject.technologies.map((tech, i) => (
                                        <span key={i} className="tag tag-hl">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        )}

        {/* FOOTER */}
        <footer>
        <div className="container">
            <p>
            © {new Date().getFullYear()}{" "}
            <span>Mohamed Thanveer G</span> · Netherlands ·
            </p>
        </div>
        </footer>


    </>
  );
}