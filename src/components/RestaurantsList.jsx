import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";
import StarRating from "./StarRating";

const RestaurantsList = (props) => {

    //FETCHING ALL RESTAURANTS
    const { restaurants, setRestaurants } = useContext(RestaurantContext)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants)
            } catch (err) {
                console.log(err);
            }
        };

        fetchdata();
    }, []);


    //DELETING A RESTAURANT
    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (err) {
            console.log(err)
        }
    }

    //UPDATE A RESTAURANT
    let history = useHistory()
    const handleUpdate = (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    //SELECT A RESTAURANT
    const handleRestaurantSelect = (id) => {
        history.push(`restaurants/${id}`)
    }

    //RENDER RATINGS
    const renderRatings = (restaurant) => {
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>;
        }
        return (
            <>
                <StarRating rating={restaurant.id} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        );
    };

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => (
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRatings(restaurant)}</td>
                            <td>
                                <button onClick={(e) => { handleUpdate(e, restaurant.id) }} className="btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onClick={(e) => { handleDelete(e, restaurant.id) }} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {/* <tr>
                        <td>mcdonalds</td>
                        <td>New YOrk</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>mcdonalds</td>
                        <td>New YOrk</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantsList;
