import React from 'react'
import { useLocation } from 'react-router';


function Description() {
    const location = useLocation();
    const {bookData} = location.state;
    console.log(bookData);

    return (
        <div>Description</div>
    )
}

export default Description