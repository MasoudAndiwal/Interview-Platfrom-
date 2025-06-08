'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}
function Agent({userName}: AgentProps) {
  const isSpeaking = true;
  const callStatus = CallStatus.INACTIVE;
  const message = [
    'What is your name?',
    'Hello sir , my name is Masoud Andiwal, Nice to meet you!',
    'What is your last name?',
    'My last name is Andiwal'
    
  ];
  const lastMessage = message.at(message.length - 1 );
  return (
    <>
    <div className='call-view'>
      <div className='card-interviewer'>
        <div className='avatar'>
          <Image src="/ai-avatar.png" alt="avatar" width={60} height={54} className='object-cover'/>
          {isSpeaking && <span className='animate-speak'></span>}
        </div>
        <h3>AI Interviewer</h3>
      </div>
      <div className='card-border'>
        <div className='card-content'> 
          <Image src="/user-avatar.png" alt="user avatar" width={500} height={500} className='rounded-full object-cover size-[140px]'/>
          <h3>{userName}</h3>
        </div>
      </div>
    </div>
    {message.length > 0 && (
      <div className='transcript-border'>
          <data className='transcript'>
            <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0 ' ,'animate-fadeIn opacity-100')}>{lastMessage}</p>
          </data>
      </div>
    )}
    <div className='w-full flex flex-col justify-center items-center'>
     {callStatus != 'ACTIVE' ? (
      <button className='btn-call'>
        <span className={cn('absolute animate-ping rounded-full opacity-75' , callStatus === 'CONNECTING' && 'hidden')}></span>
        <span>
        {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '. . .'}
        </span>
      </button>
     ):(
      <button className='btn-disconnect'>
        end
      </button>
     )}
    </div>
    </>
  )
}

export default Agent