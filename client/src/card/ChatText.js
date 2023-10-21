import React, { useState, useEffect } from 'react'
import { TbWindmill } from "react-icons/tb"
import { Configuration, OpenAIApi } from "openai";
import { toast, Toaster } from "react-hot-toast";

const OPENAI_API_KEY = '';
const ChatText = ({ user, msg, setsendMsg, setloading }) => {
  const [hoover, sethoover] = useState(false);
  const [breakWord, setbreakWord] = useState(false);
  const [time, settime] = useState('');
  const replyAI = async () => {
    setloading(true);
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Can you reply to this Message in striclty less than 70 words - " + msg[2],
        max_tokens: 200,
        temperature: 0,
      });
      var res = response.data.choices[0].text;
      const value = res.slice(2);
      setsendMsg(value);
    } catch (error) {
      console.log("Error", error);
      toast.error('Enter OpenAI Key for AI Response',
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
  const openImage = () => {
    window.open(msg[2], '_blank');
  }
  const containsSpecialChars = () => {
    const specialChars = /[`@#$%^&*()_+\=\[\]{};':"\\|<>\/~]/;
    if (specialChars.test(msg[2])) {
      setbreakWord(true);
    }
  }
  const getTime = () => {
    if (msg.timestamp !== undefined) {
      const mssg = JSON.parse(JSON.stringify(msg.timestamp));
      var timestamp = parseInt(mssg.hex, 16);
      timestamp = timestamp * 1000;
      var date = new Date(timestamp).toTimeString();
      date = JSON.stringify(date);
      const time = date.slice(1, 6);
      settime(time);
    }
  }
  useEffect(() => {
    getTime();
    msg[1] && containsSpecialChars();
  }, [])
  return (
    <div>
      <Toaster />
      <div className="relative flex flex-row">
        <div onMouseEnter={() => { sethoover(true) }} onMouseLeave={() => { sethoover(false) }} className={`flex relative hover:bg-gray-600 text-end justify-start whitespace-normal mb-1 mt-1 mx-1 px-4 w-[300px] py-3 rounded-2xl ${breakWord ? "break-all" : "break-before-auto"} ${msg[0] === user.friendAddress ? "mr-96  bg-gray-700 " : "ml-96 bg-gray-500 "} `}>
          {msg[1] ? <div>{msg[2]}</div> : <img onClick={openImage} src={msg[2]} className='h-max' />}
          {hoover &&
            <div onClick={replyAI}>
              <TbWindmill className="absolute p-1 top-0.5 right-0.5 hover:bg-[#0d3d57] rounded-xl" size={23} />
            </div>
          }
          <p className="absolute pr-1 text-xs bottom-[0px] right-0.5 font-light ">{time}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatText