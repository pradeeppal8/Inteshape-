import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CustomLoader from "../../Component/CustomeLoader";
import ScrollButtons from "../../Component/ScrollButtons";
import config from "../../config";

const EXPRESS_STATS = [
    { target: 24, suffix: "", label: "Our Experience" },
    { target: 340, suffix: "", label: "Project Taken" },
    { target: 86, suffix: "", label: "Awards Won" },
    { target: 36, suffix: "K", label: "Twitter Followers" },
];

function About() {
    const [loading, setLoading] = useState(true);
    const [statValues, setStatValues] = useState(() => EXPRESS_STATS.map(() => 0));
    const [startStats, setStartStats] = useState(false);
    const [aboutHero, setAboutHero] = useState({
        Item: [],
    });
    const [whatWeSection, setWhatWeSection] = useState({
        title: "What We Do",
        items: [],
    });
    const [clientsSection, setClientsSection] = useState({
        title: "Our Clinet",
        showButton: true,
        buttonText: "View More",
        buttonLink: "",
        items: [],
    });
    const [superTeamSection, setSuperTeamSection] = useState({
        title: "Super Team",
        Items: [],
    });
    // const [socialLinks, setSocialLinks] = useState({
    //    
    // });
    const expressSectionRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        const section = expressSectionRef.current;
        if (!section) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setStartStats(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (startStats) return undefined;

        // Fallback: if intersection callback is missed, still start auto counter.
        const fallbackTimer = setTimeout(() => {
            setStartStats(true);
        }, 4000);

        return () => clearTimeout(fallbackTimer);
    }, [startStats]);

    useEffect(() => {
        if (!startStats) return undefined;

        const duration = 1500;
        const startTime = performance.now();
        let animationFrame;

        const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setStatValues(
                EXPRESS_STATS.map((item) => {
                    const target = Number(item.target) || 0;
                    return Math.floor(target * progress);
                })
            );

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [startStats]);

    const [socialLinks, setSocialLinks] = useState({
        facebookLink: '', twitterLink: '', instagramLink: '', linkedinLink: ''
    });

    useEffect(() => {
        fetch(`${config.apiUrl}/api/navigation`)
            .then(r => r.json())
            .then(d => {
                if (d.success) {
                    if (Array.isArray(d.data.footer)) {
                        const active = d.data.footer
                            .filter(item => item.active)
                            .map(item => ({ path: item.path, label: item.label }));
                        if (active.length > 0);
                    }
                    if (d.data.socialMediaLinks) {
                        setSocialLinks(d.data.socialMediaLinks);
                    }
                }
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        fetch(`${config.apiUrl}/api/settings`)
            .then((r) => r.json())
            .then((d) => {
                if (!d?.success || !d.data?.aboutPage) return;
                const a = d.data.aboutPage;
                setAboutHero((prev) => ({
                    ...prev,
                    image: a.bannerImage?.trim() || prev.image,
                    eyebrow: a.eyebrow?.trim() || prev.eyebrow,
                    title: a.title?.trim() || prev.title,
                    subtitle: a.description?.trim() || prev.subtitle,
                    bannerEnabled: a.bannerEnabled ?? prev.bannerEnabled,
                }));

                setWhatWeSection({
                    title: a.whatWeTitle?.trim() || "What We Do",
                    items: Array.isArray(a.whatWeItems)
                        ? a.whatWeItems
                            .filter((item) => item && item.title)
                            .map((item, idx) => ({
                                title: item.title,
                                number: item.number || String(idx + 1).padStart(2, "0"),
                                image: item.image || "",
                            }))
                        : [],
                });

                setClientsSection({
                    title: a.clientsTitle?.trim() || "Our Clinet",
                    showButton: a.clientsShowButton ?? true,
                    buttonText: a.clientsButtonText?.trim() || "View More",
                    buttonLink: a.clientsButtonLink?.trim() || "",
                    items: Array.isArray(a.clientsItems)
                        ? a.clientsItems
                            .filter((item) => item && item.active !== false)
                            .map((item, idx) => ({
                                name: item.name || `Client ${idx + 1}`,
                                src: item.src || "",
                            }))
                        : [],
                });

                setSuperTeamSection((prev) => ({
                    title: a.superTeamTitle?.trim() || prev.title,
                    members: Array.isArray(a.superTeamMembers) && a.superTeamMembers.length
                        ? a.superTeamMembers
                            .filter((item) => item && item.active !== false)
                            .map((item, idx) => ({
                                name: item.name || `Member ${idx + 1}`,
                                role: item.role || "",
                                image: item.image || "",
                            }))
                        : prev.members,
                }));
            })
            .catch(() => {
                // Keep static fallback values when backend is unavailable.
            });
    }, []);

    if (loading) return <CustomLoader loading />;

    const logos = [
        {
            name: "Atlassian",
            src: "https://dummyimage.com/120x28/ddd/222&text=Atlassian",
        },
        {
            name: "Lacoste",
            src: "https://dummyimage.com/100x28/ddd/222&text=Lacoste",
        },
        {
            name: "Juniper",
            src: "https://dummyimage.com/100x28/ddd/222&text=Juniper",
        },
        {
            name: "HubSpot",
            src: "https://dummyimage.com/100x28/ddd/222&text=HubSpot",
        },
    ];

    const posts = [
        {
            title: "Building a HubSpot integration with Zapier",
            image:
                "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop",
        },
        {
            title: "How to build a website on HubSpot CMS without a developer",
            image:
                "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1200&auto=format&fit=crop",
        },
        {
            title: "10 tips for website conversion rate optimization",
            image:
                "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
        },
    ];
    const teamSection = {
        title: "A small efficient interior design team.",
        copy: "Inteshape is a team of highly talented, experienced, and architects and designers. Our company has been the leading provider of architecture services to clients through out the USA since May 1999. We pay attention to every demand...",
        bullets: [
            "We provide architectural 3D modeling services.",
            "Our specialists are ready to consult you on any topic.",
            "We develop and implement better interior design.",
            "We provide high-quality interior services for clients.",
        ],
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1400&auto=format&fit=crop",
        experienceLabel: "25 Years Experience",
    };

    return (
        <>
            <div className="main-wrapper">
                <div className="about_page">
                    <section id="about" className="relative">
                        {aboutHero.bannerEnabled && (
                            <div className="about-hero-wrap">
                                <img
                                    src={aboutHero.image}
                                    alt="About banner"
                                    className="about-hero-image"
                                />
                                <div className="about-hero-overlay">
                                    <div className="about-hero-content">
                                        <p className="about-hero-kicker">{aboutHero.eyebrow}</p>
                                        <h1>{aboutHero.title}</h1>
                                        <p className="about-hero-subtitle">{aboutHero.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                    <section className="about-team-section">
                        <div className="about-team-wrap">
                            <div className="about-team-content">
                                <h2>{teamSection.title}</h2>
                                <p>{teamSection.copy}</p>
                                <ul>
                                    {teamSection.bullets.map((item, idx) => (
                                        <li key={idx}>
                                            <span className="about-team-arrow">&rsaquo;</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button type="button" className="read-more-btn aos-init aos-animate">READ MORE</button>
                            </div>

                            <div className="about-team-media-frame">
                                <div className="about-team-media">
                                    {/* <img src={teamSection.image} alt="Interior design team" /> */}
                                    <img
                                        src={aboutHero.image}
                                        alt="Interior design team"
                                        className="about-hero-image"
                                    />
                                    <button type="button" className="about-team-play" aria-label="Play video">
                                        <span className="about-team-play-triangle" />
                                    </button>
                                    <div className="about-team-experience">{teamSection.experienceLabel}</div>
                                    <span className="about-team-corner about-team-corner--tl" />
                                    <span className="about-team-corner about-team-corner--br" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="about-whatdo-section">
                        <div className="about-whatdo-title-wrap">
                            <h3 className="about-whatdo-title">{whatWeSection.title}</h3>
                        </div>
                        <div className="about-whatdo-grid">
                            {whatWeSection.items.map((item) => (
                                <article key={item.number} className="about-whatdo-card">
                                    <div className="about-whatdo-media">
                                        <img src={item.image} alt={item.title} />
                                        <span className="about-whatdo-number">{item.number}</span>
                                    </div>
                                    <div className="about-whatdo-caption">{item.title}</div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="about-express-section" ref={expressSectionRef}>
                        <div className="about-express-overlay" />
                        <div className="about-express-wrap">
                            {EXPRESS_STATS.map((item, idx) => (
                                <article key={item.label} className="about-express-card">
                                    <h4>{`${statValues[idx]}${item.suffix}`}</h4>
                                    <p>{item.label}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="about-superteam-section">
                        <div className="about-superteam-title-wrap">
                            <h3 className="about-superteam-title">{superTeamSection.title}</h3>
                        </div>
                        <div className="about-superteam-grid">
                            {superTeamSection.members.map((member, memberIndex) => (
                                <article key={member.name} className="about-superteam-card">
                                    <div className="about-superteam-media">
                                        <img
                                            src={member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop"}
                                            alt={member.name}
                                            className="about-superteam-image"
                                        />
                                        <div className="about-superteam-socials" aria-hidden="true">
                                            {[
                                                { key: "facebookLink", cls: "fab_facebook", title: "Facebook" },
                                                { key: "twitterLink", cls: "fab_twitter", title: "Twitter" },
                                                { key: "instagramLink", cls: "fab_instagram", title: "Instagram" },
                                                { key: "linkedinLink", cls: "fab_linkedin", title: "Linkedin" },
                                            ].map(({ key, cls, title }) =>
                                                socialLinks[key] ? (
                                                    <Link
                                                        key={`${member.name}-${memberIndex}-${key}`}
                                                        to={socialLinks[key]}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="about-superteam-social-link"
                                                        aria-label={title}
                                                    >
                                                        <div className={cls}></div>
                                                        <span className="title">{title}</span>
                                                    </Link>
                                                ) : null
                                            )}
                                        </div>
                                    </div>
                                    <div className="about-superteam-body">
                                        <h4>{member.name}</h4>
                                        <p>{member.role}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="about-client-section">
                        <span className="about-client-vertical">CLIENTS</span>
                        <div className="about-client-title-wrap">
                            <h3 className="about-client-title">{clientsSection.title}</h3>
                        </div>
                        <div className="about-client-grid">
                            {clientsSection.items.map((logo, idx) => (
                                <article key={`${logo.name}-${idx}`} className="about-client-card">
                                    <div className="about-client-media">
                                        <img src={logo.src || "https://dummyimage.com/260x140/f7f7f7/5f6368&text=REAL+ESTATE+COMPANY"} alt={logo.name} />
                                        {clientsSection.showButton && (
                                            clientsSection.buttonLink ? (
                                                <a
                                                    href={clientsSection.buttonLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="about-client-view-btn"
                                                >
                                                    {clientsSection.buttonText}
                                                </a>
                                            ) : (
                                                <button type="button" className="about-client-view-btn">{clientsSection.buttonText}</button>
                                            )
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
            <ScrollButtons />
        </>
    );
}

export default About;
