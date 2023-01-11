import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { publicRequest, userRequest } from '../requestMethods';


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const OrderContainer = styled.div `
  margin-bottom : 10px;
  margin-left: 10px;
  width: 40%;
  padding: 20px;
  border: 1px solid black;
  border-radius: 25px;
`;

const OrderTitle = styled.h2`
`

const OrderItemContainer = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
`

const OrderItemTitle = styled.h4`
    margin-right: 10px;
`

const OrderItem = styled.p`
`


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const userId = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser._id;
    
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get("/orders/user/" + userId);
                setOrders(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        getOrders();
    }, [orders]);  

    return (
    <Container>
        <Navbar />
        <Title>Orders</Title>
        {orders.map((order, index) => {
            return (
                <OrderContainer>
                    <OrderTitle>Order {index + 1}</OrderTitle>
                    <OrderItemContainer>
                        <OrderItemTitle>Movie ID: </OrderItemTitle>
                        <OrderItem>{order.movieId}</OrderItem>
                    </OrderItemContainer>
                    <OrderItemContainer>
                        <OrderItemTitle>Seats: </OrderItemTitle>
                        <OrderItem>{order.seats}</OrderItem>
                    </OrderItemContainer>
                    <OrderItemContainer>
                        <OrderItemTitle>TotalPrice: </OrderItemTitle>
                        <OrderItem>{order.totalPrice}</OrderItem>
                    </OrderItemContainer>
                    <OrderItemContainer>
                        <OrderItemTitle>Is Paid: </OrderItemTitle>
                        <OrderItem>{order.isPaid ? "True" : "False"}</OrderItem>
                    </OrderItemContainer>
                </OrderContainer>
            )
        })}
    </Container>
    )
}

export default Orders