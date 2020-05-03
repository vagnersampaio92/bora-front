import React from 'react';
import styled from 'styled-components'



export const Container = styled.div`

display:flex;
flex-direction: column;
align-items: center;
height: 100% !important;
width: 100%;

background: #e7e8e9;
`;

export const Buttongroup = styled.div`
 display: flex;
  justify-content: center;
    align-items: center;
    flex-direction: row;
    

`;

export const Img = styled.img`
    width: 100%;
     max-width: 250px;
     height: 100%;
      max-height: 100px;
`;

export const Card2 = styled.div`
  width: 100%;
   
   
    height: 100%;
    justify-content: center;
    
    display: flex;
    flex-direction: column;
  
  
`;

export const Card = styled.div`
  width: 100%;
    
    margin-bottom: 10px;
    max-width: 1920px;
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
        padding:40px;
        display: flex;
        flex-direction: column;
        align-items: center;
      
    }
   
`;