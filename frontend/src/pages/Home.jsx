import React from 'react'
import './Home.css'
import profileImage from '../assets/profile.png'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import DeveloperCard from '../components/DeveloperCard';

function Home() {
  return (
    <section className="home" id="home">
      <div className="neon-grid"></div>

      <div className="home-content">
 
        <motion.div
          className="image-wrapper"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <img src={profileImage} alt="Tushar" className="profile-img" />
        </motion.div>

        <motion.div
          className="text"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Hi, I’m <span className="neon">Tushar Sharma</span> 👋👋
            <br />
            <span className="typewriter-text">
              <Typewriter
                words={['Android Developer', 'Web Developer', 'Problem Solver']}
                loop
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>
          <p className="subtitle">Android & Web Developer | Building Real-World Apps</p>

          <div className="btn-group">
            <a href="#projects" className="btn-glow">🚀 See My Work</a>
            <a href="/TusharSharma.pdf" download className="btn-glow outline">
              📄 Resume
            </a>
          </div>
        </motion.div>
        <DeveloperCard />
        
      </div>
    </section>
  )
}

export default Home
