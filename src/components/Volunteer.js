import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Forum from './ForumPages/Forum';
import VolunteerModel from '../models/volunteer'


const Volunteer = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await VolunteerModel.all()
            setPosts(res.data)
        };
        fetchData()
    }, []);

    return (
        <div>
            <Forum 
            title={'Volunteer'} 
            description={'For those seeking volunteers and those looking to help. Please be kind and respectful.'}
            posts={posts}
            />
        </div>

    );
}

export default Volunteer;