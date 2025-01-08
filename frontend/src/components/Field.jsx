import React from 'react'

function Field({filedName, placeholder, state, setState, inputType}) {
  return (
    <div className='py-[0.4rem] flex flex-col'>
        <label htmlFor={filedName} className='font-semibold pb-[0.3rem]'>
            {filedName}
        </label>
        <input 
            id={filedName} 
            type={inputType} 
            placeholder={placeholder}
            value={state}
            onChange={(e)=>setState(e.target.value)}
            className='appearance-none placeholder-[#acadb5] border border-[#acadb5] rounded-md pl-[10px] py-[3px]'
        />
    </div>
  )
}

export default Field