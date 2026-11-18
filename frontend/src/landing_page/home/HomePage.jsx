import Hero from './Hero';
import Award from './Award';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from '../OpenAccount';
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
    useLayoutEffect(() => {
        const context = gsap.context(() => {
            gsap.utils.toArray(".home-reveal").forEach((section) => {
                gsap.from(section, {
                    y: 42,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        once: true
                    }
                });
            });
        });

        return () => context.revert();
    }, []);

    return ( 
       <>
        <Hero/>
        <Award/>
        <Stats/>
        <Pricing/>
        <Education/>
        <OpenAccount/>
     
       </> 
    );
}

export default HomePage;