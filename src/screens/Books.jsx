import React from 'react'
import { useSelector } from 'react-redux';
import Book from '../components/Book';

function Books() {
  const { books } = useSelector((state) => state.books);

  return (
    <div className="w-full h-screen grid grid-cols-12 bg-blue-100 p-3 md:p-5 gap-5 overflow-y-scroll">
      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Programming</h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {books.map((el, index) => (el.category === "Programming") && <Book data={el} key={index} />)}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Mathematics</h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {books.map((el, index) => (el.category === "Mathematics") && <Book data={el} key={index} />)}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Science</h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {books.map((el, index) => (el.category === "Science") && <Book data={el} key={index} />)}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Romance</h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {books.map((el, index) => (el.category === "Romance") && <Book data={el} key={index} />)}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Fiction</h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {books.map((el, index) => (el.category === "Fiction") && <Book data={el} key={index} />)}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-8">
        <h2 className="text-xl font-semibold">Self-Help</h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {books.map((el, index) => (el.category === "Self-Help") && <Book data={el} key={index} />)}
        </div>
      </div>

      <div className="col-span-12 flex flex-col border-b border-zinc-400 gap-5 p-5">
        <h2 className="text-xl font-semibold">Philosophy</h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {books.map((el, index) => (el.category === "Philosophy") && <Book data={el} key={index} />)}
        </div>
      </div>

    </div>
  )
}

export default Books