import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff9800;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 25px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  text-align: center;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 22px 18px;
  }
`;

const EventName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: orange;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #ffd54f;
`;

const RulesList = styled.ul`
  text-align: left;
  margin: 0 auto 20px;
  padding: 0 15px;
  line-height: 1.5;
  list-style-type: disc;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;

const RuleItem = styled.li`
  margin-bottom: 8px;
`;

const RegisterButton = styled.button`
  display: inline-block;
  background: #ff9800;
  color: white;
  padding: 12px 28px;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  align-self: center;

  &:hover {
    background: #e68900;
  }

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

const ContactSection = styled.div`
  margin-top: 40px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 25px 40px;
  color: #fff;
  font-size: 1rem;
  line-height: 1.6;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  max-width: 420px;
  width: 90%;
  box-sizing: border-box;

  a {
    color: #ff9800;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    width: 65%;
    font-size: 1rem;
    border-radius: 14px;
  }
`;

// --- Main Component ---
const EventsPage = () => {
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);

  const endDate = new Date("2025-10-07T11:59:59");

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      setIsClosed(now >= endDate);
    };

    const interval = setInterval(checkTime, 1000);
    checkTime();
    return () => clearInterval(interval);
  }, [endDate]);

  const event = {
    name: "Coding & Debugging",
    rules: [
      "Individual / Team (Max Two Students).",
      "Total of Three rounds will be conducted.",
      "Preliminary Round (Round 1) will be held during the lunch break at 12:40 PM in the laboratory. All participants are requested to be present on time.",
      "Judges' decision will be final.",
    ],
    formPath: "/register",
  };

  const handleRegister = () => {
    if (!isClosed) navigate(event.formPath, { state: { eventName: event.name } });
  };

  return (
    <PageWrapper>
      <Title>Our Event</Title>

      <EventCard>
        <div>
          <EventName>{event.name}</EventName>
          <SectionTitle>Rules :</SectionTitle>
          <RulesList>
            {event.rules.map((rule, i) => (
              <RuleItem key={i}>{rule}</RuleItem>
            ))}
          </RulesList>
        </div>

        <RegisterButton onClick={handleRegister} disabled={isClosed}>
          {isClosed ? "Registration Closed" : "Register"}
        </RegisterButton>
      </EventCard>

      <ContactSection>
        <p>For any queries, contact :</p>
        <p>Dinesh K R</p>
        <p>📞 +91 99447 94910</p>
      </ContactSection>
    </PageWrapper>
  );
};

export default EventsPage;
