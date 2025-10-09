// Home.jsx
import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Event from "./Event";
import CountdownTimer from "./CountdownTimer";

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 0;
  background: url("/Poster.png") center center / cover no-repeat;
`;

const PageWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled(motion.section)`
  width: 100%;
  min-height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
  box-sizing: border-box;
  padding: 0px;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 0px;
    gap: 10px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: "Times New Roman", Times, serif;
  font-size: 3rem;
  color: white;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-family: "Cinzel Decorative", serif;
  color: #2cc0d6ff;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const InfoBox = styled(motion.div)`
  background: rgba(0, 0, 0, 0.55);
  padding: 10px 20px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  margin-bottom: 10px;
  text-align: center;
  max-width: 280px;
  color: #ffffff;

  p {
    margin: 3px 0;
    font-size: 0.95rem;
  }

  a {
    color: #ffe600;
    text-decoration: underline;
    font-weight: bold;

    &:hover {
      color: #ff4e50;
    }
  }
`;

const HeroButton = styled(motion.button)`
  padding: 10px 20px;
  margin-top: 2px;
  margin-bottom: 30px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #f9d423, #ff4e50);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
`;

const GtecLogo = styled(motion.img)`
  width: 105px;
  height: auto;

  @media (max-width: 768px) {
    width: 120px;
  }
  @media (max-width: 480px) {
    width: 65px;
  }
`;

const AnniversaryLogo = styled(motion.img)`
  width: 80px;
  height: auto;

  @media (max-width: 768px) {
    width: 65px;
  }
  @media (max-width: 480px) {
    width: 55px;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const eventRef = useRef();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
  <>
    <VideoBackground
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/Poster.png"
    >
      <source src="/BackgroundVideo.mp4" type="video/mp4" />
    </VideoBackground>

    <PageWrapper>
      {/* Hero Section */}
      <Section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Main Content */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
            marginTop: "0px",
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <GtecLogo src="/gtec.jpeg" alt="GTEC Logo" whileHover={{ scale: 1.05 }} />
            <HeroTitle>Ganadipathy Tulsi's Jain Engineering College</HeroTitle>
          </div>
          <h6
            style={{
              color: "#ffffff",
              fontSize: "0.7rem",
              margin: "0px",
              marginLeft: "50px",
              marginTop: "3px",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Chittoor Cuddalore Road, Kaniyambadi Vellore - 632102
          </h6>
          <h6
            style={{
              fontSize: "0.9rem",
              lineHeight: 1,
              margin: "10px 0",
              fontFamily: "Times New Roman, Times, serif",
              textAlign: "center",
              color: "#ffe600",
            }}
          >
            The Department of IT, AIDS & CSBS <br />
            proudly presents
          </h6>
        </motion.div>

        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            flexWrap: "wrap",
            margin: "0px auto",
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <HeroSubtitle style={{ fontSize: "1.3rem", margin: "0px" }}>
            National Level <br /> Technical Symposium
          </HeroSubtitle>
          <AnniversaryLogo src="/25year.png" alt="25 Years Celebration" whileHover={{ scale: 1.05 }} />
        </motion.div>

        <HeroSubtitle
          style={{
            fontSize: "2.5rem",
            background: "linear-gradient(45deg, #f9d423, #ff4e50)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0px auto 4px auto",
            lineHeight: 1,
          }}
        >
          Pinnacle 25
        </HeroSubtitle>

        <h6
          style={{
            color: "white",
            fontSize: "0.85rem",
            lineHeight: 1,
            margin: "0px 0 6px 0",
            fontFamily: "Times New Roman, Times, serif",
            textAlign: "center",
          }}
        >
          A Summit of IT, AI & Business System
        </h6>

        <HeroSubtitle
          style={{
            fontSize: "1.8rem",
            color: "#ffd700",
            textShadow: `
              0 0 6px #ffae00,
              0 0 12px #ffd700,
              0 0 20px #ffea70
            `,
            margin: "4px auto",
            lineHeight: 1.1,
          }}
        >
        Image Generation
        </HeroSubtitle>

        <InfoBox>
          <p>📅 Date: 10th October 2025</p>
          <p>⏰ Time: 11:00 AM</p>
        </InfoBox>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Buttons Section */}
        <motion.div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <HeroButton
            onClick={() => eventRef.current?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Events ↓
          </HeroButton>
        </motion.div>
      </Section>

      {/* Event Section */}
      <Section
        ref={eventRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Event />
      </Section>
    </PageWrapper>
  </>
);
}