import React, { useEffect, useState } from 'react'
const UserPost = ({ post }) => {
    const [postDate, setpostDate] = useState("");
    const [postTime, setpostTime] = useState('');
    const [postURL, setpostURL] = useState('');
    const getTime = (timestamp1) => {
        if (timestamp1 !== undefined) {
            const mssg = JSON.parse(JSON.stringify(timestamp1));
            var timestamp = parseInt(mssg.hex, 16);
            timestamp = timestamp * 1000;
            var date = new Date(timestamp).toDateString();
            var timer = new Date(timestamp).toTimeString();
            timer = JSON.stringify(timer);
            date = JSON.stringify(date);
            const samay = timer.slice(1, 6);
            const time = date.slice(5, date.length - 5);
            setpostTime(samay);
            setpostDate(time);
        }
    }
    useEffect(() => {
        setpostURL(post.hash);
        getTime(post.timestamp);
    }, [])
    return (
        <div>
            <div className="flex items-center  ">
                <div>
                    <div className="flex border-light-100 mb-6 flex-col w-[350px] rounded-xl ">
                        <img alt='post' src={postURL} className='h-max mb-4 mt-2 border-t-[1px] px-2 rounded-2xl' />
                        <div className=" -mt-3 mb-6 text-xl relative flex flex-row px-2">
                            <p className="absolute right-2 text-[17px] font-light">{postTime} {postDate}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserPost