import React from 'react'
import InstagramEmbed from "react-instagram-embed";
import { useStateValue } from '../StateProvider';

function InstagramComponent() {
    const [{ postToLiked }, dispatch] = useStateValue()
    return (
        <div className="insta-post">
            <InstagramEmbed />
            <blockquote class="instagram-media" data-instgrm-permalink={postToLiked.post_instaLink} >
            </blockquote>
        </div>
    )
}

export default InstagramComponent
