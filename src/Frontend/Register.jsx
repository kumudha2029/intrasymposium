// Register.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

// ===== Styled Components =====
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
  overflow-y: auto; position: relative;
`;
const FormWrapper = styled.div`
  width: 100%; max-width: 500px;
  padding: 30px 20px; border-radius: 16px; color: #fff;
  backdrop-filter: blur(8px); background: rgba(0,0,0,0.3);
  box-sizing: border-box; margin-top: 60px;
`;
const Title = styled.h1`
  text-align: center; margin-bottom: 20px;
  color: #ffeb3b; font-family: "Snap ITC", cursive, sans-serif;
  font-size: 2rem;
`;
const Label = styled.label`display: block; margin-bottom: 5px; font-weight: bold;`;
const Input = styled.input`width: 100%; padding: 10px; margin-bottom: 20px; border-radius: 6px; border: none;`;
const Select = styled.select`width: 100%; padding: 10px; margin-bottom: 20px; border-radius: 6px; border: none;`;
const Button = styled.button`
  padding: 12px 20px; border: none; border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #fff; font-weight: bold; cursor: pointer;
  width: 100%; margin-bottom: 15px; transition: 0.3s;
  &:hover { transform: scale(1.05); background: linear-gradient(45deg, #f9d423, #ff4e50); }
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
  padding: 20px; color: #fff; max-width: 500px; width: 100%; margin-top: 80px;
`;
const CongratsTitle = styled.h1`
  color: yellow; font-size: 2rem; margin-bottom: 15px; font-family: "Snap ITC", cursive, sans-serif;
`;
const CongratsText = styled.p`color: white; font-size: 1.2rem;`;

// ===== Component =====
export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const eventName = location.state?.eventName || "General";

  const GAS_URL = "https://script.google.com/macros/s/AKfycby5i4r2WtUh-xllx7Hr590vL8I4AGhqxpHbDawPWexxXBDcn-9sOAuzLrfTZkwUOUf7/exec";

  const [formData, setFormData] = useState({
    name: "", email: "", gender: "", degree: "", branch: "", year: "", phone: "",
  });
  const [status, setStatus] = useState(false); // false | "loading" | "success"
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("loading");

    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({ ...formData, eventName, formType: "form1" }),
      });
      const json = await res.json();
      if (json.status === "success") {
        setStatus("success");
      } else {
        setStatus(false);
        setError(json.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setStatus(false);
      setError("Failed to connect to Google Sheets");
    }
  };

  return (
    <PageWrapper>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>
      <Overlay />
      <BackButton onClick={() => navigate(-1)}>⬅ Back</BackButton>

      {status === false ? (
        <FormWrapper>
          <Title>Event Registration - {eventName}</Title>
          <form onSubmit={handleSubmit}>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required multiple />
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
            <Input name="phone" value={formData.phone} onChange={handleChange} required />
            <Button type="submit">Register</Button>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          </form>
        </FormWrapper>
      ) : status === "loading" ? (
        <CongratsBox>
          <CongratsTitle>⏳ Registering...</CongratsTitle>
          <CongratsText>Please wait while we confirm your registration.</CongratsText>
        </CongratsBox>
      ) : (
        <CongratsBox>
          <CongratsTitle>🎉 Congratulations {formData.name}!</CongratsTitle>
          <CongratsText>
            You have successfully registered for <strong>{eventName}</strong> on <span style={{ color: "yellow" }}>Pinnacle 25</span>.
          </CongratsText>
        </CongratsBox>
      )}
    </PageWrapper>
  );
}
