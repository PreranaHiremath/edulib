import React from 'react';
import "./About.css";
import aboutImg from "../../images/aboutUs.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About E-Library</h2>
            <p className='fs-17'>Welcome to the Educational Resource Library – your one-stop destination for high-quality learning materials designed to support students, educators, and lifelong learners across the globe.

We believe education should be accessible, engaging, and personalized. That’s why we created this platform to bring together a rich collection of educational videos, books, articles, and tools to make learning easier, smarter, and more interactive.

Our platform is built to help users:

🔍 Search and discover top-rated educational resources across various subjects.

🌟 Rate and review content to help others make informed choices.

📚 Save and share your favorite materials with peers or educators.

📈 Receive personalized recommendations based on your learning goals and interests.

</p>
            <p className='fs-17'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, dicta, possimus inventore eveniet atque voluptatibus repellendus aspernatur illo aliquam dignissimos illum. Commodi, porro omnis dolore amet neque modi quas eum!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About