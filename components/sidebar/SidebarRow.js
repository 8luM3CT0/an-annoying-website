import Image from 'next/image'

function SidebarRow ({ Icon, title, src }) {
  return (
    <div
      className='
      flex 
      space-x-2 
      items-center 
      p-2 
    hover:bg-gray-200 
    rounded-xl 
    cursor-pointer
    '
    >
      {src && (
        <Image
          className='rounded-full'
          src={src}
          width={30}
          height={30}
          layout='fixed'
        />
      )}
      {Icon && (
        <Icon
          className='
      h-8 
      w-8 
      text-blue-500'
        />
      )}
      <p
        className='
      hidden 
      sm:inline-flex 
      font-medium'
      >
        {title}
      </p>
    </div>
  )
}

export default SidebarRow
