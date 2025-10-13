import React from 'react'

function Card({title, count, children}) {

  return (
    <div className="flex justify-between items-center bg-white rounded-xl shadow-xl p-4">
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{title}</span>
        <span className="font-bold text-4xl">{count}</span>
      </div>

      <div className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-950">
        {children}
      </div>
    </div>
  )
}

export default Card