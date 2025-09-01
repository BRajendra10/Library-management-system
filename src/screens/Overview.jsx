import React, { useEffect } from 'react'
import Card from '../Components/Card'
import OverdueCard from '../components/OverdueCard';
import RequestCard from '../components/RequestCard';
import { useSelector, useDispatch } from 'react-redux'
import { setTotalFine } from '../features/overdueSlice'

import { FaBook, FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";
import { FaHandHolding } from "react-icons/fa6";
import { Navigate, useNavigate } from 'react-router-dom';


function Overview() {
 const navigate=useNavigate()
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books)
  const { members } = useSelector((state) => state.members)
  const { overdueBooks, Fine } = useSelector((state) => state.overDue);
  const { requestbooks } = useSelector((state) => state.requestbooks);

  useEffect(() => {
    dispatch(setTotalFine(overdueBooks))
  }, [overdueBooks, dispatch])

  return (
    <div className="w-full h-fit grid grid-cols-12">

      {/* card one container */}
      <div className="col-span-12 h-[20rem] p-5 overflow-x-auto">
        <div className="h-full flex gap-5 min-w-max xl:grid xl:grid-cols-3 xl:gap-5 xl:overflow-x-visible">

          {/* Card 1 */}
          <div className="min-w-[25rem]">
            <Card booksNum={books.length} info={"borrowed"} num1={"+12"} num2={"+5%"}>
              <FaBook className="text-4xl text-blue-500" />
            </Card>
          </div>

          {/* Card 2 */}
          <div className="min-w-[25rem]">
            <Card booksNum={overdueBooks.length} info={"books overdue"} num1={"-2%"} num2={`₹ ${Fine}`} >
              <FaRegClock className="text-4xl text-blue-500" />
            </Card>
          </div>

          {/* Card 3 */}
          <div className="min-w-[25rem]">
            <Card booksNum={members.length} info={"visitors"} num1={"+42"} num2={"+102%"} >
              <FiUsers className="text-4xl text-blue-500" />
            </Card>
          </div>

        </div>
      </div>


      {/* bootom container with two section */}
      <div className="col-span-12 h-full grid grid-cols-12 gap-5 px-5">

        <section className="relative col-span-6 h-[35rem] flex flex-col border border-blue-200 rounded-lg overflow-scroll">
          {/* overvue books header */}
          <div className="sticky top-0 left-0 w-full h-[4rem] flex justify-between items-center px-5 bg-white z-5">
            <div className="flex items-center gap-3">
              <FaRegClock className="text-lg text-blue-500" />
              <span className="text-base font-semibold">Overdue details</span>
            </div>

            <button onClick={() => navigate("/books")}>
              <MdArrowForwardIos className="text-lg text-blue-500" />
            </button>
          </div>

          {/* details */}
          <div className="absolute top-12 left-0 w-full h-fit z-3">
            {overdueBooks.map((el) => <OverdueCard data={el} />)}
          </div>
        </section>

        {/* Requested books container */}
        <section className="relative col-span-6 h-[35rem] flex flex-col border border-blue-200 rounded-lg overflow-scroll">
          {/* request books header */}
          <div className="sticky top-0 left-0 w-full h-[4rem] flex justify-between items-center px-5 z-5 bg-white">
            <div className="flex items-center gap-3">
              <FaHandHolding className="text-xl text-blue-500" />
              <span className="text-base font-semibold">Book requests</span>
            </div>

            <button onClick={() => navigate("/books")}>
              <MdArrowForwardIos className="text-lg text-blue-500" />
            </button>
          </div>

          {/* details */}
          <div className="absolute top-12 left-0 w-full h-fit  z-3">
            {requestbooks.map((el) => <RequestCard id={el.id} data={el} />)}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Overview