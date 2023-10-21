import React, { useState, useRef, useEffect } from 'react'
import { toast, Toaster } from "react-hot-toast";
import PostCard from './PostCard';
// import { IoMdAdd } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import axios from "axios";
import Lottie from "lottie-react";
import friendsAnimation from "../assets/animation_lk05rlam.json";

const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZTUyNmI4Yy1hNmIzLTQyMGYtOTM5ZC0zZjUzZmRjZjA4ODMiLCJlbWFpbCI6InJvbm5pZXJhanNpbmdoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzZDAzYmQ2ZTBkYjFmYzZiOGRmZCIsInNjb3BlZEtleVNlY3JldCI6IjcyNTVkM2RhODI5NTI1NjI1ZDBmNzY3YjMwM2M5YmQ5ZmEzYzg0NjE5ZDIzMTllNDVmMmViOWRlMDc3MzFlYWEiLCJpYXQiOjE2OTczODk3NTB9.K7nAh0BDZHWhSMDB8N0F1jVmPj2x4AYXwyYZSzzE6MA eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZTUyNmI4Yy1hNmIzLTQyMGYtOTM5ZC0zZjUzZmRjZjA4ODMiLCJlbWFpbCI6InJvbm5pZXJhanNpbmdoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5OTZjNTJkYmFkZjFhZGZmOGU0YSIsInNjb3BlZEtleVNlY3JldCI6ImEyYmFjNjBjNzdlZGQ1ZDdhYTBhYTExNzY5OWZjYWJmMzc0ZmQxNTQzODZhMDQ5NTRmZTMzZTAxNWZlZTg0NzkiLCJpYXQiOjE2ODcyNDUzODJ9.CHifyXne4nGhyQcTSU8kVMFMdNaFktGpK45JdKiHVtI`
const HomePage = ({ contract }) => {
    const [friends, setfriends] = useState(null);
    const [data, setdata] = useState(false);
    const [file, setfile] = useState(null);
    const hiddenFileInput = useRef(null);
    const [fileName, setfileName] = useState('');
    const [uploading, setuploading] = useState(false);
    const [noFriends, setnoFriends] = useState(false);
    const [isImageReq, setisImageReq] = useState(false);
    const uploadImage = async () => {
        if (file) {
            setuploading(true);
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    maxBodyLength: "Infinity",
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: JWT,
                    }
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
                const response = await contract.addPost(ImgHash);
                console.log("Response", response);
                toast.success("Image sent!",
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
            } catch (error) {
                console.log(error);
                toast.error("Couldn't Upload",
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
            }
            setfile(null);
            setuploading(false);
        } else {
            toast.error("Can't Upload File!",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
        }
        setisImageReq(false);
    }
    const retrieveFile = (e) => {
        setfile(e.target.files[0]);
        setfileName(e.target.files[0].name);
        e.preventDefault();
        setisImageReq(true);
    };
    const getImage = () => {
        hiddenFileInput.current.click();
    }
    const getFriends = async () => {
        try {
            const response = await contract.getFriendList();
            setfriends(response);
            if (response.length === 0) {
                setnoFriends(true);
            } else {
                setdata(true);
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
    }
    useEffect(() => {
        getFriends();
    }, [friends])

    return (
        <div className="relative flex flex-col items-center mt-3 h-[530px] w-[750px]">
            <Toaster />
            {noFriends ?
                <div className="p-2 text-xl flex flex-col items-center justify-center w-[800px] rounded-xl bg-transparent h-[530px]">
                    <div >Add Friends for Posts</div>
                    <Lottie animationData={friendsAnimation} className=" scale-[140%] h-[230px]" />
                </div>
                :
                <div>
                    {data &&
                        <div className="flex overflow-auto flex-col items-center rounded-xl w-[750px] h-[530px]">
                            {friends.map((friend, i) => {
                                return (
                                    <div key={i} className='py-2'>
                                        <PostCard address={friend.friendAddress} contract={contract} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            }

            {isImageReq &&
                <div className="items-center text-md justify-end rounded-3xl py-3 px-3 bg-[#20202b]">
                    <p className="px-4">{fileName}</p>
                    {uploading ?
                        <BiLoaderAlt className='animate-spin  p-1 rounded-xl right-4 bottom-2' size={30} />
                        :
                        <FiUpload onClick={uploadImage} className=" hover:bg-[#20202b] p-1 rounded-xl right-4 bottom-2" size={40} />
                    }
                </div>
            }
            {!isImageReq &&
                <button onClick={getImage} className='flex bg-blue-600  flex-row items-end text-[17px] justify-end rounded-3xl mt-3 mb-1 mr-2 py-2 px-4 '>
                    <p>Post</p>
                    < div className="ml-3">
                        <FiUpload size={25} />
                    </div>
                </button>
            }
            <input
                disabled={uploading}
                type="file"
                name="data"
                accept="image/*"
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                onChange={retrieveFile}
            />
        </div>
    )
}

export default HomePage