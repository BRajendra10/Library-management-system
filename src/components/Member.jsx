import React from 'react'

function Member({ data }) {
  const { id, userImage, name, email, phone, lastVisited, department, year, fineDue } = data;

  console.log(userImage);

  return (
    <ul className="w-full h-[4rem] grid grid-cols-25 text-sm/6 p-2 gap-1 bg-stone-100" key={id}>
      <li className="flex items-center text-stone-500">
        <input className="w-4 h-4" type="checkbox" name="select-all-member" id="select-all-member" />
      </li>
      <li className="col-span-5 flex items-center gap-2 text-stone-500">
        <img className="w-9 h-9 rounded-full" src={userImage} alt="" />
        <div className="flex flex-col">
          <span>{name}</span>
          <span className="text-sm truncate">{email}</span>
        </div>
      </li>
      <li className="col-span-2 flex items-center text-stone-500">ID {id}</li>
      <li className="col-span-3 flex items-center text-stone-500">{phone}</li>
      <li className="col-span-3 flex items-center text-stone-500">{lastVisited}</li>
      <li className="col-span-3 flex items-center text-stone-500">{department}</li>
      <li className="col-span-2 flex items-center text-stone-500">{year}</li>
      <li className="col-span-3 flex items-center text-stone-500">{fineDue}</li>
      <li className="col-span-3 flex items-center gap-2 text-stone-500">
        <button className="px-2 py-1 text-black bg-blue-200 rounded-sm">edit</button>
        <button className="px-2 py-1 text-black bg-blue-200 rounded-sm">delet</button>
      </li>
    </ul>
  )
}

export default Member