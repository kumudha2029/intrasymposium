// RegistrationPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ---------- Styled Components ----------
const VideoBackground = styled.video`
  position: fixed; top: 0; left: 0;
  width: 100vw; height: 100vh;
  object-fit: cover; z-index: -2;
`;

const Overlay = styled.div`
  position: fixed; top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5); z-index: -1;
`;

const PageWrapper = styled.div`
  width: 100vw; min-height: 100vh;
  display: flex; flex-direction: column; align-items: center;
  overflow-y: auto; scroll-behavior: smooth; position: relative;
`;

const FormWrapper = styled.div`
  width: 100%; max-width: 500px;
  padding: 30px 20px; border-radius: 16px; color: #fff;
  backdrop-filter: blur(8px); background: rgba(0,0,0,0.3);
  box-sizing: border-box; overflow-y: auto; max-height: 90vh;
  margin-top: 60px;
`;

const Title = styled.h1`
  text-align: center; margin-bottom: 20px;
  color: #ffeb3b; font-family: "Snap ITC", cursive, sans-serif;
  font-size: 2rem;
`;

const Label = styled.label`display: block; margin-bottom: 5px; font-weight: bold;`;
const Input = styled.input`width: 100%; padding: 10px; margin-bottom: 20px; border-radius: 6px; border: none; box-sizing: border-box;`;
const Select = styled.select`width: 100%; padding: 10px; margin-bottom: 20px; border-radius: 6px; border: none; box-sizing: border-box;`;

const Button = styled.button`
  padding: 12px 20px; border: none; border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #fff; font-weight: bold; cursor: pointer;
  width: 100%; margin-bottom: 15px; transition: 0.3s;
  &:hover { transform: scale(1.05); background: linear-gradient(45deg, #f9d423, #ff4e50); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const BackButton = styled.button`
  position: absolute; top: 20px; right: 40px;
  padding: 10px 15px; border: none; border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #fff; font-weight: bold; cursor: pointer; z-index: 2;
  &:hover { transform: scale(1.05); background: linear-gradient(45deg, #f9d423, #ff4e50); }
`;

const CongratsBox = styled.div`
  text-align: center; font-family: "Poppins", sans-serif;
  padding: 20px; color: #0a2fc5ff; max-width: 500px; width: 100%; margin-top: 80px;
`;

const CongratsTitle = styled.h1`color: yellow; font-size: 2rem; margin-bottom: 15px; font-family: "Snap ITC", cursive, sans-serif;`;
const Eventname = styled.h1`color: yellow; font-size: 1.2rem; margin-bottom: 15px; font-family: "Snap ITC", cursive, sans-serif;`;
const CongratsText = styled.p`color: white; font-size: 1.2rem;`;

const ProgressBar = styled.div`width: 100%; height: 12px; border-radius: 6px; background: #333; overflow: hidden; margin-bottom: 15px;`;
const ProgressFill = styled.div`
  height: 100%; width: ${(props) => props.percentage}%;
  background: #2cc0d6; transition: width 0.4s;
`;

// ---------- Component ----------
export default function RegistrationPage() {
  const navigate = useNavigate();
  const totalSlots = 15;
  const GAS_URL = "https://script.google.com/macros/s/AKfycbwe2QMe7nfbuBTBOo6rpbGteyTb8arzyZytEMjSyT6GSFSvkAw_zwww2wg10Brv6dvJDw/exec"; // keep your GAS URL here

  const [slotsFilled, setSlotsFilled] = useState(0);
  const [formData, setFormData] = useState({
    name: "", email: "", gender: "", degree: "", branch: "", year: "", phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Fetch slots on load
  useEffect(() => {
    fetch(GAS_URL + "?action=count")
      .then(res => res.json())
      .then(data => setSlotsFilled(data.slotsFilled || 0))
      .catch(err => console.error("Error fetching slots:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (slotsFilled >= totalSlots) return alert("All slots are filled!");

    try {
      const params = new URLSearchParams({ action: "register", ...formData });
      const response = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "success") {
        setSubmitted(true);
        setSlotsFilled(prev => prev + 1);
      } else {
        alert("Error: " + (result.message || "Something went wrong"));
      }

    } catch (err) {
      console.error(err);
      alert("Error connecting to Google Sheets!");
    }
  };

  return (
    <PageWrapper>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>
      <Overlay />
      <BackButton onClick={() => navigate("/")}>⬅ Back</BackButton>

      {!submitted ? (
        <FormWrapper>
          <Title>Event Registration</Title>
          <p style={{ textAlign: "center", color: "#00d4ff", fontWeight: "600" }}>
            Slots Filled: {slotsFilled} / {totalSlots}
          </p>
          <ProgressBar>
            <ProgressFill percentage={(slotsFilled / totalSlots) * 100} />
          </ProgressBar>

          <form onSubmit={handleSubmit}>
            <Label>Name</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <Label>Gender</Label>
            <Select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            <Label>Degree</Label>
            <Select name="degree" value={formData.degree} onChange={handleChange} required>
              <option value="">Select Degree</option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
            </Select>
            <Label>Branch</Label>
            <Select name="branch" value={formData.branch} onChange={handleChange} required>
              <option value="">Select Branch</option>
              <option value="AI & DS">AI & DS</option>
              <option value="CS & BS">CS & BS</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
            </Select>
            <Label>Year</Label>
            <Select name="year" value={formData.year} onChange={handleChange} required>
              <option value="">Select Year</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </Select>
            <Label>Phone</Label>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            <Button type="submit" disabled={slotsFilled >= totalSlots}>
              {slotsFilled >= totalSlots ? "Slots Full" : "Register"}
            </Button>
          </form>
        </FormWrapper>
      ) : (
        <CongratsBox>
          <CongratsTitle>🎉 Congratulations {formData.name}!</CongratsTitle>
          <CongratsText>
            You have successfully registered on <Eventname>Pinnacle 25</Eventname> for Paperenza.
          </CongratsText>
        </CongratsBox>
      )}
    </PageWrapper>
  );
}
