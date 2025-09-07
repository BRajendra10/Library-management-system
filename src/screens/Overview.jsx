import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OverdueCard from '../components/OverdueCard';
import RequestCard from '../components/RequestCard';
import Card from '../Components/Card'

import { RiArrowDownWideLine, RiArrowRightWideLine } from "react-icons/ri";
import { FaBook, FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaHandHolding } from "react-icons/fa6";

function Overview() {
  const { books } = useSelector((state) => state.books);
  const { overdueBooks } = useSelector((state) => state.overDue);
  const { requestbooks } = useSelector((state) => state.requestbooks);
  const { borrowedBooks } = useSelector((state) => state.borrowedBooks);
  const [accordion1, setAccordion1] = useState(false);
  const [accordion2, setAccordion2] = useState(true);

  return (
    <div className="w-full h-fit grid grid-cols-12 bg-white">

      {/* Top Cards Section */}
      <div className="col-span-12 p-5">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <Card count={books.length} label="Books" lavel="w-4/5">
            <FiUsers className="text-3xl text-blue-500" />
          </Card>
          
          <Card count={borrowedBooks.length} label="Borrowed Books" lavel="w-2/5">
            <FaBook className="text-3xl text-blue-500" />
          </Card>

          <Card count={overdueBooks.length} label="Overdue Books" lavel="w-2/5">
            <FaRegClock className="text-3xl text-blue-500" />
          </Card>

          <Card count={requestbooks.length} label="Book Requests" lavel="w-1/5">
            <FaHandHolding className="text-3xl text-blue-500" />
          </Card>
        </div>
      </div>


      {/* 🔹 Bottom sections */}
      <div className="col-span-12 grid grid-cols-1 2xl:grid-cols-2 gap-5 px-5">

        {/* Overdue Books */}
        <section className={`relative ${accordion1 ? "h-[30rem]" : "h-fit"} 2xl:h-[40rem] flex flex-col border border-blue-200 rounded-lg overflow-y-auto`}>
          {/* Header */}
          <div className="sticky top-0 left-0 w-full min-h-[3.5rem] flex justify-between items-center px-5 bg-white z-10" onClick={() => {
            if (accordion1 === true && accordion2 === false) {
              setAccordion1(false);
            } else if (accordion1 === false && accordion2 === true) {
              setAccordion2(false);
              setAccordion1(true);
            } else {
              setAccordion1(true);
            }
          }}>
            <div className="flex items-center gap-3">
              <FaRegClock className="text-lg text-blue-500" />
              <span className="text-base font-semibold">Overdue details</span>
            </div>
            {accordion1 ? <RiArrowRightWideLine className="text-2xl font-bold text-blue-500" /> : <RiArrowDownWideLine className="text-2xl font-bold text-blue-500" />}
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
          <div className="sticky top-0 left-0 w-full min-h-[3.5rem] flex justify-between items-center px-5 bg-white z-10" onClick={() => {
            if (accordion2 === true && accordion1 === false) {
              setAccordion2(false);
            } else if (accordion2 === false && accordion1 === true) {
              setAccordion1(false);
              setAccordion2(true);
            } else {
              setAccordion2(true);
            }
          }}>
            <div className="flex items-center gap-3">
              <FaHandHolding className="text-xl text-blue-500" />
              <span className="text-base font-semibold">Book requests</span>
            </div>
            {accordion2 ? <RiArrowRightWideLine className="text-2xl font-bold text-blue-500" /> : <RiArrowDownWideLine className="text-2xl font-bold text-blue-500" />}
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
