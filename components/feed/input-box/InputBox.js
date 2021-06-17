import Image from 'next/image'
import { useSession } from 'next-auth/client'
//icons
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
//posting functionality
import { useRef, useState } from 'react'
import { db, storage } from '../../../firebase'
import firebase from 'firebase'

function InputBox () {
  const [session] = useSession()
  const inputRef = useRef(null)
  const filepickerRef = useRef(null)
  const [imagePost, setImagePost] = useState(null)

  const addImageToPost = e => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = readerEvent => {
      setImagePost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImagePost(null)
  }

  const sendPost = e => {
    e.preventDefault()

    if (!inputRef.current.value) return

    db.collection('posts')
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(doc => {
        if (imagePost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imagePost, 'data_url')

          removeImage()

          uploadTask.on(
            'state_change',
            null,
            error => console.error(error),
            () => {
              storage
                .ref('posts')
                .child(doc.id)
                .getDownloadURL()
                .then(url => {
                  db.collection('posts')
                    .doc(doc.id)
                    .set(
                      {
                        postJPG: url
                      },
                      { merge: true }
                    )
                })
            }
          )
        }
      })
    inputRef.current.value = ''
  }

  return (
    <div className='inputBox'>
      <div className='inputBoxTop'>
        <Image
          className='rounded-full'
          src={session.user.image}
          width={40}
          height={40}
          layout='fixed'
        />
        <form className='flex flex-1'>
          <input
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
            placeholder={`What's on your mind, ${session.user.name} ?`}
            type='text'
            ref={inputRef}
          />
          <button hidden onClick={sendPost} type='submit'>
            submit
          </button>
        </form>
        {imagePost && (
          <div onClick={removeImage} className='removeImage'>
            <img src={imagePost} className='h-10 object-contain' alt='' />
            <p className='text-xs text-red-500 text-center'>Remove</p>
          </div>
        )}
      </div>
      <div className='inputBoxBottom'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
        </div>
        <div
          onClick={() => filepickerRef.current.click()}
          className='inputIcon'
        >
          <CameraIcon className='h-7 text-green-400' />
          <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
          <input
            ref={filepickerRef}
            type='file'
            hidden
            onChange={addImageToPost}
          />
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
