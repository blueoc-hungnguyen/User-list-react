import React, { useEffect, useState, useMemo } from 'react';
import { fetchUsers } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SearchBox from '../components/SearchBox';
import UserItem from '../components/UserItem';
import UserDetails from '../components/UserDetails';
import Pagination from '../components/Pagination';
import usePaginate from '../hooks/usePaginate';

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState([]);
  const [sortOrder, setSortOrder] = useState('az');
  const [perPage] = useState(5);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();
        if (mounted) setUsers(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Error fetch users');
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = users.filter(u => u.name.toLowerCase().includes(q));
    list.sort((a, b) => {
      if (sortOrder === 'az') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    return list;
  }, [users, query, sortOrder]);

  const { page, total, paged, next, prev } = usePaginate(filtered, perPage);

  function toggleDetails(id) {
    setExpandedIds(ids =>
      ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
    );
  }

  function handleDelete(id) {
    setUsers(prev => prev.filter(u => u.id !== id));
    setExpandedIds(ids => ids.filter(x => x !== id));
  }

  return (
    <div>
      <div className="search-row">
        <SearchBox value={query} onChange={setQuery} />
        <div className="controls">
          <select
            className="select"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="az">Sort: A → Z</option>
            <option value="za">Sort: Z → A</option>
          </select>
          <div className="result-box">
            Result: <strong>{filtered.length}</strong>
          </div>
        </div>
      </div>

      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <>
          <div className="user-list">
            {paged.map(user => (
              <div key={user.id}>
                <UserItem
                  user={user}
                  onToggleDetails={toggleDetails}
                  onDelete={handleDelete}
                  expanded={expandedIds.includes(user.id)}
                />
                {expandedIds.includes(user.id) && <UserDetails user={user} />}
              </div>
            ))}

            {filtered.length === 0 && (
              <div style={{ padding: '12px', color: '#666' }}>
                Not found user.
              </div>
            )}
          </div>

          <Pagination page={page} total={total} onPrev={prev} onNext={next} />
        </>
      )}
    </div>
  );
}
