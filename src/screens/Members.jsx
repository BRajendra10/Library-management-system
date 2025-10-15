import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Member from "../components/Member";
import { GrSearch } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";

function Members() {
  const navigate = useNavigate();
  const { members } = useSelector((state) => state.members);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [dropdown, setDropdown] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        const filtered = members.filter((member) =>
          member.name.toLowerCase().includes(query.toLowerCase())
        );
        setResult(filtered);
        setDropdown(filtered);
      } else {
        setResult([]);
        setDropdown([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, members]);

  const handleClick = () => {
    setQuery("");
    setResult([]);
    setDropdown([]);
  };

  const handleChange = (value) => {
    setQuery(value);
    if (!value) {
      setResult([]);
      setDropdown([]);
    }
  };

  const handleSelect = (member) => {
    setQuery(member.name);
    setResult([member]);
    setDropdown([]);
  };

  return (
    <div className="w-full h-screen grid grid-cols-14 bg-blue-100 p-3 md:p-5 overflow-y-auto">
      <div className="xl:col-start-2 col-span-14 xl:col-span-12 flex flex-col gap-5 relative">
        <h1 className="text-3xl font-semibold">Members</h1>

        <div className="w-full h-fit flex justify-between items-center relative">
          {/* Search box */}
          <div className="relative w-fit flex items-center rounded-lg px-2 py-1 bg-blue-200/50">
            {query ? (
              <IoCloseSharp size={18} onClick={handleClick} className="cursor-pointer" />
            ) : (
              <GrSearch size={18} />
            )}
            <input
              className="w-80 h-10 outline-none p-2 ml-3 bg-transparent"
              type="text"
              placeholder="Search members by name, membership type"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
            />

            {/* Dropdown */}
            {dropdown.length > 0 && (
              <ul className="absolute top-12 left-0 w-full bg-white border border-blue-200 rounded-sm shadow-lg max-h-60 overflow-y-auto z-10">
                {dropdown.map((member) => (
                  <li
                    key={member.id}
                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleSelect(member)}
                  >
                    <span className="font-medium">{member.name}</span>
                    {member.membershipType && (
                      <span className="text-stone-500 text-sm">
                        {" "}({member.membershipType})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="bg-blue-950 text-sm text-white rounded-lg px-4 py-3"
            onClick={() => navigate("/register")}
          >
            + Add new member
          </button>
        </div>

        {/* Members Grid */}
        <div className="w-full h-fit grid grid-cols-5 gap-5">
          {members.map((el, index) => (
            <Member data={el} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Members;
