import React from "react";
import { useNavigate } from "react-router";
//import { BiPowerOff } from "react-icons/bi";

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import styled from "styled-components";
//import axios from "axios";
//import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY)
    )._id;
    //const data = await axios.get(`${logoutRoute}/${id}`);
     const data = await fetch(`http://localhost:5000/api/login/logout/${id}/`, {
         method: "GET",
    })
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <PowerSettingsNewIcon />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
