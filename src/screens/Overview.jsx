import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import OverdueCard from '../components/OverdueCard';
import RequestCard from '../components/RequestCard';
import { useSelector, useDispatch } from 'react-redux'
import { setTotalFine } from '../features/overdueSlice'

import { FaBook, FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";
import { FaHandHolding } from "react-icons/fa6";

function Overview() {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books)
  const { members } = useSelector((state) => state.members)
  const { overdueBooks, Fine } = useSelector((state) => state.overDue);
  const { requestbooks } = useSelector((state) => state.requestbooks);
  const [accordion1, setAccordion1] = useState(false);
  const [accordion2, setAccordion2] = useState(true);

  useEffect(() => {
    dispatch(setTotalFine(overdueBooks))
  }, [overdueBooks, dispatch])

  return (
    <div className="w-full h-fit grid grid-cols-12 bg-white">

      {/* Top Cards Section */}
      <div className="col-span-12 p-5">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <Card count={books.length} label="Borrowed Books">
            <FaBook className="text-3xl text-blue-500" />
          </Card>

          <Card count={overdueBooks.length} label="Overdue Books">
            <FaRegClock className="text-3xl text-blue-500" />
          </Card>

          <Card count={members.length} label="Visitors">
            <FiUsers className="text-3xl text-blue-500" />
          </Card>

          <Card count={requestbooks.length} label="Book Requests">
            <FaHandHolding className="text-3xl text-blue-500" />
          </Card>
        </div>
      </div>


      {/* 🔹 Bottom sections */}
      <div className="col-span-12 grid grid-cols-1 2xl:grid-cols-2 gap-5 px-5">

        {/* Overdue Books */}
        <section className={`relative ${accordion1 ? "h-[30rem]" : "h-fit"} 2xl:h-[40rem] flex flex-col border border-blue-200 rounded-lg overflow-y-auto`}>
          {/* Header */}
          <div className="sticky top-0 left-0 w-full min-h-[3.5rem] flex justify-between items-center px-5 bg-white z-10">
            <div className="flex items-center gap-3">
              <FaRegClock className="text-lg text-blue-500" />
              <span className="text-base font-semibold">Overdue details</span>
            </div>
            <button onClick={() => {
              setAccordion1(!accordion1);
              setAccordion2(!accordion2);
            }}>
              <MdArrowForwardIos className="text-lg text-blue-500" />
            </button>
          </div>

          {/* Content */}
          <div className={`${accordion1 ? "" : "hidden"} absolute top-12 left-0 w-full h-fit 2xl:flex flex-col z-5`}>
            {overdueBooks.map((el) => (
              <OverdueCard key={el.id} data={el} />
            ))}
          </div>
        </section>

        {/* Book Requests */}
        <section className={`relative ${accordion2 ? "h-[30rem]" : "h-fit"} 2xl:h-[40rem] flex flex-col border border-blue-200 rounded-lg overflow-y-auto`}>
          {/* Header */}
          <div className="sticky top-0 left-0 w-full min-h-[3.5rem] flex justify-between items-center px-5 bg-white z-10">
            <div className="flex items-center gap-3">
              <FaHandHolding className="text-xl text-blue-500" />
              <span className="text-base font-semibold">Book requests</span>
            </div>
            <button onClick={() => {
              setAccordion2(!accordion2);
              setAccordion1(!accordion1);
            }}>
              <MdArrowForwardIos className="text-lg text-blue-500" />
            </button>
          </div>

          {/* Content */}
          <div className={`${accordion2 ? "" : "hidden"} absolute top-12 left-0 w-full h-fit 2xl:flex flex-col z-5`}>
            {requestbooks.map((el) => (
              <RequestCard key={el.id} id={el.id} data={el} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default Overview
