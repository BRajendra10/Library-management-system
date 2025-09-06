import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext';
import { useSelector } from 'react-redux';
import Member from './Member';

function AllMembers() {
  const { searchMember } = useContext(SearchContext);
  const { members } = useSelector((state) => state.members);

  return (
    <div className="w-full h-fit flex flex-col gap-1 px-2 lg:px-4">
      {searchMember.length >= 1 ? 
                searchMember.map((el, index) => <Member data={el} key={index} />) 
                : members.map((el, index) => <Member data={el} key={index} />)}
    </div>
  );
}

export default AllMembers;