import React, { useEffect, useState } from 'react'
import HomePost from './HomePost'
import axios from './axios'
import Blogs from './Blogs'
import { useStateValue } from '../StateProvider'

function LatestBlogs() {
    const [{ posts }, dispatch] = useStateValue()

    return (
        <div>
            <Blogs />
            <div className="bottom">
                {posts?.map(post => <div> <HomePost post={post} /> </div>)}
            </div>
        </div>
    )
}

export default LatestBlogs
