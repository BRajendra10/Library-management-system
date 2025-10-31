import React, { useState } from "react";
// import { useLocation } from "react-router";
import { MdEmail } from "react-icons/md";
import { FaBookOpen, FaDollarSign } from "react-icons/fa";

import { delteMember } from "../features/MemberSlice";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

// Reusable component for displaying a label + value + optional icon
function DetailItem({ icon, label, value, valueClass }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-xl shadow-sm">
      {icon && <span className="text-blue-950">{icon}</span>}
      <span className="font-medium text-blue-950">{label}:</span>
      <span className={valueClass || "text-blue-950"}>{value}</span>
    </div>
  );
}

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { member } = location.state;

  const handleDelete = () => {
    dispatch(delteMember(member.id));
    navigate("/members");
  }

  const handleEdit = () => {
     navigate("/register", { state: { member: member } })
  }

  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-6 transition-transform transform hover:scale-105">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 bg-blue-950 rounded-xl p-4 text-white">
          <img
            src={member.profileImage}
            alt={member.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
          />
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-3xl font-bold">{member.name}</h2>
            <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-950 font-medium">
              {member.membershipType}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex border-b border-blue-200">
          <button
            className={`py-2 px-4 font-semibold ${activeTab === "info" ? "border-b-2 border-blue-950 text-blue-950" : "text-blue-400"
              }`}
            onClick={() => setActiveTab("info")}
          >
            Profile Info
          </button>
          <button
            className={`py-2 px-4 font-semibold ${activeTab === "books" ? "border-b-2 border-blue-950 text-blue-950" : "text-blue-400"
              }`}
            onClick={() => setActiveTab("books")}
          >
            Borrowed Books
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4 space-y-4">
          {activeTab === "info" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem icon={<MdEmail size={20} />} label="Email" value={member.email} />
              <DetailItem label="Membership ID" value={member.membershipId} />
              <DetailItem
                label="Status"
                value={member.status}
                valueClass={member.status === "Active" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}
              />
              <DetailItem icon={<FaDollarSign />} label="Fine" value={`$${member.fine}`} />
              <DetailItem icon={<FaBookOpen />} label="Borrowed Books" value={member.borrowedBooks.length} />
            </div>
          )}

          {activeTab === "books" && (
            <div>
              {member.borrowedBooks.length === 0 ? (
                <p className="text-blue-400 text-center py-8">No borrowed books yet.</p>
              ) : (
                <ul className="space-y-2">
                  {member.borrowedBooks.map((book, index) => (
                    <li
                      key={index}
                      className="p-3 bg-blue-100 rounded-xl shadow-sm flex justify-between items-center"
                    >
                      <span className="text-blue-950">{book.title}</span>
                      <span className="text-blue-400 text-sm">{book.dueDate}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
          <button
            onClick={() => handleEdit()}
            className="flex-1 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-xl transition transform hover:scale-105"
          >
            Edit Profile
          </button>
          <button
            onClick={() => handleDelete()}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition transform hover:scale-105"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
