import React from "react";
import BlogCard from "../../Component/BlogCard";
import Sidebar from "../../Component/Sidebar";






function Portfolio() {

    const posts = [
        {
            id: 1,
            title: "Creating quality urban lifestyles, building stronger communities.",
            date: "28 Sep 2024",
            comments: 4,
            image: "/images/blog1.jpg",
            excerpt: "Adaptogen, biodiesel, stumptown copper mug distillery. Poke activated charcoal bushwick pour-over..."
        },
        {
            id: 2,
            title: "When it comes to your house, don’t mess with the best.",
            date: "25 Sep 2024",
            comments: 6,
            image: "/images/blog2.jpg",
            excerpt: "Sustainable fashion biodiesel, adaptogen man braid keytar woke offal flexitarian brunch..."
        },
        {
            id: 3,
            title: "Making your vision come true, that is what we do.",
            date: "22 Sep 2024",
            comments: 2,
            image: "/images/blog3.jpg",
            excerpt: "Kale chips fam, slow-carb vinyl small batch enamel pin palo santo brunch hammock narwhal..."
        }
    ];
    return (
        <>
            <div className="container">
                <main className="content">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </main>
                <Sidebar />
            </div>
        </>
    )
}

export default Portfolio
