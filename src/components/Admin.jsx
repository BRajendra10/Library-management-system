import React from 'react';
import { useSelector } from 'react-redux';
import Member from './Member';

function Admin() {
  const { members } = useSelector((state) => state.members);
    const admin = members?.filter((member) => member.membershipType === 'admin') || [];

  return (
    <div className="w-full h-fit flex flex-col gap-1">
      {admin?.length ? (
        admin.map((el) => <Member key={el.id} data={el} />)
      ) : (
        <p className="p-2 text-stone-500">No admins found.</p>
      )}
    </div>
  );
}

export default Admin;