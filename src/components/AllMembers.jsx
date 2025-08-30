import React from 'react';
import { useSelector } from 'react-redux';
import Member from './Member';

function AllMembers() {
  const { members } = useSelector((state) => state.members);

  return (
    <div className="w-full h-fit flex flex-col gap-1">
      {members?.length ? (
        members.map((el) => <Member key={el.id} data={el} />)
      ) : (
        <p className="p-2 text-stone-500">No members found.</p>
      )}
    </div>
  );
}

export default AllMembers;