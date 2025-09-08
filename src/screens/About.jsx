import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MemberContext } from "../context/editmemberContext";

function About() {
    const navigate = useNavigate();
    const { handleEdit, handleId } = useContext(MemberContext);
    const { login, isLogedIn } = useSelector((state) => state.login);

    if (!isLogedIn) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-stone-100 to-stone-200">
                <p className="text-stone-600 text-lg">Please log in to view profile</p>
            </div>
        );
    }

    const handleEditMember = () => {
        if (login.membershipType === "admin") {
            handleId(login.id);
            handleEdit(login);
            navigate("/register");
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-stone-100 to-stone-200">
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-[380px] sm:w-[420px] text-center border border-stone-200 relative overflow-hidden">

                {/* Decorative gradient circle */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-stone-900 to-stone-600 rounded-full opacity-10" />

                <img
                    src={login.userImage || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-md object-cover"
                />

                <h2 className="text-2xl font-bold mt-4 text-stone-900">
                    {login.name || "Library Member"}
                </h2>
                <p className="text-stone-500 text-sm">{login.email || "No email"}</p>
                <p className="text-stone-600 mt-2 text-sm italic">
                    {login.department || "General Department"}
                </p>

                {/* Stats Section */}
                <div className="mt-6 grid grid-cols-2 gap-6">
                    <div className="bg-stone-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
                        <p className="text-xl font-semibold text-stone-900">
                            {login.issuedBooks || 0}
                        </p>
                        <p className="text-stone-500 text-xs mt-1">Books Issued</p>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
                        <p className="text-xl font-semibold text-stone-900">
                            ₹ {login.fineDue || 0}
                        </p>
                        <p className="text-stone-500 text-xs mt-1">Pending Fines</p>
                    </div>
                </div>

                {/* Action Button */}
                <button className="mt-8 px-6 py-2.5 bg-stone-900 text-white rounded-xl hover:bg-stone-700 transition shadow-md" onClick={() => handleEditMember()}>
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

export default About;
