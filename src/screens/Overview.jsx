import React, { useEffect } from 'react'
import Card from '../Components/Card'
import OverdueCard from '../components/OverdueCard';
import RequestCard from '../components/RequestCard';
import { useSelector, useDispatch } from 'react-redux'
import { fetachedBooksData } from '../features/BookSlice'
import { fetchedMembersData } from '../features/MemberSlice'

import { FaBook, FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";
import { FaHandHolding } from "react-icons/fa6";

function Overview() {
  const dispatch = useDispatch()

  const { books } = useSelector((state) => state.books)
  const { members } = useSelector((state) => state.members)

  console.log(books, members);

  useEffect(() => {
    dispatch(fetachedBooksData())
    dispatch(fetchedMembersData())
  }, [])

  return (
    <div className="w-full h-full">
      <div className="w-full h-fit grid grid-cols-12 grid-rows-30 gap-5 p-3">

        {/* card one container */}
        <div className="col-span-4 row-span-10">
          <Card booksNum={210} info={"borrowed"} num1={"+12"} num2={"+5%"}>
            <FaBook className="text-4xl text-blue-500" />
          </Card>
        </div>

        {/* card two container */}
        <div className="col-span-4 row-span-10">
          <Card booksNum={32} info={"books overdue"} num1={"-2%"} num2={"$860"} >
            <FaRegClock className="text-4xl text-blue-500" />
          </Card>
        </div>

        {/* card three container */}
        <div className="col-span-4 row-span-10">
          <Card booksNum={340} info={"visitors"} num1={"+42"} num2={"+102%"} >
            <FiUsers className="text-4xl text-blue-500" />
          </Card>
        </div>

        {/* bootom container with two section */}
        <div className="col-span-12 row-span-20 grid grid-cols-2 gap-5">

          {/* Overdue section */}
          <section className="col-span-1 h-[35rem] flex flex-col border border-blue-200 rounded-lg">
            {/* overvue books header */}
            <div className="w-full h-[4rem] flex justify-between items-center px-5">
              <div className="flex items-center gap-3">
                <FaRegClock className="text-lg text-blue-500" />
                <span className="text-base font-semibold">Overdue details</span>
              </div>

              <button>
                <MdArrowForwardIos className="text-lg text-blue-500" />
              </button>
            </div>

            {/* details */}
            <div className="w-full h-full overflow-scroll">
              <OverdueCard />
              <OverdueCard />
              <OverdueCard />
              <OverdueCard />
              <OverdueCard />
              <OverdueCard />
              <OverdueCard />
              <OverdueCard />
            </div>
          </section>

          {/* Requested books container */}
          <section className="col-span-1 h-[35rem] flex flex-col border border-blue-200 rounded-lg">
            {/* request books header */}
            <div className="w-full h-[4rem] flex justify-between items-center px-5">
              <div className="flex items-center gap-3">
                <FaHandHolding className="text-xl text-blue-500" />
                <span className="text-base font-semibold">Book requests</span>
              </div>

              <button>
                <MdArrowForwardIos className="text-lg text-blue-500" />
              </button>
            </div>

            {/* details */}
            <div className="w-full h-full overflow-scroll">
              <RequestCard />
              <RequestCard />
              <RequestCard />
              <RequestCard />
              <RequestCard />
              <RequestCard />
              <RequestCard />
              <RequestCard />
              <RequestCard />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Overview