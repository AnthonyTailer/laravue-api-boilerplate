export const login = (credentials) => {
  return new Promise( (res, rej) => {
    const {email, password} = credentials
   axios.post('/api/auth/login', {email, password} )
     .then( (response) => {
       res(response.data)
     })
     .catch((err) => {
       rej("Wrong email or password")
     })
  })
}

export const getLocalUser = () => {
  const userStr = localStorage.getItem("user")

  if (!userStr) {
    return null
  }

  return JSON.parse(userStr)
}