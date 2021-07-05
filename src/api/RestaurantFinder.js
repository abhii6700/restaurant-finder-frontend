import axios from 'axios'

export default axios.create({
    headers: { 'Access-Control-Allow-Origin': '*' },
    baseURL: "https://restaurant-finder-abhii6700.herokuapp.com//api/v1/restaurants"
})