import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './View.css';

const View = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }));

    }, [id])
    return (
        <div style={{ marginTop: "150px" }}>
            <div className='card'>
                <div className='card-header'>
                    <p>User Details</p>
                </div>
                <div className='container'>
                    <stong>ID:</stong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <stong>Name:</stong>
                    <span>{user.name}</span>
                    <br />
                    <br />
                    <stong>Email:</stong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <stong>Mobile No:</stong>
                    <span>{user.contact}</span>
                    <br />
                    <br />

                    <Link to="/">
                        <input type="button" className='btn-edit' value="Go Back" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View
