import { useState } from 'react';

export const usePagination = (itemsPerPage, totalItems) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return totalItems.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(totalItems.length / itemsPerPage);
  

  return {
    currentPage,
    paginate,
    currentItems,
    totalPages,
  };
};
