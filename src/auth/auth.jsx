

const getUser  = ()=>{
    const token =  localStorage.getItem("token")
    if (token) {
     console.log(token)
    }

}




export default getUser;