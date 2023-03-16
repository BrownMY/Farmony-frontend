import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Forum from './Forum';
import VolunteerModel from '../../models/volunteer'


const Volunteer = ({ user }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await VolunteerModel.all()
            setPosts(res.data)
        };
        fetchData()
    }, [user]);

    return (
        <div>
            <Forum 
            title={'Volunteer'} 
            description={'For those seeking volunteers and those looking to help. Please be kind and respectful.'}
            posts={posts}
            user={user}
            />
        </div>

    );
}

export default Volunteer;