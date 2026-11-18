import "./AboutPage.css";
import Hero from './Hero'
import Team from './Team';
import People from './People';
function About() {
    return (
      <main className="about-page">
       <Hero />
        <Team/>
        <People/>
      </main>
    );
}

export default About;