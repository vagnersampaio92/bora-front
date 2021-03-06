import styled from 'styled-components'



export const Form = styled.form`

/* display: none */

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
      max-height: 160px;
`;

export const Container = styled.div`
    display: flex;
    flex-flow: 4;
    justify-content: center;
    width: 100%;
    height: auto;
    max-width: 1200px;
    flex-flow:row wrap;
  
    margin-top: 10px;
 `;

export const Card = styled.div`
    display: flex;
    flex-flow: 4;
    justify-content: left;
    width: 80%;
    height: auto;
    max-width: 1200px;
    margin-right: 10px;
    flex-flow:row wrap;
    border-top: 1px solid #fa8e40;
    margin-top: 5px;
    padding: 15px 0 0px 0;
    flex-direction: column;
  justify-content: center;
    align-items: center;
         ul{
         list-style: none;
         margin-left: 15px;
         
     }
 `;
