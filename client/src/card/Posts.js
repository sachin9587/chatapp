import React, { useEffect, useState } from 'react'
import UserPost from './UserPost';

const Posts = ({ contract, address }) => {
    const [posts, setposts] = useState(null);
    const [fetched, setfetched] = useState(false);
    const getPosts = async () => {
        const response = await contract.retrievePost(address);
        console.log("Response", response);
        if (response != null) {
            setposts(response);
            setfetched(true);
        }
    }
    useEffect(() => {
        getPosts();
    }, [])
    return (
        <div className="relative flex flex-col overflow-auto  text-white items-center mt-12 h-[630px] w-[800px]">
            <p className='text-2xl'>My Posts</p>
            <div className='grid grid-col-2'>
                {fetched && posts.map((post, i) => {
                    return (
                        <div key={i}>
                            <UserPost post={post} />
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Posts