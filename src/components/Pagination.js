import React from 'react';

export default function Pagination({ page, total, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button className="page-btn" onClick={onPrev} disabled={page <= 1}>
        Previous
      </button>
      <div className="page-info">
        Page {page} / {total}
      </div>
      <button className="page-btn" onClick={onNext} disabled={page >= total}>
        Next
      </button>
    </div>
  );
}
