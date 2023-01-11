import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
`;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #edf2f6;
`;

const ImgContainer = styled.div`
  height: 80%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
  object-fit: scale-down;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 20px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Jumbotron = () => {
  return (
    <Container>
      <Wrapper>
          <Content>
            <ImgContainer>
              <Image src="img/avatar2-poster.jpg" />
            </ImgContainer>
            <InfoContainer>
              <Title>Watch High Quality Movies</Title>
              <Description>Released in 2023. Now you can watch movies with yout friends in high quality with fast bookings
                 and easy payments as well as enjoying food and beverages that can satisfies your appetite</Description>
              <Link to={"/movies"}>
                <Button>SEE MOVIES</Button>
              </Link>  
            </InfoContainer>
          </Content>
      </Wrapper>
    </Container>
  );
};

export default Jumbotron;
