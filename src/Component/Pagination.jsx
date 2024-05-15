const Pagination = ({ currentPage, onPageChange, totalPages }) => {
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages.length) {
        onPageChange(currentPage + 1);
      }
    };
  
    return (
      <div className="flex justify-center my-5">
        <button
          onClick={handlePrevious}
          className="bg-teal-500 text-white py-2 px-4 rounded-l-md"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {totalPages.map((page) => (
          <span
            key={page}
            className={`py-2 px-4  ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white/60'}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </span>
        ))}
        <button
          onClick={handleNext}
          className="bg-teal-500 text-white py-2 px-4 rounded-r-md"
          disabled={currentPage === totalPages.length}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  