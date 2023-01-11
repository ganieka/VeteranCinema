import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import Movies from "../components/Movies";

const Container = styled.div``;

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

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  display: flex;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const MoviesList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  return (
    <Container>
      <Navbar />
      <Title>Movies List</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Search Movies:</FilterText>
          <SearchContainer>
            <Input onChange={(e) => setFilter(e.target.value)} />
            <Search style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Filter>
      </FilterContainer>
      <Movies category={category} filters={filter} sort={sort} />
    </Container>
  );
};

export default MoviesList;
