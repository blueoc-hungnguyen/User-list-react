import React, { useEffect, useState } from 'react';
import { fetchPostsByUser } from '../services/api';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

export default function UserDetails({ user }) {
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setIsLoadingPosts(true);
      setPostError(null);
      try {
        const data = await fetchPostsByUser(user.id);
        if (mounted) setPosts(data);
      } catch (err) {
        if (mounted) setPostError(err.message || 'Lỗi khi tải posts');
      } finally {
        if (mounted) setIsLoadingPosts(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [user.id]);

  return (
    <div className="details">
      <div>
        <strong>Address: </strong> {user.address?.street}, {user.address?.city} -{' '}
        {user.address?.zipcode}
      </div>
      <div>
        <strong>Website: </strong> {user.website}
      </div>
      <div style={{ marginTop: 8 }}>
        <strong>Post by {user.name}:</strong>
        {isLoadingPosts && <Loading text="Loading post..." />}
        {postError && <ErrorMessage message={postError} />}
        {!isLoadingPosts && !postError && (
          <ul>
            {posts.slice(0, 5).map(p => (
              <li key={p.id}>
                <strong>{p.title}</strong>
              </li>
            ))}
            {posts.length === 0 && (
              <div style={{ color: '#666' }}>Not found</div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
