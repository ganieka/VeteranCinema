import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { addMovie } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: scale-down;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-size: 40px;
  font-weight: 100;
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Movie = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [movie, setMovie] = useState({ size: [], color: [] });
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "dec") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    } else {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await publicRequest.get("/movies/" + id);
        setMovie(res.data);
      } catch (error) {}
    };
    getMovie();
  }, [id]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImageContainer>
          <Image src={movie.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{movie.name}</Title>
          <Desc>{movie.description}</Desc>
          <Price>Rp 50.000 / Ticket</Price>
          <AddContainer>
            <Link to={`/movie/${id}/order-tickets`}>
                <Button>ORDER TICKETS</Button>
            </Link>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Movie;
