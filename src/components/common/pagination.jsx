import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            style={{ cursor: "pointer" }}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            style={{ cursor: "pointer" }}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        <li
          className={
            currentPage >= pagesCount ? "page-item disabled" : "page-item"
          }
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            style={{ cursor: "pointer" }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
