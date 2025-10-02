// Home.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  overflow-y: auto;
  overflow-x: hidden;
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
  box-sizing: border-box;
  padding: 0 20px;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 0 10px;
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

const HeroButton = styled(motion.button)`
  padding: 12px 25px;
  margin-top: 5px;
  margin-bottom: 60px;
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
    padding: 10px 20px;
    font-size: 0.9rem;
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

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // 🔹 Registration Slots State
  const [registrations, setRegistrations] = useState(0);
  const totalSlots = 15;

  const handleRegister = () => {
    if (registrations < totalSlots) {
      setRegistrations(registrations + 1);
      navigate("/Register"); // keep existing navigation
    }
  };

  return (
    <>
      {/* Background Video */}
      <VideoBackground autoPlay loop muted playsInline preload="auto" poster="/Poster.png">
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>

      {/* Page Content */}
      <PageWrapper>
        {/* Hero Section */}
        <Section>
          {/* Header */}
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              marginTop: "40px",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <GtecLogo src="/gtec.jpeg" alt="GTEC Logo" whileHover={{ scale: 1.05 }} />
              <HeroTitle>Ganadipathy Tulsi's Jain Engineering College</HeroTitle>
            </div>
            <h6
              style={{
                color: "#ffffff",
                fontSize: "0.75rem",
                margin: "0px",
                marginLeft: "70px",
                marginTop: "-10px",
                fontFamily: "Times New Roman, Times, serif",
              }}
            ><br/>
              Chittoor Cuddalore Road, Kaniyambadi Vellore - 632102
            </h6>
            <h6
              style={{
                fontSize: "1rem",
                lineHeight: 1,
                margin: "15px 0",
                fontFamily: "Times New Roman, Times, serif",
                textAlign: "center",
                color: "#ffe600",
              }}
            >
              The Department of IT, AIDS & CSBS <br />
              proudly presents
            </h6>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              flexWrap: "wrap",
              margin: "0px auto",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <HeroSubtitle style={{ fontSize: "1.5rem", margin: "0px" }}>
              National Level <br /> Technical Symposium
            </HeroSubtitle>
            <AnniversaryLogo src="/25year.png" alt="25 Years Celebration" whileHover={{ scale: 1.05 }} />
          </motion.div>

          {/* Event Title */}
          <HeroSubtitle
            style={{
              fontSize: "3rem",
              background: "linear-gradient(45deg, #f9d423, #ff4e50)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0px auto 2px auto",
              lineHeight: 1,
            }}
          >
            Pinnacle 25
          </HeroSubtitle>

          <h6
            style={{
              color: "white",
              fontSize: "0.9rem",
              lineHeight: 1.1,
              margin: "0px 0 -30px 0",
              fontFamily: "Times New Roman, Times, serif",
              textAlign: "center",
            }}
          >
            A Summit of IT, AI & Business System
          </h6>
{/* Paper Presentation - Modern Designer Style */}
<motion.div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
    marginTop: "40px",
    textAlign: "center",
    padding: "0 10px",
  }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  {/* Elegant Heading */}
  <h3
    style={{
      margin: 0,
      fontSize: "2rem",
      fontWeight: "900",
      color: "yellow",
      letterSpacing: "1px",
      textTransform: "uppercase",
    }}
  >
    📄 Paperenza
  </h3>

 {/* Date & Time - Pill Style */}
<div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
  <span
    style={{
      padding: "5px 12px",
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.1)",
      color: "#ffe600",
      fontWeight: "600",
      fontSize: "0.95rem",
      transition: "0.3s",
    }}
  >
    📅 {today}
  </span>
  <span
    style={{
      padding: "5px 12px",
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.1)",
      color: "#00d4ff",
      fontWeight: "600",
      fontSize: "0.95rem",
      transition: "0.3s",
    }}
  >
    ⏰ 3:00 PM
  </span>
</div>

</motion.div>


          {/* Countdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 3 }}>
            <CountdownTimer />
          </motion.div>

          {/* Slots Info */}
          <motion.div
            style={{
              marginTop: "15px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#ff4e50",
              textShadow: "0 0 6px #ff4e50",
              textAlign: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ Only first 15 registrations allowed!
          </motion.div>

          {/* Register Button */}
          <motion.div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <HeroButton
              onClick={handleRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={registrations >= totalSlots}
              style={{
                opacity: registrations >= totalSlots ? 0.6 : 1,
                cursor: registrations >= totalSlots ? "not-allowed" : "pointer",
              }}
            >
              {registrations >= totalSlots ? "Slots Full" : "📝 Register Now"}
            </HeroButton>
          </motion.div>
        </Section>
      </PageWrapper>
    </>
  );
}
