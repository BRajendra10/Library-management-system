import React from 'react'

import Card from '../Components/Card'

import { IoIosBookmarks } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

function Overview() {

  return (
    <div className="w-full h-screen grid grid-cols-12 bg-blue-100 p-3 md:p-5">
      <div className="xl:col-start-2 col-span-12 xl:col-span-10 flex flex-col gap-5">

        <div className="w-full h-fit grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title={"Total Books"} count={"20"} >
            <IoIosBookmarks size={18} className="text-white" />
          </Card>

          <Card title={"Issued Books"} count={"0"} >
            <IoIosBookmarks size={18} className="text-white" />
          </Card>

          <Card title={"Revenu"} count={"0"} >
            <RiMoneyDollarCircleFill size={20} className="text-white" />
          </Card>

          <Card title={"Members"} count={"10"} >
            <FaUserGroup size={18} className="text-white" />
          </Card>
        </div>

        <div className="w-full h-full grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl flex justify-center items-center p-4">
            <span>Chart 1</span>
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
