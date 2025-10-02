import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// ----- Flip Animation -----
const flip = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(-90deg); }
  100% { transform: rotateX(0deg); }
`;

const TimerWrapper = styled.div`
  display: flex;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 per row */
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* stack vertically */
    gap: 10px;
  }
`;

const TimeBox = styled.div`
  background: linear-gradient(135deg, #ff4e50, #f9d423);
  color: #fff;
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  perspective: 1000px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 15px 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 12px 18px;
  }
`;

const TimeNumber = styled.div`
  display: inline-block;
  animation: ${flip} 0.7s ease-in-out;
`;

const TimeLabel = styled.div`
  font-size: 0.8rem;
  margin-top: 4px;
`;

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const today = new Date();
    const endDate = new Date("2025-10-02T21:59:59");
    const diff = endDate - today;

    if (diff > 0) {
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimerWrapper>
      {timeLeft.days > 0 && (
        <TimeBox>
          <TimeNumber key={timeLeft.days}>{timeLeft.days}</TimeNumber>
          <TimeLabel>Days</TimeLabel>
        </TimeBox>
      )}
      <TimeBox>
        <TimeNumber key={timeLeft.hours}>{timeLeft.hours}</TimeNumber>
        <TimeLabel>Hours</TimeLabel>
      </TimeBox>
      <TimeBox>
        <TimeNumber key={timeLeft.minutes}>{timeLeft.minutes}</TimeNumber>
        <TimeLabel>Minutes</TimeLabel>
      </TimeBox>
      <TimeBox>
        <TimeNumber key={timeLeft.seconds}>{timeLeft.seconds}</TimeNumber>
        <TimeLabel>Seconds</TimeLabel>
      </TimeBox>
    </TimerWrapper>
  );
};

export default CountdownTimer;
