import React from 'react'

function Button({children}) {
  return (
    <div className='py-[0.8rem]'>
        <button className='bg-[#0a0a0a] text-white w-full py-[0.4rem] rounded-lg'>
            {children}
        </button>
    </div>
  )
}

export default Button