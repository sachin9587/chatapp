import React, { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
const PostCard = ({ address, contract }) => {
    const [isEmpty, setisEmpty] = useState(false);
    const [userDetails, setuserDetails] = useState(null);
    const [loading, setloading] = useState(true);
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
    const getPost = async () => {
        const response = await contract.retrievePost(address);
        const userResponse = await contract.getUserDetails(address);
        setuserDetails(userResponse);
        if (response == null || response.length === 0) {
            setisEmpty(true);
        } else {
            console.log("Response", response[0].hash);
            setpostURL(response[0].hash);
            getTime(response[0].timestamp);
        }
        setloading(false);
    }
    useEffect(() => {
        getPost();
    }, [])

    return (
        <div className="flex items-center  ">
            {loading ?
                <div>
                    <BiLoaderAlt className='animate-spin p-1 mt-12 rounded-xl items-center flex flex-col w-[400px] sm:w-[650px]' size={50} />
                </div>
                : <div>
                    {!isEmpty &&
                        <div className=" mt-1 flex  border-light-100 border-x-[1px] mb-6 flex-col  sm:w-[650px] rounded-xl ">
                            <div className=" mt-1 mb-3  text-xl relative flex flex-row px-2">
                                <div className=' ml-2'>
                                    {userDetails?.Image === '' && <FaUserCircle className='mr-1' size={30} />}
                                    {userDetails?.Image !== '' && <img src={userDetails?.Image} className="mr-1 w-[30px] h-[30px] rounded-full" />}
                                </div>
                                <div className="ml-3">{userDetails.Name}</div>
                                <p className="absolute right-2 text-[17px] font-light">{postTime} {postDate}</p>
                            </div>
                            <img src={postURL} className='h-max mb-4 border-t-[1px] px-2 rounded-2xl' />
                        </div>
                    }

                </div>
            }
        </div>
    )
}

export default PostCard;