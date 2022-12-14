import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleSpot, updateSpotById } from "../../store/spots";

const UpdateCurrentSpot = ({ setShowModal }) => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleSpot(spotId));
    }, [dispatch]);

    const sessionUser = useSelector((state) => state.session.user);
    const sessionCurrentSpot = useSelector((state) => state.spots.currentSpot);

    const [currentSpot, setCurrentSpot] = useState(sessionCurrentSpot);

    const [errors, setErrors] = useState([]);

    const [address, setAddress] = useState(sessionCurrentSpot.address);
    const [city, setCity] = useState(sessionCurrentSpot.city);
    const [state, setSpotState] = useState(sessionCurrentSpot.state);
    const [country, setCountry] = useState(sessionCurrentSpot.country);
    const [name, setName] = useState(sessionCurrentSpot.name);
    const [description, setDescription] = useState(sessionCurrentSpot.description);
    const [price, setPrice] = useState(sessionCurrentSpot.price);

    useEffect(() => {
        const errorArray = [];
        if (address.length === 0) errorArray.push('Please enter a valid Address');
        if (city.length === 0) errorArray.push('Please enter a valid City');
        if (state.length === 0) errorArray.push('Please enter a valid State');
        if (country.length === 0) errorArray.push('Please enter a valid Country');
        if (name.length === 0) errorArray.push('Please enter a valid name');
        if (description.length === 0) errorArray.push('Please enter a valid description');
        if (price < 15) errorArray.push('Please enter a price above $15.00');
        setErrors(errorArray);
    }, [address, city, state, country, name, description, price]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateSpot = {
            id: parseInt(spotId),
            ownerId: sessionUser.id,
            address,
            city,
            state,
            country,
            name,
            description,
            price,
        };

        await dispatch(updateSpotById(parseInt(spotId), updateSpot));

        const newCurrentSpot = dispatch(getSingleSpot(spotId));

        setCurrentSpot(newCurrentSpot);
        setShowModal(false);
    };

    return (
        <div className="inputSpot" style={{ height: '30rem auto'}}>
            <h1 style={{ margin: '5%' }}>Update Listing</h1>
            {errors.length > 0 && <ul style={{margin: '10px 0'}}>
                {errors.map((error, idx) => <li key={idx} style={{color: 'red', fontSize: '13px'}}>{error}</li>)}
            </ul>}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='name'
                    name='name'
                    required
                />
                <input
                    type='text'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder='address'
                    name='address'
                    required
                />
                <input
                    type='text'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder='city'
                    name='city'
                    required
                />
                <input
                    type='text'
                    onChange={(e) => setSpotState(e.target.value)}
                    value={state}
                    placeholder='state'
                    name='state'
                    required
                />
                <input
                    type='text'
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder='country'
                    name='country'
                    required
                />
                <textarea
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='description'
                    name='description'
                    required
                />
                <input
                    type='number'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder='price'
                    name='price'
                    min={15}
                    required
                />
                <button type='submit' style={{
                    marginTop: '3%',
                    border: '1px solid grey',
                    borderRadius: '3px',
                    marginBottom: '50px'
                }} disabled={errors.length > 0}>Submit</button>
            </form>
        </div>
    );
};

export default UpdateCurrentSpot;
