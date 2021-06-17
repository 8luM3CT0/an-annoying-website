import Image from 'next/image'

function Contact ({ src, name }) {
  return (
    <div className='contactDiv'>
      <Image
        className='rounded-full'
        objectFit='cover'
        src={src}
        height={50}
        width={50}
        layout='fixed'
      />
      <p>{name}</p>
      <div className='contactActive' />
    </div>
  )
}

export default Contact
