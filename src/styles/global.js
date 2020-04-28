import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0 ;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto' !important;

    }
    body{
        background: #e7e8e9 ;
        text-rendering: optimizeLegibility !important;
        margin: 0 ;
    }
    a{
        color:black !important;
        font-family: 'Roboto' !important;
    }
    
`;

export default GlobalStyle;