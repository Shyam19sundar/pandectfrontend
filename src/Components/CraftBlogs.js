import React, { useEffect, useState } from 'react'
import HomePost from './HomePost'
import axios from './axios'
import Blogs from './Blogs'

function CraftBlogs() {
    const [posts, setposts] = useState([])
    useEffect(() => {
        axios.get("/craftposts")
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

export default CraftBlogs
