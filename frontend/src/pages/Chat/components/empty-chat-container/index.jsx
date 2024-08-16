import React from 'react'
import animationData from "@/assets/lottie-json"
import Lottie from 'react-lottie'

const EmptyChatContainer = () => {

const animationOptions={
    loop:true,
    autoplay:true,
    animationData: animationData
}

return (
    <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all'>
        <Lottie
            isClickToPauseDisabled={true}
            height={200}
            width={200}
            options={animationOptions}
        />
        <div className='text-opacity-80 text-white flex gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center'>
          <span>Hi<span className='text-purple-500'>!</span></span> Welcome to
           <span className='text-purple-500'>Chatify</span>Chat app

        </div>
    </div>
  )
}

export default EmptyChatContainer