import { useState, useEffect } from "react";
import CustomLoader from "../../Component/CustomeLoader";
import ScrollButtons from "../../Component/ScrollButtons";

function About() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
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

    const features = [
        {
            eyebrow: "HUBSPOT CMS",
            title: "Build your company website using drag-and-drop.",
            copy: "Vestibulum at diam sit amet urna vehicula elementum sed sit amet dui. Venean suscipit tortor eget felis porttitor volutpat.",
            bullets: [
                "Lorem ipsum dolor sit amet",
                "Venean suscipit tortor eget felis",
                "Mauris blandit aliquet elit",
            ],
            image:
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
            align: "left",
        },
        {
            eyebrow: "HUBSPOT CMS",
            title: "Manage your HubSpot website without a developer.",
            copy: "Vestibulum at diam sit amet urna vehicula elementum sed sit amet dui. Venean suscipit tortor eget felis porttitor volutpat.",
            image:
                "https://images.unsplash.com/photo-1529336953121-4b1d67b63f58?q=80&w=1200&auto=format&fit=crop",
            align: "right",
        },
        {
            eyebrow: "HUBSPOT CMS",
            title: "A HubSpot website theme that's easy to use.",
            copy: "Vestibulum at diam sit amet urna vehicula elementum sed sit amet dui. Venean suscipit tortor eget felis porttitor volutpat.",
            image:
                "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200&auto=format&fit=crop",
            align: "left",
        },
    ];
    const banners = [
        {
            image:
                "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1200&auto=format&fit=crop",
            align: "left",
        }
    ]

    return (
        <>
            <div className="main-wrapper">
                <div className="about_page">
                    <section id="about" className="relative">
                        {banners.map((b, i) => (<div className="relative mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
                            <div key={i} className="overflow-hidden bg-cover bg-center">
                                <img
                                    src={b.image}
                                    alt="feature"
                                    className="w-full object-cover "
                                />
                                <div className="background-overlay">
                                    <div className="px-6 py-20 sm:py-28 lg:py-36 text-center text-white">
                                        <p className="text-xs uppercase tracking-widest text-white/70">
                                            Home Page
                                        </p>
                                        <h1 className="mx-auto mt-2 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                                            Build and manage your HubSpot website without code.
                                        </h1>
                                        <div className="mt-6">
                                            <a
                                                href="#learn"
                                                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-slate-900 font-medium hover:bg-slate-100"
                                            >
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                    </section>
                    <section className="py-8 sm:py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 gap-8 opacity-70 sm:grid-cols-4 place-items-center">
                                {logos.map((l) => (
                                    <img
                                        key={l.name}
                                        src={l.src}
                                        alt={l.name}
                                        className="h-6 object-contain"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                    {features.map((f, i) => (
                        <section key={i} className="py-12 sm:py-16">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div
                                    className={`grid items-center gap-10 lg:grid-cols-2 ${f.align === "right" ? "lg:[&>*:first-child]:order-2" : ""
                                        }`}
                                >
                                    <div>
                                        <img
                                            src={f.image}
                                            alt="feature"
                                            className="w-full rounded-xl shadow-md object-cover aspect-[4/3]"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold tracking-widest text-indigo-600">
                                            {f.eyebrow}
                                        </p>
                                        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                                            {f.title}
                                        </h2>
                                        <p className="mt-3 text-slate-600 leading-relaxed">
                                            {f.copy}
                                        </p>
                                        {f.bullets && (
                                            <ul className="mt-5 space-y-2 text-slate-700">
                                                {f.bullets.map((b, bi) => (
                                                    <li key={bi} className="flex items-start gap-3">
                                                        <span className="mt-2 h-2 w-2 rounded-full bg-indigo-600"></span>
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className="mt-6">
                                            <a
                                                href="#"
                                                className="inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 text-white shadow hover:bg-indigo-500"
                                            >
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                    <section className="py-16 sm:py-20">
                        <div className="mx-auto max-w-4xl px-4 text-center">
                            <h3 className="text-xl font-semibold sm:text-2xl">
                                Every business deserves to manage their website without code.
                            </h3>
                        </div>
                    </section>
                    <section id="blog" className="py-12 sm:py-16">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <p className="text-xs tracking-widest text-slate-500">
                                    FROM THE BLOG
                                </p>
                                <h3 className="mt-2 text-2xl font-semibold">
                                    Recent Blog Posts
                                </h3>
                                <p className="mt-1 text-slate-600">
                                    Show your most recent blog posts on any website page
                                </p>
                            </div>
                            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.map((p, i) => (
                                    <article
                                        key={i}
                                        className="rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <img
                                            src={p.image}
                                            alt="post"
                                            className="h-48 w-full rounded-t-xl object-cover"
                                        />
                                        <div className="p-4">
                                            <h4 className="font-medium">{p.title}</h4>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <div className="mt-8 text-center">
                                <a
                                    href="#"
                                    className="inline-flex rounded-lg border px-4 py-2.5 hover:bg-slate-50"
                                >
                                    View Posts
                                </a>
                            </div>
                        </div>
                    </section>
                    <section className="py-12 sm:py-16 bg-slate-50">
                        <div className="mx-auto max-w-4xl px-4">
                            <h3 className="text-center text-xl font-semibold">
                                Frequently Asked Questions
                            </h3>
                            <div className="mt-6 space-y-3">
                                {[
                                    "How do we accept payments on our HubSpot website?",
                                    "How do I optimize my website for conversions?",
                                    "What templates are included in this theme?",
                                ].map((q, i) => (
                                    <details
                                        key={i}
                                        className="group rounded-lg border bg-white p-4 open:shadow-sm"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                            <span>{q}</span>
                                            <span className="transition group-open:rotate-180">
                                                ⌄
                                            </span>
                                        </summary>
                                        <p className="mt-3 text-sm text-slate-600">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            In euismod, nunc at sollicitudin volutpat, nunc nunc
                                            facilisis nunc, quis aliquet justo magna vitae ante.
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="py-16 sm:py-20">
                        <div className="mx-auto max-w-4xl px-4 text-center">
                            <blockquote className="text-2xl font-medium sm:text-3xl">
                                “This theme lets our marketers maintain our website without a
                                developer.”
                            </blockquote>
                            <div className="mt-6">
                                <img
                                    src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=300&auto=format&fit=crop"
                                    alt="avatar"
                                    className="mx-auto h-12 w-12 rounded-full object-cover"
                                />
                                <p className="mt-2 text-sm text-slate-600">
                                    Marie Bowen — Marketing Manager, AgilTron Inc.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="bg-indigo-600 py-16 text-white">
                        <div className="mx-auto max-w-5xl px-4 text-center">
                            <h3 className="text-2xl font-semibold sm:text-3xl">
                                Get in touch!
                            </h3>
                            <p className="mt-2 text-white/90">
                                Interested in working together? We’d love to hear from you!
                            </p>
                            <div className="mt-6">
                                <a
                                    href="#"
                                    className="inline-flex rounded-lg bg-white px-5 py-3 font-medium text-slate-900 hover:bg-slate-100"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <ScrollButtons />
        </>
    );
}

export default About;
