import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
    <section className='flex flex-row blue-gradient-dark rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
        <p className='text-lg'> Practice on real interview questions & get instant feedback</p>

        <Button asChild  className='btn-primary max-sm:w-full'>
          <Link href='/interview'>Start an Interview</Link>
        </Button>
      </div>
    <img src="/robot.png" alt="robot-AI" width={400} height={400} className='max-sm:hidden ' />
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Inteviews</h2>
      <div className='interviews-section'>
        {dummyInterviews.map((interview) => (
         <InterviewCard
  key={interview.id}
  interviewId={interview.id}
  userId={interview.userId}
  role={interview.role}
  type={interview.type}
  techstack={interview.techstack}
  createdAt={interview.createdAt}
/>))}
        {/* <p>You haven't taken any interviews yet</p> */}
      </div>
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>
      <div className='interviews-section'>
      {dummyInterviews.map((interview) => (
         <InterviewCard
  key={interview.id}
  interviewId={interview.id}
  userId={interview.userId}
  role={interview.role}
  type={interview.type}
  techstack={interview.techstack}
  createdAt={interview.createdAt}
/>
        ))}
        <p>There are no interviews available</p>
      </div>

    </section>
    </>
  )
}

export default page