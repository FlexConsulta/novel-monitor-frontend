import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationComponent(props) {

  const { togglePage, totalPages, page } = props;

  useEffect(() => {
    setRow(Array.from({ length: totalPages }, (f, g) => g + 1))
  }, [totalPages])

  const [row, setRow] = useState(Array.from({ length: totalPages }, (f, g) => g + 1));

  function renderPaginate(ele) {
    togglePage(ele);

    if (ele > 4 && ele < totalPages - 4) {
      setRow(Array.from({ length: totalPages }, (f, g) => g + ele - 4));
    } else if (ele <= 4) {
      setRow(Array.from({ length: totalPages }, (f, g) => g + 1));
    } else {
      setRow(Array.from({ length: totalPages }, (f, g) => g + 12));
    }
  }

  /**/

  return (
    <Pagination>
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => {
          renderPaginate(page - 1)

        }}
      />
      {row.map((ele) => (
        <Pagination.Item
          key={ele}
          active={page === ele}
          onClick={() => {
            renderPaginate(ele)
          }}
        >
          {ele}
        </Pagination.Item>
      ))}

      <Pagination.Next
        disabled={page === totalPages}
        onClick={() => {
          renderPaginate(page + 1)
        }}
      />
    </Pagination>
  );
}
