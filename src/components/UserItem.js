import React from 'react';

export default function UserItem({ user, onToggleDetails, onDelete, expanded }) {
  return (
    <div className="user-card">
      <div className="user-info">
        <div className="meta">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="meta">
          <strong>Phone:</strong> {user.phone}
        </div>
        <div className="meta">
          <strong>Company:</strong> {user.company?.name}
        </div>
      </div>
      <div className="actions">
        <button className="btn" onClick={() => onToggleDetails(user.id)}>
          {expanded ? 'Hide details' : 'See details'}
        </button>
        <button className="btn danger" onClick={() => onDelete(user.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

