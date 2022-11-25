import React from 'react'
import ReactPaginate from 'react-paginate';
import '../../pages/global-styles/pagination.css'

const Paginate = ({ page, totalPages, handlePageClick }) => (
    <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        forcePage={page}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />
)

export default Paginate;