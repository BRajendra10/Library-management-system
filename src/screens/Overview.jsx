import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { fetachedBooksData } from '../features/BookSlice'
import { fetchedMembersData } from '../features/MemberSlice'

function Overview() {
  const dispatch = useDispatch()

  const {books} = useSelector((state)=>state.books)
  const {members} = useSelector((state)=>state.members)

 

  useEffect(()=>{
    dispatch(fetachedBooksData())
    dispatch(fetchedMembersData())
  },[])

  return (
    <div className="w-full h-220 flex justify-center items-center bg-stone-200">
        <h1 className="text-4xl">Overview =</h1> 
        <h2 className='text-2xl'>{books.length} Books ,  </h2>
        <h2 className='text-2xl'>{members.length} Members </h2>
    </div>
  )
}

export default Overview