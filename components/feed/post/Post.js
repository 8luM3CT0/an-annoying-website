import Image from 'next/image'
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline'

function Post ({ name, timestamp, email, postJPG, image, message }) {
  return (
    <div className='flex flex-col'>
      <div className='postMajority'>
        <div className='flex items-center space-x-2'>
          <img
            src={image}
            width={40}
            height={40}
            className='rounded-full'
            alt=''
          />
          <div>
            <p className='font-medium'>{name}</p>
            {timestamp ? (
              <p className='text-xs text-gray-400'>
                {new Date(timestamp?.toDate()).toLocaleString()}
              </p>
            ) : (
              <p className='text-xs  text-gray-400'>Loading...</p>
            )}
          </div>
        </div>
        <p className='pt-4 '>{message}</p>
      </div>
      {postJPG && (
        <div
          className='
          relative
          h-56
          md:h-96
          bg-white
          '
        >
          <Image src={postJPG} objectFit='cover' layout='fill' />
        </div>
      )}
      <div className='postFooter'>
        <div className='inputIcon rounded-none rounded-bl-2xl'>
          <ThumbUpIcon className='h-4' />
          <p className='text-xs sm:text-base'>Like</p>
        </div>
        <div className='inputIcon rounded-none'>
          <ChatAltIcon className='h-4' />
          <p className='text-xs sm:text-base'>Comment</p>
        </div>
        <div className='inputIcon rounded-none rounded-br-2xl'>
          <ShareIcon className='h-4' />
          <p className='text-xs sm:text-base'>Share</p>
        </div>
      </div>
    </div>
  )
}

export default Post
