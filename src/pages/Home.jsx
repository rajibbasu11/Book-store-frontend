import React from 'react'
import { useNavigate } from 'react-router-dom'



const Home = () => {
    const navigate = useNavigate();

    const gotoLogin = () => {
    navigate('/login')
};

    return (
        <>
        <span>This is home</span>
        <span>go to <span onClick={gotoLogin}>login</span></span>
        </>
    )
}

export default Home