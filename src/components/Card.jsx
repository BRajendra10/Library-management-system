import React from 'react'

function Card({children, booksNum, info, num1, num2}) {
    return (
        <div className="w-full h-full border grid grid-cols-2 grid-rows-12 gap-5 text-center border-blue-200 bg-blue-100/20 rounded-lg p-5">
            <div className="col-span-2 row-span-7 flex justify-around items-center border-b-1 border-stone-300 gap-5">
                <div className="flex items-center gap-5">
                    <div className="inline-block border border-blue-400 rounded-full p-3">
                        {children}
                    </div>
                    <div className="text-start">
                        <h2 className="text-2xl font-bold">{booksNum}</h2>
                        <span className="text-lg text-stone-500">total {info}</span>
                    </div>
                </div>
                <div>
                    <svg className="w-full text-blue-500" width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Line (upward trend) */}
                        <path d="M5 50 L30 40 L55 35 L80 20 L110 10"
                            stroke="currentColor" strokeWidth="2" fill="none" />

                        {/* Area fill under line */}
                        <path d="M5 50 L30 40 L55 35 L80 20 L110 10 L110 60 L5 60 Z"
                            fill="url(#gradient)" />
                    </svg>
                </div>
            </div>
            <div className="row-span-5 flex flex-col justify-center items-center border-r-1 border-stone-300">
                <h3 className="text-xl font-bold">{num1}</h3>
                <span className="text-lg text-stone-500">This weak</span>
            </div>
            <div className="row-span-5 flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold">{num2}</h3>
                <span className="text-lg text-stone-500">This weak</span>
            </div>
        </div>
    )
}

export default Card