const UserDetails = localStorage.getItem('User-Details')
export const userdata = JSON.parse(JSON.parse(JSON.stringify(UserDetails)))
