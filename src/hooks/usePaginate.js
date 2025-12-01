import { useState } from 'react';

export default function usePaginate(items = [], perPage = 5) {
  const [page, setPage] = useState(1);
  const total = Math.max(1, Math.ceil(items.length / perPage));
  const start = (page - 1) * perPage;
  const paged = items.slice(start, start + perPage);

  function next() {
    setPage(p => Math.min(total, p + 1));
  }
  function prev() {
    setPage(p => Math.max(1, p - 1));
  }
  function go(n) {
    setPage(Math.max(1, Math.min(total, n)));
  }
  if (page > total) setPage(total);

  return { page, perPage, total, paged, next, prev, go, setPage };
}
