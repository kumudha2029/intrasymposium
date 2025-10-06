// Register.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

// ===== Styled Components =====
const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;      
  justify-content: center;  
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom:100px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 30px 20px;
  border-radius: 16px;
  color: #fff;
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
   margin-top:100px;
   gap:-5px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #ffeb3b;
  font-family: "Snap ITC", cursive, sans-serif;
  font-size: 1.8rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin-left:20px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 0 auto 20px auto;
  border-radius: 6px;
  border: none;
  display: block;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  max-width: 400px;
  padding: 12px;
  margin: 0 auto 20px auto;
  border-radius: 6px;
  border: none;
  display: block;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  margin: 10px auto 15px auto;
  border: none;
  border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  display: block;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #f9d423, #ff4e50);
  }
`;

const BackButton = styled.button`
  position: fixed;     /* stays on top-right of screen */
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(45deg, #ff4e50, #f9d423);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;        /* above everything */
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #f9d423, #ff4e50);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.85rem;
  }
`;

const CongratsBox = styled.div`
  text-align: center;
  font-family: "Poppins", sans-serif;
  padding: 20px;
  color: #fff;
  max-width: 500px;
  width: 100%;
`;

const CongratsTitle = styled.h1`
  color: yellow;
  font-size: 2rem;
  margin-bottom: 15px;
  font-family: "Snap ITC", cursive, sans-serif;
`;

const CongratsText = styled.p`
  color: white;
  font-size: 1.2rem;
`;

// ===== Component =====
export default function RegistrationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const eventName = location.state?.eventName || "Coding & Debugging";

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbys6fGraE2nizqul2c6Kj3H6PXVpPcLqA8Vh98umDTqPMnIFKN5BF80x7vZvvoz2ETQ/exec";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    degree: "",
    branch: "",
    year: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(true);

    try {
      const response = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({ ...formData, eventName, formType: "form1" }),
      });

      const resultJson = await response.json();

      if (resultJson.status !== "success") {
        setSubmitted(false);
        const message =
          typeof resultJson.message === "string"
            ? resultJson.message
            : JSON.stringify(resultJson.message);
        setError(message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setSubmitted(false);
      setError("Error connecting to Google Sheets!");
    }
  };

  return (
    <>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/BackgroundVideo.mp4" type="video/mp4" />
      </VideoBackground>
      <Overlay />

      {/* Fixed Back Button */}
      <BackButton onClick={() => navigate(-1)}>⬅ Back</BackButton>

      <PageWrapper>
        {!submitted ? (
          <FormWrapper>
            <Title>Event Registration - {eventName}</Title>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Participant 1 , Participant 2"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Label>Email(College Email Only)</Label>
              <Input
                type="email"
                name="email"
                placeholder="Paricipant 1 email , Participant 2 email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Label>Gender</Label>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>

              <Label>Degree</Label>
              <Select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
              >
                <option value="">Select Degree</option>
                <option value="B.E">B.E</option>
                <option value="B.Tech">B.Tech</option>
              </Select>

              <Label>Branch</Label>
              <Select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select Branch</option>
                <option value="AI & DS">AI & DS</option>
                <option value="CS & BS">CS & BS</option>
                <option value="IT">IT</option>
              </Select>

              <Label>Year</Label>
              <Select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </Select>

              <Label>Phone</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <Button type="submit">Register</Button>
              {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            </form>
          </FormWrapper>
        ) : (
          <CongratsBox>
            <CongratsTitle>🎉 Congratulations {formData.name}!</CongratsTitle>
            <CongratsText>
              You have successfully registered on{" "}
              <span style={{ color: "yellow", fontWeight: "bold" }}>Pinnacle 25</span>{" "}
              for <strong>{eventName}</strong>.
            </CongratsText>
          </CongratsBox>
        )}
      </PageWrapper>
    </>
  );
}
