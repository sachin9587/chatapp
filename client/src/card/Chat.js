import React, { useEffect, useState } from 'react'
import { toast, Toaster } from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi"
import ChatCard from './ChatCard';
import ChatScreen from './ChatScreen';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import Lottie from "lottie-react";
import friendsAnimation from "../assets/animation_lk05rlam.json";

const Chat = ({ contract }) => {
    const [noFriends, setnoFriends] = useState(false);
    const [friends, setfriends] = useState([]);
    const [chatOpen, setchatOpen] = useState(false);
    const [userNo, setuserNo] = useState(null);
    const [loading, setloading] = useState(true);
    const getFriends = async () => {
        try {
            const response = await contract.getFriendList();
            setfriends(response);
            if (response.length === 0) {
                setnoFriends(true);
            }
        } catch (error) {
            toast.error('Refresh the page',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
        setloading(false);
    }
    const closeChat = () => {
        setchatOpen(false);
        setloading(true);
        setuserNo(null);
    }
    const openChat = (i) => {
        setuserNo(i);
        setchatOpen(true);
    }
    useEffect(() => {
        getFriends();
    }, [friends]);
    return (
        <div>
            <Toaster />
            {loading && <div className='flex flex-col items-center relative  h-[530px] w-[750px]'>
                <BiLoaderAlt className='mt-64 animate-spin' size={45} />
            </div>}
            {!loading && <div className=' flex flex-col items-center  h-[530px] w-[750px]'>

                {/* {!chatOpen && <div className='p-2 flex justify-center items-center my-2 text-2xl'>Chat</div>
                } */}
                {noFriends &&
                    <div className="flex flex-col items-center">
                        <div className="mt-28 text-xl">Add Friends to Chat</div>
                        <Lottie animationData={friendsAnimation} className=" scale-[140%] h-[230px]" />
                    </div>
                }
                {chatOpen && <div className=' mt-3 h-[530px] w-[750px]'>
                    <div className=' relative flex py-3 flex-row h-[48px] justify-center rounded-t-2xl bg-[#0b2f42]'>
                        <MdOutlineKeyboardBackspace onClick={closeChat} className='absolute left-3.5 top-2 rounded-xl hover:bg-[#0b2f42] ' size={32} />
                        <div className='flex items-center font-sans font-light text-[24px] justify-center'>
                            {friends[userNo].name}
                        </div>
                    </div>
                    <hr className="h-[2px] bg-gray-200 border-0 dark:bg-gray-700" />
                    <ChatScreen contract={contract} user={friends[userNo]} />
                </div>}
                {!chatOpen && <div>
                    {!noFriends && <div>
                        {friends.map((friend, i) => {
                            return (
                                <div onClick={() => { openChat(i) }} key={i} className='mt-4 py-2'>
                                    <ChatCard contract={contract} address={friend[1]} />
                                </div>
                            )
                        })}
                    </div>
                    }
                </div>}

            </div>}

        </div>
    )
}

export default Chat