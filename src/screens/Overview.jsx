import React from 'react'
import { useSelector } from "react-redux";

import Card from '../Components/Card'

import { IoIosBookmarks } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

function Overview() {
  const { totalBooks } = useSelector((state) => state.books);
  const { totalMembers } = useSelector((state) => state.members);
  const data = [
    {
      subject: 'Programming',
      A: 10,
      fullMark: 20,
    },
    {
      subject: 'Science',
      A: 10,
      fullMark: 20,
    },
    {
      subject: 'Romance',
      A: 3,
      fullMark: 20,
    },
    {
      subject: 'Mathematics',
      A: 10,
      fullMark: 20,
    },
    {
      subject: 'Fiction',
      A: 3,
      fullMark: 20,
    },
    {
      subject: 'Philosophy',
      A: 3,
      fullMark: 20,
    },
  ];

  return (
    <div className="w-full h-screen grid grid-cols-12 bg-blue-100 p-3 md:p-5">
      <div className="xl:col-start-2 col-span-12 xl:col-span-10 flex flex-col gap-5">

        <div className="w-full h-fit grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title={"Total Books"} count={totalBooks} >
            <IoIosBookmarks size={18} className="text-white" />
          </Card>

          <Card title={"Issued Books"} count={"0"} >
            <IoIosBookmarks size={18} className="text-white" />
          </Card>

          <Card title={"Revenu"} count={"0"} >
            <RiMoneyDollarCircleFill size={20} className="text-white" />
          </Card>

          <Card title={"Members"} count={totalMembers} >
            <FaUserGroup size={18} className="text-white" />
          </Card>
        </div>

        <div className="w-full h-full grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl flex justify-center items-center p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl flex justify-center items-center p-4">
            <span>Chart 2</span>
          </div>

          <div className="bg-white rounded-xl flex justify-center items-center p-4">
            <span>Don't know</span>
          </div>

          <div className="bg-white rounded-xl flex justify-center items-center p-4">
            <span>Don't know</span>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Overview
