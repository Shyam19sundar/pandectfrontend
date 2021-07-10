import React, { useEffect, useState } from 'react'
import HomePost from './HomePost'
import axios from './axios'
import Blogs from './Blogs'

function MostLikedBlogs() {
    const [posts, setposts] = useState([])
    useEffect(() => {
        axios.get("/mostliked")
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

export default MostLikedBlogs
