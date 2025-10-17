import React from 'react'
import { useNavigate } from "react-router";

function Member({ data, index }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile", { state: { member: data } })
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-xl rounded-xl p-5 gap-3" key={index}>
      <img className="w-15 h-15 rounded-full" src={data.profileImage} alt="" />

      <div className="flex flex-col items-center">
        <h3 className="text-sm font-bold">{data.name}</h3>
        <span className="text-sm font-semibold text-blue-950">#{data.membershipId}</span>
      </div>

      <div className="w-full h-fit flex justify-between">
        <div className="flex-1 flex flex-col items-center border-r border-zinc-300">
          <span className="text-sm font-semibold">{data.membershipType}</span>
          <span className="text-xs text-zinc-500">Membership</span>
        </div>

        <div className="flex-1 flex flex-col items-center border-l border-zinc-300">
          <span className="text-sm font-semibold">{data.status}</span>
          <span className="text-xs text-zinc-500">Status</span>
        </div>
      </div>

      <button className="w-full p-2 text-white text-sm rounded-lg bg-blue-900" onClick={() => handleClick()}>View profile</button>
    </div>
  )
}

export default Member