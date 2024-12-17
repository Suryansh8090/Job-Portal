import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'

import React from 'react'

function SingleJob() {
  return (
    <>
     <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex justify-between '>
            <p className='text-md text-gray-500 font-semibold'>02 days ago</p>
            <Button variant='outline' className='rounded-full' size='icon'><Bookmark/></Button>
        </div>
        <div className='flex items-center gap-2 my-2'>
        <Button className='p-6' variant='outline' size='icon'>
            <Avatar>
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuOC-Wr4_60z9IYM0ftBso6_uhi8_mNq7LWg&s" />
            </Avatar>
        </Button>
        <div>
            <h1 className='text-md font-bold'>Company Name</h1>
            <p className='font-semibold text-sm '>India</p>
        </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>Title</h1>
            <p className='text-sm text-gray-600'>yugugu iuggiyi ughuigi8y biuiuh8iy98 ukhgiuy 99y</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
            Position
          </Badge>
          <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
            Part Time
          </Badge>
          <Badge className={"text-[#7209B7] font-bold"} variant={"ghost"}>
            24LPA
          </Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button variant='outline'>Details</Button>
            <Button variant='outline'>Save For Later</Button>
        </div>
     </div> 
    </>
  )
}

export default SingleJob
