import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Forum from './Forum';
import HolisticModel from '../../models/holistic'

const Holistic = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await HolisticModel.all()
            setPosts(res.data)
        };
        fetchData()
    }, []);



    return (
        <div>
            <Forum 
            title={'Holistic Hub'} 
            description={'Community chit-chat. Discuss community news, trade recipes, share photos, etc. Please be kind and respectful. '}
            posts={posts}
            />
            </div>
    );
}

export default Holistic;