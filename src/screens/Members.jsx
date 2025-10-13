import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import Member from '../components/Member';

import { GrSearch } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";

function Members() {
  const { members } = useSelector((state) => state.members);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        const results = members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()));
        setResult(results);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, members])

  const handleClick = () => {
    setQuery("");
    setResult([]);
  }

  return (
    <div className="w-full h-screen grid grid-cols-14 bg-blue-100 p-3 md:p-5 overflow-y-auto">
      <div className="xl:col-start-2 col-span-14 xl:col-span-12 flex flex-col gap-5">
        <h1 className="text-xl font-semibold">Members</h1>

        <div className="w-full h-fit flex justify-between items-center">
          <div className="w-fit flex items-center rounded-lg px-2 py-1 bg-blue-200/50">
            {result.length > 0 ? <IoCloseSharp size={18} onClick={() => handleClick()} /> :<GrSearch size={18} />}
            <input className="w-100 h-10 outline-none p-2 ml-3" type="text" placeholder="Search members by name, membership type" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <button className="bg-blue-950 text-sm text-white rounded-lg px-4 py-3">+ Add member</button>
        </div>

        <div className="w-full h-fit grid grid-cols-4 gap-5">
          {result.length >= 1 ? result.map((el) => <Member data={el} />) : members.map((el) => <Member data={el} />)}
        </div>

      </div>
    </div>
  )
}

export default Members