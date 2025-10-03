// EventsPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
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
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 25px;
  margin: 20px 0;
  max-width: 600px;
  width: 100%;
  text-align: center;
  color: white;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
`;

const EventName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #ffcc80;
`;

const RulesTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #ffd54f;
`;

const RulesList = styled.ul`
  text-align: left;
  margin: 0 auto 20px;
  padding: 0 20px;
  line-height: 1.6;
  list-style-type: disc;
`;

const RuleItem = styled.li`
  margin-bottom: 6px;
`;

const SlotInfo = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${(props) => (props.full ? "#ff4e50" : "#00e676")};
`;

const RegisterButton = styled.button`
  display: inline-block;
  background: #ff9800;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #e68900;
  }

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

const EventsPage = () => {
  const navigate = useNavigate();
  const GAS_URL = "https://script.google.com/macros/s/AKfycbzxqHJfae-G6T-Qq0i1egMxcqBpReHYEmkbDdbSESS4S38nRC89INC5bZfrfeoLwpgf6Q/exec"; 

  // Default event setup
  const [events, setEvents] = useState([
    {
      name: "Paper Presentation",
      rules: [
        "Maximum 2 participants per team",
        "Time limit: 8 minutes + 2 minutes Q&A",
        "Plagiarism is strictly prohibited",
        "Bring your presentation in PPT/PDF format",
      ],
      totalSlots: 15,
      slotsFilled: 0,
    },
    {
      name: "Coding Contest",
      rules: [
        "Individual participation only",
        "3 problem statements, 90 minutes duration",
        "Use of internet strictly prohibited",
        "Any programming language is allowed",
      ],
      totalSlots: 15,
      slotsFilled: 0,
    },
  ]);

  // Fetch slots data from Google Sheets
  useEffect(() => {
    fetch(GAS_URL + "?action=getSlots")
      .then((res) => res.json())
      .then((data) => {
        // Data should be something like: { "Paper Presentation": 10, "Coding Contest": 7 }
        setEvents((prevEvents) =>
          prevEvents.map((event) => ({
            ...event,
            slotsFilled: data[event.name] || 0,
          }))
        );
      })
      .catch((err) => console.error("Error fetching slots:", err));
  }, []);

  const handleRegister = (eventName) => {
    navigate("/register", { state: { eventName } });
  };

  return (
    <PageWrapper>
      <Title>Our Events</Title>
      {events.map((event, index) => {
        const isFull = event.slotsFilled >= event.totalSlots;
        return (
          <EventCard key={index}>
            <EventName>{event.name}</EventName>
            <RulesTitle>Rules:</RulesTitle>
            <RulesList>
              {event.rules.map((rule, i) => (
                <RuleItem key={i}>{rule}</RuleItem>
              ))}
            </RulesList>

            {/* Slot Info */}
            <SlotInfo full={isFull}>
              Slots Filled: {event.slotsFilled} / {event.totalSlots}
            </SlotInfo>

            {/* Register Button */}
            <RegisterButton onClick={() => handleRegister(event.name)} disabled={isFull}>
              {isFull ? "Slots Full" : "Register"}
            </RegisterButton>
          </EventCard>
        );
      })}
    </PageWrapper>
  );
};

export default EventsPage;
