import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Movie from "./Movie";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Movies = ({ category, filters, sort }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(filters ? `http://localhost:5000/movies?name=${filters}` : `http://localhost:5000/movies`);
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, [filters]);

  useEffect(() => {
    category &&
      setFilteredMovies(
        movies.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value);
          })
        )
      );
  }, [movies, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredMovies((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
    } 
  }, [sort]);

  return <Container>{category ? filteredMovies.map((item) => <Movie item={item} key={item.id} />) : movies.slice(0, 8).map((item) => <Movie item={item} key={item.id} />)}</Container>;
};

export default Movies;
