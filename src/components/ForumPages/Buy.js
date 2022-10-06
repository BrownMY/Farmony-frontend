// import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import BuyModel from '../../models/buy'
import Forum from './Forum';
// import Searchbar from './Searchbar'


const Buy = () => {

    const [posts, setPosts] = useState([])
    let style = { backgroundColor: 'white' }

    useEffect(() => {
        const fetchData = async () => {
            const res = await BuyModel.all()

            setPosts(res.data)
        };
        fetchData()
    }, []);

    return (
        <div>
            <Forum 
            title={'Buy'} 
            description={'Buy and sell goods. Please be kind and respectful. '}
            posts={posts}
            />
        </div>

    );
}

export default Buy;