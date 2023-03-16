// import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import BuyModel from '../../models/buy'
import Forum from './Forum';


const Buy = ({ user }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await BuyModel.all()
            setPosts(res.data)
        };
        fetchData()
    }, [user]);

    return (
        <div>
            <Forum 
            title={'Buy'} 
            description={'Buy and sell goods. Please be kind and respectful. '}
            posts={posts}
            user={user}
            />
        </div>

    );
}

export default Buy;