import React from 'react';
import { useSelector } from 'react-redux';
import Member from './Member';

function Students() {
  const { members } = useSelector((state) => state.members);
  const students = members?.filter((member) => member.membershipType === 'student') || [];

  return (
    <div className="w-full h-fit flex flex-col gap-1">
      {students.length ? (
        students.map((el) => <Member key={el.id} data={el} />)
      ) : (
        <p className="p-2 text-stone-500">No students found.</p>
      )}
    </div>
  );
}

export default Students;