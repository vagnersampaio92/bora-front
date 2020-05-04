import styled from 'styled-components'



export const Form = styled.form`

/* display: none */

`;
export const Buttongroup = styled.div`
 display: flex;
 width: 100%;
  justify-content: center;
    align-items: center;
    
    max-width: 1200px;
    flex-flow:row wrap;

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
 export const Container2 = styled.div`
 display: flex;
 flex-flow: 4;
 justify-content: center;
 width: 100%;
 height: auto;
 max-width: 1200px;
 flex-flow:row wrap;
 border: 1px solid #fa8e40;
 margin-top: 10px;

 table.striped tr:nth-child(odd) {
    background-color: #f2f2f2;
}
td, th {
    padding: 15px 5px;
    display: table-cell;
    text-align: left;
    vertical-align: middle;
    
}
.tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}



`;


export const Card = styled.div`
    display: flex;
    flex-flow: 4;
    justify-content: left;
    width: 100%;
    height: auto;
    max-width: 1920px;
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
