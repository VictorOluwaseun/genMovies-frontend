import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

//Before you build a resusable component, think of the interface the component
//like what are input stack components what are the events is going to raised. The best to design a component is to use it before implementing it

const Pagination = props => {
 const { itemsCount, pageSize, currentPage, onPageChange } = props;

 const pagesCount = Math.ceil(itemsCount / pageSize);
 //[1 ...pageCount].map()
 if (pagesCount === 1) return null;

 const pages = _.range(1, pagesCount + 1);
 //  if (pages.length === 1) return null;

 return (
  <nav aria-label="Page navigation example">
   <ul className="pagination">
    {pages.map(page => (
     <li
      key={page}
      className={currentPage === page ? "page-item active" : "page-item"}
     >
      <a className="page-link" onClick={() => onPageChange(page)}>
       {page}
      </a>
     </li>
    ))}
   </ul>
  </nav>
 );
};

Pagination.propTypes = {
 itemsCount: PropTypes.number.isRequired,
 pageSize: PropTypes.number.isRequired,
 currentPage: PropTypes.number.isRequired,
 onPageChange: PropTypes.func.isRequired
};

export default Pagination;
