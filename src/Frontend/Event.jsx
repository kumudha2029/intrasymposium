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

const EventList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 20px;
  box-sizing: border-box;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 0 16px;
  }
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 25px;
  width: 100%;
  max-width: 380px;
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
    max-width: 97%;
    margin: 0 auto;
    border-radius: 14px;
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

  a {
    color: #ffcc80;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
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
  margin-top: 0px;
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

  const endDate = new Date("2025-10-13T10:29:59");

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      setIsClosed(now >= endDate);
    };

    const interval = setInterval(checkTime, 1000);
    checkTime();
    return () => clearInterval(interval);
  }, [endDate]);

  const [events] = useState([
    {
      name: "Paper Presentation",
      rules: [
        "AI / ML",
        "Cloud and Edge Computing",
        "Cybersecurity",
        "Internet of Things (IoT)",
        "Blockchain",
        "Quantum Computing",
        "AR/VR",
        "Digital Transformation",
        "Business Intelligence and Analytics",
        "Digital Sustainability & Ethics",
        "Future Trends of IT, AI and Business Systemsentation",
        "Individual / Team (Max Two Students).",
        "Participants will be shortlisted based on the submitted abstract",
        "Presentation time: 5 min + <br /> 2 min Q&amp;A",
        'Send your abstract to the following <br /> mail id: <a href="mailto:pinnacle@gtec.ac.in"><strong>pinnacle@gtec.ac.in</strong></a> before 11th-OCT-2025 at 3:00 PM',
      ],
      paperFormat: [
        "Paper : A4",
        "Format : IEEE",
        "Max No of Pages : 10",
        "Line Spacing : 1.5",
        "Font Type : Times New Roman",
        "Font Size : 12",
      ],
      formPath: "/register",
    },
  ]);

  const handleRegister = (event) => {
    if (!isClosed)
      navigate(event.formPath, { state: { eventName: event.name } });
  };

  return (
    <PageWrapper>
      <Title>Our Events</Title>

      <EventList>
        {events.map((event, index) => (
          <EventCard key={index}>
            <div>
              <EventName>{event.name}</EventName>

              {/* Theme Section */}
              <SectionTitle>Topic :</SectionTitle>
              <RulesList>
                {event.rules.slice(0, 11).map((theme, i) => (
                  <RuleItem key={i}>{theme}</RuleItem>
                ))}
              </RulesList>

              {/* Rules Section */}
              <SectionTitle>Rules :</SectionTitle>
              <RulesList>
                {event.rules.slice(11).map((rule, i) => (
                  <RuleItem
                    key={i}
                    dangerouslySetInnerHTML={{ __html: rule }}
                  />
                ))}
              </RulesList>

              {/* Paper Format Section */}
              <SectionTitle>Paper Format :</SectionTitle>
              <RulesList>
                {event.paperFormat.map((format, i) => (
                  <RuleItem key={i}>{format}</RuleItem>
                ))}
              </RulesList>
            </div>

            <RegisterButton
              onClick={() => handleRegister(event)}
              disabled={isClosed}
            >
              {isClosed ? "Registration Closed" : "Register"}
            </RegisterButton>
          </EventCard>
        ))}
      </EventList>

      <ContactSection>
        <p>For any queries, contact:</p>
        <p>Dinesh K R - 📞99447 94910</p>
        <p>JayaPrasanth - 📞93616 56105</p>
      </ContactSection>
    </PageWrapper>
  );
};

export default EventsPage;
