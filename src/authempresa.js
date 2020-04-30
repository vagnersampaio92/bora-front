
export const isAuthenticated = () => {

    if(! sessionStorage.getItem('tokenres') ){
        return false
      
    }
    return true
}