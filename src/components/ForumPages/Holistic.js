import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Forum from './Forum';
import HolisticModel from '../../models/holistic'

const Holistic = ({ user }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await HolisticModel.all()
            setPosts(res.data)
        };
        fetchData()
    }, [user]);



    return (
        <div>
            <Forum 
            title={'Holistic Hub'} 
            description={'Community chit-chat. Discuss community news, trade recipes, share photos, etc. Please be kind and respectful. '}
            posts={posts}
            user={user}
            />
        </div>
    );
}

export default Holistic;