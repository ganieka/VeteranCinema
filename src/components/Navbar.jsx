import React from "react";
import styled from "styled-components";
import { Badge } from "@mui/material";
import { ShoppingCartOutlined, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  background-color: white;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const Center = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    logout(dispatch)
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Veteran Cinema</Logo>
        </Center>
        <Right>
          <Link to={"/"} style={{textDecoration: "none", color: "black"}}>
            <MenuItem>HOME</MenuItem>
          </Link>
          <Link to={"/movies"} style={{textDecoration: "none", color: "black"}}>
            <MenuItem>MOVIES</MenuItem>
          </Link>
          <Link to={"/orders"} style={{textDecoration: "none", color: "black"}}>
            <MenuItem>ORDERS</MenuItem>
          </Link>
          <Link onClick={handleClick} to={"/login"} style={{textDecoration: "none", color: "black"}}>
            <MenuItem>LOGOUT</MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
