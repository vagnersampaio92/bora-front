import React from 'react';
import styled from 'styled-components'



export const Container = styled.div`

display:flex;
flex-direction: column;
align-items: center;
padding-top: 70px;
width: 100%;

background: #e7e8e9;
`;


export const Img = styled.img`
    width: 100%;
     max-width: 250px;
     height: 100%;
      max-height: 100px;
`;

export const Card2 = styled.div`
  width: 50%;
    margin-right:10px;
    margin-bottom: 10px;
    max-width: 1250px;
   
    height: auto;
    justify-content: center;
    
    display: flex;
    flex-direction: column;
  
  
`;

export const Card = styled.div`
  width: 100%;
    
    margin-bottom: 10px;
    max-width: 1250px;
    background: white;
    height: auto;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #fa8e40;
    display: flex;
    flex-direction: column;
    background: white;
    header{
        padding:30px;
        display: flex;
        flex-direction: column;
        align-items: center;
      
    }
    p{
        padding:15px;
    }
    h3{
        padding:25px;
    }
`;