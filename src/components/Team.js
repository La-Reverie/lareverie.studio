import React, { useRef, useEffect, useState } from "react";
import jon from "../images/team/jon.jpg";
import javier from "../images/team/javier.jpg";
import jonglass from "../images/team/jon-glass.jpg";
import bhaskar from "../images/team/bhaskar.jpg";
import lorenzo from "../images/team/lorenzo.jpg";
import bharti from "../images/team/bharti.jpg";
import kennedy from "../images/team/kennedy.jpg";

function TeamMember({ member }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTouched, setIsTouched] = useState(false); // New state for touch

  useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        let bounds;

        const rotateToMouse = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2,
            };

            const rotationX = center.y / 50;
            const rotationY = -center.x / 50;

            card.style.transform = `
        perspective(1000px) 
        rotateX(${rotationX}deg) 
        rotateY(${rotationY}deg)
      `;
            card.querySelector('.glow').style.backgroundImage = `
        radial-gradient(
          circle at ${center.x * 2 + bounds.width / 2}px 
          ${center.y * 2 + bounds.height / 2}px,
          #ffffff55,
          #0000000f
        )
      `;
        };


        const handleMouseEnter = () => {
            setIsHovered(true) // Set isHovered to true when mouse enters
          card.style.transition = 'transform 150ms ease-out';
            bounds = card.getBoundingClientRect();
            document.addEventListener('mousemove', rotateToMouse);
        };

        const handleMouseLeave = () => {
           setIsHovered(false) // Set isHovered to false when mouse leaves
           card.style.transition = 'transform 300ms ease-out';
            document.removeEventListener('mousemove', rotateToMouse);
            card.style.transform = '';
        };


        // Touch event handlers
        const handleTouchStart = (e) => {
          setIsTouched(true); // Set isTouched to true on touch start
          e.preventDefault() // prevent default touch behavior
          card.style.transition = 'transform 150ms ease-out';
           bounds = card.getBoundingClientRect();
           rotateToMouse(e.touches[0])
           document.addEventListener('touchmove', handleTouchMove);
        };

        const handleTouchMove = (e) => {
            if(isTouched) {
                e.preventDefault() // prevent default touch behavior
               rotateToMouse(e.touches[0])
            }
           
        };

        const handleTouchEnd = () => {
            setIsTouched(false)
            card.style.transition = 'transform 300ms ease-out';
            document.removeEventListener('touchmove', handleTouchMove)
           card.style.transform = '';

        };


        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('touchstart', handleTouchStart);
        card.addEventListener('touchend', handleTouchEnd);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.removeEventListener('touchstart', handleTouchStart);
            card.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('touchmove', handleTouchMove)

        };
    }, [isTouched]);


    return (
        <article
            ref={cardRef}
            className="card bg-blue-950 border-4 border-blue-950 hover:shadow-lg hover:shadow-gray-950 rounded-lg overflow-hidden transition-all my-10 relative"
        >
            <div className="relative">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold drop-shadow-md text-center px-4">
                  </h3>
                     {/* Name with fade in */}
                     <span
                      className={`absolute top-[50%] md:top-0 inset-0 flex items-center justify-center text-white text-3xl font-semibold drop-shadow-md text-center px-4 transition-opacity duration-300 ${
                      isHovered || isTouched ? 'opacity-100' : 'opacity-0'
                        }`}
                     >
                      {member.name}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h4 className="text-gray-300 text-lg leading-tight font-medium mb-2">
                    {member.title}
                </h4>
                <p className="text-gray-400 leading-normal">{member.bio}</p>
            </div>
            <div className="glow"></div>
        </article>
    );
}

function Team() {
  const teamMembers1 = [
    {
      name: "Jon Caveman",
      title: "Founder",
      image: jon,
      bio: "All roads lead to here. Jon's goal is to preserve what gets lost between big ideas and technological limitations. Jon infuses more than three decades of coding experience into his creative process. With a career spanning advertising, big tech, and a stint as a rock radio DJ, Jon's imagination knows no limit.",
    },
    {
      name: "Javier Cabrera",
      title: "Co-founder, Design & Development",
      image: javier,
      bio: "Javier transforms whimsical ideas into digital experiences. His multifaceted background in writing, illustration, and web development allow him to combine artistic vision with technical proficiency and lead our most innovative design projects.",
    },
    {
      name: "Kennedy Vasquez",
      title: "Digital Marketing",
      image: kennedy,
      bio: "Kennedy is a digital native and his passion is connecting people and ideas. From online community management for a newspaper in Ciudad Guayana, Venezuela to digital marketing at ad agencies in Buenos Aires, Argentina, Kennedy brings the perfect combination of marketing and technical know-how to the La Reverie team. When he's not brainstorming the next big campaign, Kennedy enjoys staying up-to-date with the latest digital trends and fostering connections in the online space.",
    },
    {
      name: "Bharti Batra",
      title: "Quality Assurance",
      image: bharti,
      bio: "(coming soon)",
    },
  ];

    const teamMembers2 = [
        {
            name: "Lorenzo Castillo",
            title: "Co-founder, Engineering",
            image: lorenzo,
            bio: "Lorenzo started as a self-taught programmer while studying pre-med. By the time he graduated, Lorenzo had a degree in computer science and was ready to embark on a 10-year career as a software engineer, working at Google Search, LinkedIn and Airbnb. He holds a patent in augmented reality systems for user-controlled movement of wireless-connected objects. Ask Lorenzo about the home he built for himself in South Florida.",
        },
        {
            name: "Jon Glass",
            title: "Co-founder, Innovation",
            image: jonglass,
            bio: "Jon Glass is a software engineer with an artistic heart. He built a diverse skill set as a professional skateboard photographer, game coder and painter. Jon approaches development with artistic sensibility and an eye for detail.",
        },
        {
            name: "Bhaskar Ch",
            title: "Product Management",
            image: bhaskar,
            bio: "Bhaskar is a Business Analyst turned Product Manager with an MBA from Wayne State University. He is adept at aligning business objectives with technical execution, levering his analytical skills to drive impactful product strategies. Bhaskar's expertise lies in transforming complex business requirements into actionable roadmaps for product development.",
        },
    ];

    return (
        <section className="bg-gray-900 relative w-full min-h-screen py-16">
            <div id="team" className="anchor absolute -top-24" aria-hidden="true"></div>
            <div className="container mx-auto flex flex-col lg:flex-row">
                {/* Left Column - Intro */}
                <div className="w-full lg:w-1/2 p-8 md:sticky top-16 self-start">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8 relative">
                        <span className="relative z-10 text-white">
                            Our Team
                        </span>
                        
                    </h2>
                    <p className="text-gray-300 text-2xl leading-relaxed">
                        Our team is a diverse and talented group of individuals dedicated to
                        building incredible digital experiences. With a blend of creative
                        vision and technical prowess, we strive to push the boundaries of
                        what is possible.
                    </p>
                </div>

                {/* Right Column - Team Grid */}
                <div className="w-full lg:w-3/2 2xl:w-1/2 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* First Row of Team Members */}
                    <div className="-mt-16">
                        {teamMembers1.map((member, index) => (
                            <TeamMember key={index} member={member} />
                        ))}
                    </div>
                    {/* Second Row of Team Members */}
                    <div>
                        {teamMembers2.map((member, index) => (
                            <TeamMember key={index} member={member} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Team;