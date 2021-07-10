import React, { useEffect, useState } from 'react'
import HomePost from './HomePost'
import Blogs from './Blogs'
import axios from './axios'


function CinemaBlogs() {
    const [posts, setposts] = useState([])
    useEffect(() => {
        axios.get("/cinemaposts")
            .then(res => setposts(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Blogs />
            <div className="bottom">
                {posts?.map(post => <div> <HomePost post={post} /> </div>)}
            </div>
        </div>
    )
}

export default CinemaBlogs
