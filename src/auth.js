
export const isAuthenticated = () => {

    if(! sessionStorage.getItem('token') ){
        return false
      
    }
    return true
}