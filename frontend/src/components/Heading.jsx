import React from 'react'

function Heading({children}) {
  return (
    <div className='text-center text-3xl py-[0.8rem] font-bold'>
        {children}
    </div>
  )
}

export default Heading