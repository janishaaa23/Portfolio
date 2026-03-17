import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techSkills = [
  "C",
  "C++",
  "JavaScript",
  "Java",
  "Python",
  "HTML",
  "CSS",
  "Node.js",
  "React.js",
  "MySQL",
  "MongoDB",
];

const softSkills = [
  "Problem Solving",
  "Quick Learner",
  "Leadership",
  "Adaptability",
];

const projects = [
  {
    title: "Recipe Generator and Smart Grocery List",
    period: "Jul 2025",
    image: "/assets/recipe.png",
    summary:
      "Ever wondered how meal planning could be smarter? This app lets users generate recipes and manage groceries in one seamless experience.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB Atlas"],
  },
  {
    title: "Demand-Based Notification Platform",
    period: "May 2025",
    image: "/assets/alerts.png",
    summary:
      "What if you never missed a job or course that matched your interests? This platform delivers real-time, personalized alerts for opportunities that matter.",
    tech: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
  },
];

const certificates = [
  "Full-Stack Web Development - CipherSchools (Jul 2025)",
  "Privacy and Security in Social Media - NPTEL (May 2025)",
  "Computer Communications - Coursera (Nov 2024)",
  "Unrevealing Basic Python towards ML/A - CSE Pathshala (Feb 2023)",
];

const activities = [
  "Attended Full Stack Web Development seminar at IIT Roorkee",
  "Participated in AstroQuest at IIT Ropar",
  "Received Appreciation Award from NGO",
  "Content Creator at College Club",
];

const navItems = [
  { label: "About", href: "#top" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const heroMetrics = [
  { label: "Core Stack", value: "MERN" },
  { label: "Full Stack Projects", value: "3+" },
  { label: "Current CGPA", value: "8.09" },
];

export default function App() {
  const [activeHash, setActiveHash] = useState("#top");
  const cursorRef = useRef();
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const scrollToSection = (hash) => {
    const target = document.querySelector(hash);
    if (!target) return;

    const nav = document.querySelector(".top-nav");
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
    const offset = navHeight + 24;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    setActiveHash(hash);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-chip", {
        y: -24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });

      gsap.from(".hero-profile", {
        scale: 0.6,
        opacity: 0,
        filter: "blur(16px)",
        duration: 1.1,
        ease: "power3.out",
      });

      gsap.from(".hero-animate", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.13,
        ease: "power3.out",
      });

      gsap.utils.toArray(".section").forEach((section) => {
        gsap.from(section, {
          y: 42,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });

      navItems.forEach((item) => {
        const target = document.querySelector(item.href);
        if (!target) return;

        ScrollTrigger.create({
          trigger: target,
          start: "top 35%",
          end: "bottom 35%",
          onEnter: () => setActiveHash(item.href),
          onEnterBack: () => setActiveHash(item.href),
        });
      });
    });

    // GSAP animation for hero glow gradient
    const glowTl = gsap.timeline({ repeat: -1 });
    glowTl.to(":root", { "--glow-color": "#6f42c1", duration: 4, ease: "sine.inOut" }) // purple
      .to(":root", { "--glow-color": "#20c997", duration: 4, ease: "sine.inOut" }) // teal
      .to(":root", { "--glow-color": "#007bff", duration: 4, ease: "sine.inOut" }); // blue

      // Cursor follower effect
      const handleMouseMove = (e) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />
      <header className="container hero" id="top">
        <div className="hero-blobs" aria-hidden="true">
          <span className="blob blob-a" />
          <span className="blob blob-b" />
          <span className="blob blob-c" />
        </div>
        <div className="hero-glow" aria-hidden="true" />
        <nav className="top-nav hero-animate">
          <div className="nav-identity">
            <p className="nav-name">Janisha Narang</p>
          </div>
          <div className="nav-links" aria-label="Portfolio navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                className={`nav-chip${activeHash === item.href ? " active" : ""}`}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
              <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </nav>

        <div className="hero-content">
          <img src="/assets/profile.jpeg" alt="Janisha Narang" className="hero-profile" />
          <div className="intro-block hero-animate">
            <p className="eyebrow">Full-Stack Developer</p>
            <h1 className="hero-title">Full-Stack Developer crafting fast, scalable and user-focused web experiences.</h1>
            <p className="hero-animate">
              Computer Science student at Lovely Professional University focused on building
              responsive full-stack applications with JavaScript, React, and Node.js.
            </p>
            <div className="actions hero-animate">
              <a className="btn" href="mailto:narangjanisha@gmail.com">Email</a>
              <a className="btn ghost" href="https://www.linkedin.com/in/janisha-narang" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn ghost" href="https://github.com/janishaaa23" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>

            <div className="hero-metrics hero-animate">
              {heroMetrics.map((metric) => (
                <article key={metric.label} className="metric-card">
                  <p className="metric-value">{metric.value}</p>
                  <p className="metric-label">{metric.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="section" id="skills">
          <div className="section-head">
            <p className="eyebrow">Capabilities</p>
            <h2>Skills</h2>
            <span className="section-line" aria-hidden="true" />
          </div>
          <div className="skills-group">
            <h3>Technical Skills</h3>
            <div className="pill-wrap">
              {techSkills.map((skill) => (
                <span key={skill} className="pill">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skills-group">
            <h3>Soft Skills</h3>
            <div className="pill-wrap">
              {softSkills.map((skill) => (
                <span key={skill} className="pill">{skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-head">
            <p className="eyebrow">Portfolio</p>
            <h2>Project</h2>
            <span className="section-line" aria-hidden="true" />
          </div>
          <div className="cards two-col">
            {projects.map((project) => (
              <article className="card project-card" key={project.title}>
                <img src={project.image} alt={`${project.title} screenshot placeholder`} className="project-image" />
                <h3>{project.title}</h3>
                <p className="meta">{project.period}</p>
                <p>{project.summary}</p>
                <div style={{ marginTop: '0.5em', display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
                  {project.tech.map((tech) => (
                    <button
                      key={tech}
                      className="tech-pill"
                      style={{
                        border: 'none',
                        borderRadius: '999px',
                        background: '#eaf3fa',
                        color: '#127cda',
                        padding: '0.35em 1em',
                        fontWeight: 600,
                        fontSize: '0.97em',
                        cursor: 'pointer',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#127cda';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#eaf3fa';
                        e.currentTarget.style.color = '#127cda';
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="training">
          <div className="section-head">
            <p className="eyebrow">Learning</p>
            <h2>Training</h2>
            <span className="section-line" aria-hidden="true" />
          </div>
          <div className="cards">
            <article className="card">
              <h3>CipherSchools - Full-Stack Development</h3>
              <p className="meta">Jul 2025</p>
              <p>
                Built end-to-end web applications across frontend and backend layers using
                modern JavaScript frameworks, API development, and secure authentication.
              </p>
              <p className="tech">
                <strong>Tech:</strong> HTML5, CSS3, JavaScript (ES6), React.js, Node.js,
                Express.js, MongoDB, Mongoose, JWT
              </p>
            </article>
          </div>
        </section>

        <section className="section" id="certificates">
          <div className="section-head">
            <p className="eyebrow">Achievements</p>
            <h2>Certificates</h2>
            <span className="section-line" aria-hidden="true" />
          </div>
            <div className="cert-cards">
              {/* Card 1 */}
              <div className="cert-card">
                <img src="/assets/cipher schools.png" alt="Cipher Schools Certificate" className="cert-img" />
                <div className="cert-info">
                  <h3 className="cert-title">Full-Stack Web Development</h3>
                  <div className="cert-meta">CipherSchools<br />July 2025</div>
                  <div className="cert-desc">Certificate demonstrating proficiency in full-stack web development.</div>
                  <a href="https://drive.google.com/file/d/1EgNX4jZ3AI9y_3e25hnSetWK3irQOeR0/view" className="cert-link" target="_blank" rel="noopener noreferrer">View Certificate</a>
                </div>
              </div>
              {/* Card 2 */}
              <div className="cert-card">
                <img src="/assets/nptel.png" alt="NPTEL Certificate" className="cert-img" />
                <div className="cert-info">
                  <h3 className="cert-title">Privacy and Security in Social Media</h3>
                  <div className="cert-meta">NPTEL<br />May 2025</div>
                  <div className="cert-desc">Certificate for successful completion of Privacy and Security in Social Media.</div>
                  <a href="https://drive.google.com/file/d/13mwwJKKAVz2O-3MrWc-5K0-LryMxm_cH/view" className="cert-link" target="_blank" rel="noopener noreferrer">View Certificate</a>
                </div>
              </div>
              {/* Card 3 */}
              <div className="cert-card">
                <img src="/assets/cousera.png" alt="Coursera Certificate" className="cert-img" />
                <div className="cert-info">
                  <h3 className="cert-title">Computer Communications</h3>
                  <div className="cert-meta">Coursera<br />Nov 2024</div>
                  <div className="cert-desc">Certificate for completing Computer Communications specialization.</div>
                  <a href="https://drive.google.com/file/d/1diiTHiKawNDwl4bAZWSwOMsv1pp-0JGd/view" className="cert-link" target="_blank" rel="noopener noreferrer">View Certificate</a>
                </div>
              </div>
              {/* Card 4 */}
              <div className="cert-card">
                <img src="/assets/cse pathshala.jpg" alt="CSE Pathshala Certificate" className="cert-img" />
                <div className="cert-info">
                  <h3 className="cert-title">Unrevealing Basic Python towards ML/A</h3>
                  <div className="cert-meta">CSE Pathshala<br />Feb 2023</div>
                  <div className="cert-desc">Certificate for successful completion of Python for ML/AI.</div>
                  <a href="https://drive.google.com/file/d/1I3cJYMxYvdJ4T6xifI-q9QxkCfNv6vXx/view" className="cert-link" target="_blank" rel="noopener noreferrer">View Certificate</a>
                </div>
              </div>
            </div>
        </section>

        <section className="section" id="education">
          <div className="section-head">
            <p className="eyebrow">Background</p>
            <h2>Education</h2>
            <span className="section-line" aria-hidden="true" />
          </div>
          <div className="timeline">
            <article className="timeline-item">
              <h3>Lovely Professional University, Punjab</h3>
              <p className="meta">Aug 2023 - Present</p>
              <p>Bachelor of Technology in CSE, CGPA: 8.09</p>
            </article>
            <article className="timeline-item">
              <h3>Montgomery Guru Nanak Public School, Jalandhar</h3>
              <p className="meta">Apr 2022 - Mar 2023</p>
              <p>Intermediate, Percentage: 84.2%</p>
            </article>
            <article className="timeline-item">
              <h3>St. Joseph's Convent School, Jalandhar</h3>
              <p className="meta">Apr 2020 - Mar 2021</p>
              <p>Matriculation, Percentage: 91%</p>
            </article>
          </div>
        </section>

        <section className="section" id="activities">
          <div className="section-head">
            <p className="eyebrow">Beyond Academics</p>
            <h2>Extra Curricular</h2>
            <span className="section-line" aria-hidden="true" />
          </div>
          <article className="card">
            <ul>
              {activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="section" id="contact">
          <div className="section-head">
            <p className="eyebrow">Get In Touch</p>
            <h2>Contact</h2>
            <span className="section-line" aria-hidden="true" />
          </div>
          <article className="contact-card">
            <p className="status-pill">Open to internships and freelance projects</p>
            <p><strong>Email:</strong> narangjanisha@gmail.com</p>
            <p><strong>Phone:</strong> +91-8437018613</p>
            <p><strong>Location:</strong> Punjab, India</p>
            <p><strong>Degree:</strong> B.Tech CSE</p>
          </article>
        </section>

        <section className="section">
          <article className="cta-band">
            <div>
              <p className="eyebrow">Let&apos;s Build</p>
              <h2>Ready to collaborate on your next web project?</h2>
            </div>
            <div className="cta-actions">
              <a className="btn" href="mailto:narangjanisha@gmail.com">Start a Conversation</a>
              <a className="btn ghost" href="/resume.pdf" target="_blank" rel="noreferrer">View Resume</a>
            </div>
          </article>
        </section>
      </main>

      <footer className="container footer">
        <p>Open to internships and developer opportunities.</p>
        <a className="btn" href="mailto:narangjanisha@gmail.com">Let's Connect</a>
      </footer>
    </>
  );
}
