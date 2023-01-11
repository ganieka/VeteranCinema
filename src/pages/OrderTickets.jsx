import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Navbar from '../components/Navbar'
import { publicRequest, userRequest } from '../requestMethods';
import '../style/seats.css'

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const SeatsContainer = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Seats = styled.div`
    display: flex;
    margin-top: 10px;
`;

const Seat = styled.div`
    height: 50px;
    width: 50px;
    border: 1px solid black;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const SelectedSeatsContainer = styled.div`
    padding: 20px;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    justify-content: center;
`

const SelectedSeatsTitle = styled.h2`` 

const SelectedSeats = styled.p ``

const Button = styled.button`
  margin-top : 50px;
  width: 10%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const TotalPriceTitle = styled.h2`
    margin-top: 20px;
`

const TotalPrice = styled.p``

const OrderTickets = () => {
    const location = useLocation();
    const movieId = location.pathname.split("/")[2];
    const userId = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser._id;
    const [tickets, setTickets] = useState([]);
    const [ticketsId, setTicketsId] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState("");

    useEffect(() => {
        const getMovieTickets = async () => {
          try {
            const res = await userRequest.get("/tickets/movie/" + movieId); 
            setTickets([res.data.slice(0, 4), res.data.slice(4, 8), res.data.slice(8, 12), res.data.slice(12, 16)]);
          } catch (error) {}
        };
        getMovieTickets();
      }, [movieId]);
      

    const handleClick = (e, id, isTaken, seat, price) => {
        if(isTaken) {
            return
        }
        if(e.target.className.includes("clicked")) {
            e.target.className = e.target.className.replace("clicked", "");
            setSelectedSeats(selectedSeats.replace(`${seat}, `, ""));
            setTotalPrice(totalPrice - price);
            ticketsId.splice(ticketsId.indexOf(id), 1)
        } else {
            e.target.className += " clicked";
            setSelectedSeats(selectedSeats + `${seat}, `);
            setTotalPrice(totalPrice + price);
            setTicketsId(ticketsId.concat([id]))
        }
    }  

    const handleOrder = () => {
        const newOrder = {
            userId,
            movieId,
            totalPrice,
            ticketId: ticketsId,
            seats: selectedSeats,
            isPaid: false
        }

        const updateTickets = async (id) => {
            try {
                const res = await userRequest.put(`http://localhost:5000/tickets/${id}`, {isTaken: true, userId: userId});
                console.log(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        
        const createOrderAndUpdateTickets = async () => {
            try {
                const res = await userRequest.post(`http://localhost:5000/orders`, newOrder);
                ticketsId.map((id) => updateTickets(id))
              } catch (err) {
                console.log(err);
              }
        }
        createOrderAndUpdateTickets()
        console.log(newOrder)
    }

    return (
        <Container>
            <Navbar />
            <SeatsContainer>
                <Title>Seats</Title>
                {
                    tickets.map((ticketArray) => {
                        return (
                            <Seats>
                                {ticketArray.map((ticket) => {
                                    return (
                                        <Seat className={ticket.isTaken && "isTaken"} onClick={(e) => handleClick(e, ticket._id, ticket.isTaken, ticket.seat, ticket.price)} key={ticket.id}>{ticket.seat}</Seat>
                                    )
                                })}
                            </Seats>
                        )
                    })
                }
                <SelectedSeatsContainer>
                    <SelectedSeatsTitle>Selected Seats :</SelectedSeatsTitle>
                    <SelectedSeats>{selectedSeats}</SelectedSeats>
                    <TotalPriceTitle>Total Price :</TotalPriceTitle>
                    <TotalPrice>Rp {totalPrice}</TotalPrice>
                </SelectedSeatsContainer>
                <Button onClick={handleOrder}>
                    ORDER NOW
                </Button>
            </SeatsContainer>
        </Container>
  )
}

export default OrderTickets