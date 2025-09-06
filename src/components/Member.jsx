import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { MemberContext } from "../context/editmemberContext";
import { delteMember } from "../features/MemberSlice";

function Member({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleEdit, handleId } = useContext(MemberContext);
  const { login } = useSelector((state) => state.login);
  const { id, userImage, name, email, phone, lastVisited, department, year, fineDue } = data;

  const handleEditMember = () => {
    if (login.membershipType === "admin") {
      handleId(id);
      handleEdit(data);
      navigate("/register");
    } else {
      navigate('/');
    }
  };

  const handleDeleteMember = () => {
    if (login.membershipType === "admin") {
      dispatch(delteMember({ id }));
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {/* Desktop / Large Screen Table Row */}
      <ul
        className="hidden md:grid w-full min-h-[4.5rem] grid-cols-24 items-center p-2 gap-1 text-sm rounded-md hover:bg-gray-100 transition-shadow"
        key={id}
      >

        <li className="col-span-5 flex items-center gap-3 overflow-hidden">
          <img
            className="w-11 h-11 rounded-full object-cover shadow-sm shrink-0"
            src={userImage}
            alt={name}
          />
          <div className="flex flex-col truncate">
            <span className="text-gray-900 font-semibold truncate">{name}</span>
            <span className="text-gray-500 text-sm truncate">{email}</span>
          </div>
        </li>

        <li className="col-span-2 truncate text-gray-900">ID {id}</li>
        <li className="col-span-3 truncate text-gray-900">{phone}</li>
        <li className="col-span-3 truncate text-gray-900">{lastVisited}</li>
        <li className="col-span-3 truncate text-gray-900">{department}</li>
        <li className="col-span-2 truncate text-gray-900">{year || "--"}</li>
        <li className="col-span-3 truncate">
          <span
            className={`${fineDue > 0 ? "text-red-500 font-medium" : "text-gray-900"
              }`}
          >
            {fineDue}
          </span>
        </li>

        <li className="col-span-3 flex items-center gap-2">
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            onClick={handleEditMember}
          >
            <TbEdit size={18} />
          </button>
          <button
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            onClick={handleDeleteMember}
          >
            <MdDeleteOutline size={18} />
          </button>
        </li>
      </ul>

      {/* Mobile / Card Layout */}
      <div className="md:hidden w-full bg-white rounded-lg shadow-sm p-3">
        {/* Top Row */}
        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12 rounded-full object-cover shadow-sm"
            src={userImage}
            alt={name}
          />
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="font-semibold text-gray-900 truncate">{name}</span>
            <span className="text-xs text-gray-500 truncate">{email}</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={handleEditMember}
            >
              <TbEdit size={18} />
            </button>
            <button
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              onClick={handleDeleteMember}
            >
              <MdDeleteOutline size={18} />
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700">
          <span className="truncate">
            <b>ID:</b> {id}
          </span>
          <span className="truncate">
            <b>Phone:</b> {phone}
          </span>
          <span className="truncate">
            <b>Visited:</b> {lastVisited}
          </span>
          <span className="truncate">
            <b>Dept:</b> {department}
          </span>
          <span className="truncate">
            <b>Year:</b> {year || "--"}
          </span>
          <span
            className={`truncate ${fineDue > 0 ? "text-red-500 font-medium" : "text-gray-900"
              }`}
          >
            <b>Fine:</b> {fineDue}
          </span>
        </div>
      </div>
    </>
  );
}

export default Member;
