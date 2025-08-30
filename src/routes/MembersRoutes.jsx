import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Members from '../screens/Members'
import AllMembers from '../components/AllMembers';
import Students from '../components/Students';
import Admin from '../components/Admin'

export default function MembersRoute() {
    return (
        <Routes>
            <Route path="/" element={<Members />}>
                <Route index element={<AllMembers />} />
                <Route path="/students" element={<Students />} />
                <Route path="/admin" element={<Admin />} />
            </Route>
        </Routes>
    )
}

