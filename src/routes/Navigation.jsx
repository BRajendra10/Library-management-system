import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Overview from '../screens/Overview'
import Members from '../screens/Members';
import Books from '../screens/Books'
import Settings from '../screens/Settings'
import About from '../screens/About'
import HelpSupport from '../screens/HelpSupport'
import Login from '../components/Login';

function Navigation() {
    return (
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default Navigation