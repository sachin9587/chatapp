import React, { useEffect, useState } from 'react'
import { FaUserCircle, } from "react-icons/fa";
const Profile = ({ contract, accountDetails, account }) => {
  const [accountInfo, setaccountInfo] = useState(accountDetails);
  const getUser = async () => {
    try {
      const result = await contract.getUserDetails(account);
      setaccountInfo(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, [accountInfo]);
  return (
    <div className='flex rounded-3xl -ml-1 flex-col items-start justify-start  '>
      <div className='flex flex-row'>
        <button className='flex flex-row'>
          {accountInfo?.Image === '' && <FaUserCircle className='mr-2' size={33} />}
          {accountInfo?.Image !== '' && <img alt='profile' src={accountInfo?.Image} className="mr-2 w-[33px] h-[33px] rounded-full" />}
          <div className='text-xl font-light'>{accountInfo?.Name}</div>
        </button>
      </div>
    </div>
  )
}

export default Profile