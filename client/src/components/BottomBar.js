import React, { useState } from 'react'
import FriendList from '../card/FriendList';
import Search from '../card/Search';
import Chat from '../card/Chat';
import Posts from '../card/Posts';
import HomePage from '../card/HomePage';
import { BsSearch } from "react-icons/bs";
import { FcSearch, FcHome, FcList, FcSms } from "react-icons/fc";
import { AiOutlineHome } from "react-icons/ai"
import { BsChatLeftDots } from "react-icons/bs"
import { FiList } from "react-icons/fi";
import Profile from './Profile';

const BottomBar = ({ accountDetails, account, contract }) => {
  const [selected, setselected] = useState(1);
  const toProfile = (event) => {
    setselected(0);
  }
  const toChat = (event) => {
    setselected(2);
  }
  const toFriends = (event) => {
    setselected(3);
  }
  const toHome = (event) => {
    setselected(1);
  }
  const toPosts = (event) => {
    setselected(4);
  }
  return (
    <div className='flex flex-row -ml-5'>

      <div className=" flex-col w-[200px] rounded-3xl ">
        <button onClick={toProfile} className={` rounded-3xl px-7 py-4 items-center flex flex-row ${selected === 0 ? " bg-[#081e2b] scale-[105%] text-2xl" : "hover: hover:bg-[#081e2b]"}`}>
          {selected === 0 ?
            <FcSearch className=" h-[30px] scale-[130%] " />
            :
            <BsSearch className=" h-[30px] scale-[130%] " />
          }
          <div className={`ml-6 text-lg font-light font-sans sm:flex hidden ${selected === 0 ? " text-xl" : ""} `}>
            Search
          </div>
        </button>
        <button onClick={toHome} className={` rounded-3xl mt-7 px-7 py-4 items-center flex flex-row ${selected === 1 ? " bg-[#081e2b] scale-[105%]" : "hover:bg-[#081e2b]"}`}>
          {selected === 1 ?
            <FcHome className=" h-[30px] scale-[170%] " />
            :
            <AiOutlineHome className=" h-[30px] scale-[150%] " />
          }
          <div className={`ml-4 text-lg font-light font-sans sm:flex hidden ${selected === 1 ? " text-xl" : ""} `}>
            Home
          </div>
        </button>
        <button onClick={toChat} className={` rounded-3xl mt-7 px-7 py-4  items-center flex flex-row ${selected === 2 ? " bg-[#081e2b] scale-[105%]" : "hover:bg-[#081e2b]"}`}>
          {selected === 2 ?
            <FcSms className=" h-[30px] scale-[180%] " />
            :
            <BsChatLeftDots className=" h-[30px] scale-[130%] " />
          }
          <div className={`ml-6 text-lg font-light font-sans sm:flex hidden ${selected === 2 ? " text-xl" : ""} `}>
            Chat
          </div>
        </button>
        <button onClick={toFriends} className={` rounded-3xl mt-7 px-7 py-4  items-center flex flex-row ${selected === 3 ? " bg-[#081e2b] scale-[105%]" : "hover:bg-[#081e2b]"}`}>
          {selected === 3 ?
            <FcList className=" h-[30px] scale-[170%] " />
            :
            <FiList className=" h-[30px] scale-[150%] " />
          }
          <div className={`ml-4 text-lg font-light font-sans sm:flex hidden ${selected === 3 ? " text-xl" : ""} `}>
            Requests
          </div>
        </button>
        <button onClick={toPosts} className={` rounded-3xl mt-7  px-7 py-4  items-center flex flex-row ${selected === 4 ? " bg-[#081e2b] scale-[105%]" : "hover:bg-[#081e2b]"}`}>
          <Profile contract={contract} accountDetails={accountDetails} account={account} />
        </button>
      </div>
      <div
        class="ml-8 inline-block h-[400px] min-h-[1em] w-[2px] self-stretch bg-neutral-100 opacity-100 dark:opacity-50">
      </div>
      <div className="flex flex-row items-center justify-center -mt-4 h-[500px] ml-16 sm:w-[800px] rounded-lg ">
        {selected === 0 &&
          <div>
            <Search contract={contract} />
          </div>
        }
        {selected === 1 &&
          <div>
            <HomePage contract={contract} />
          </div>
        }
        {selected === 2 &&
          <div>
            <Chat contract={contract} />

          </div>
        }
        {selected === 3 &&
          <div>
            <FriendList contract={contract} />
          </div>
        }
        {selected === 4 &&
          <div>
            <Posts address={accountDetails.Address} contract={contract} />
          </div>
        }
      </div>
    </div>

  )
}

export default BottomBar