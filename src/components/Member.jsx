import React from 'react'

function Member({data}) {
    console.log(data);

  return (
    <div className="w-full h-[5rem] grid grid-cols-20">
        <div className="col-span-3 bg-red-200"></div>
    </div>
  )
}

export default Member