import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { MemberContext } from '../context/editmemberContext';
import { delteMember } from '../features/MemberSlice';

function Member({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleEdit, handleId } = useContext(MemberContext);
  const { id, userImage, name, email, phone, lastVisited, department, year, fineDue } = data;

  const handleEditMember = () => {
    handleId(id);
    handleEdit(data);
    navigate('/register');
  }

  const handleDeleteMember = () => {
    dispatch(delteMember({id}));
  }

  return (
    <ul className="w-full h-[4.5rem] grid grid-cols-25 p-2 gap-1 text-sm rounded-md hover:bg-gray-100 transition-shadow">
      <li className="flex items-center">
        <input className="w-4 h-4" type="checkbox" />
      </li>

      <li className="col-span-5 flex items-center gap-3">
        <img className="w-11 h-11 rounded-full object-cover shadow-sm" src={userImage} alt={name} />
        <div className="flex flex-col">
          <span className="text-gray-900 font-semibold truncate">{name}</span>
          <span className="text-gray-500 text-sm truncate">{email}</span>
        </div>
      </li>

      <li className="col-span-2 flex items-center text-gray-900">ID {id}</li>
      <li className="col-span-3 flex items-center text-gray-900">{phone}</li>
      <li className="col-span-3 flex items-center text-gray-900">{lastVisited}</li>
      <li className="col-span-3 flex items-center text-gray-900">{department}</li>
      <li className="col-span-2 flex items-center text-gray-900">{year ? year : "--"}</li>
      <li className="col-span-3 flex items-center text-gray-900">
        <span className={`${fineDue > 0 ? "text-red-500 font-medium" : "text-gray-900"}`}>
          {fineDue}
        </span>
      </li>

      <li className="col-span-3 flex items-center gap-2">
        <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition" onClick={() => handleEditMember()}>
          <TbEdit size={18} />
        </button>
        <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition" onClick={handleDeleteMember}>
          <MdDeleteOutline size={18} />
        </button>
      </li>
    </ul>
  )
}

export default Member