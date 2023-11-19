"use client"

import React, { useEffect, useState } from 'react'
import "./Pagination.css"
import { Icon } from '@iconify/react';

interface PaginationProps {
  setCurrentPage:(currentPage:number) => void;
  count:number;
  rowsPerPage:number;
  filteredData: any[];
  currentPage: any;
}  

export const Pagination: React.FC<PaginationProps> = ({setCurrentPage ,count, rowsPerPage, filteredData, currentPage}) => {
  count = Math.ceil(count / rowsPerPage);

  const numberOfPages:number[] = []
  for (let i = 1; i <= count; i++) {
    numberOfPages.push(i)
  }

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<any[]>([])

  useEffect(() => {
    let tempNumberOfPages:(number | string)[] = [...arrOfCurrButtons]

    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    }

    else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    }

    else if (currentPage === 4) {
      const sliced = numberOfPages.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    }
    
    else if (currentPage > 4 && currentPage < numberOfPages.length - 2) {              
      const sliced1 = numberOfPages.slice(currentPage - 2, currentPage)                
      const sliced2 = numberOfPages.slice(currentPage, currentPage + 1)                 
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) 
    }
    
    else if (currentPage > numberOfPages.length - 3) {                 // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4) 
      tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
    }
    
    else if (currentPage === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3 
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or 
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1)
    }
    else if (currentPage === dotsRight) {
      setCurrentPage(arrOfCurrButtons[3] + 2)
    }
    
    else if (currentPage === dotsLeft) {
      setCurrentPage(arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentPage);

  }, [currentPage , filteredData])


    return (
    <>
    <div className="pagination-container flex-wrap">
      <div className="">
      <Icon 
      icon="solar:arrow-left-bold"
      className={`${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer opacity-100'} h-6 w-6 text-gray-500`}
      onClick={() => setCurrentPage(currentPage <= 1 ? currentPage : currentPage - 1)}/>
      
      </div>

    {arrOfCurrButtons.map(((item, index) => {
      return <p
      id="item"
      key={index}
      className={`flex justify-center items-center h-10 w-10 border rounded-full ${currentPage === item ? 'text-white bg-red-400' : 'text-gray-500 border-slate-600'} cursor-pointer transition-colors duration-200 hover:bg-red-300 hover:text-slate-100`}
      onClick={() => setCurrentPage(item)}
      >
        {item}
      </p>
    }))}
    <Icon 
    icon="solar:arrow-right-bold"
    className={`${currentPage === count ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer opacity-100'} h-6 w-6 text-gray-500`}
    onClick={() => setCurrentPage(currentPage >= numberOfPages.length ? currentPage : currentPage + 1)}
    />
      
  </div>
    </>
);
}
