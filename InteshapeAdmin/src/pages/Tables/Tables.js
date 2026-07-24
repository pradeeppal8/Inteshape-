import React, { useState } from 'react';
import './Tables.css';

const initialData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-03-10' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active', joined: '2024-04-05' },
  { id: 5, name: 'Eva Brown', email: 'eva@example.com', role: 'Admin', status: 'Active', joined: '2024-05-18' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-06-22' },
  { id: 7, name: 'Grace Davis', email: 'grace@example.com', role: 'Editor', status: 'Active', joined: '2024-07-01' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer', status: 'Active', joined: '2024-08-14' },
];

const Tables = () => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = initialData
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  const SortIcon = ({ col }) => (
    <span className="sort-icon">{sortKey === col ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
  );

  return (
    <div className="tables-page">
      <div className="page-header">
        <h2>Tables</h2>
        <span className="breadcrumb">Home &rsaquo; Tables</span>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <span>User Management</span>
          <input
            className="table-search"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {['id','name','email','role','status','joined'].map(col => (
                  <th key={col} onClick={() => handleSort(col)} style={{ cursor: 'pointer' }}>
                    {col.charAt(0).toUpperCase() + col.slice(1)}<SortIcon col={col} />
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td><strong>{row.name}</strong></td>
                  <td>{row.email}</td>
                  <td><span className={`role-badge role-${row.role.toLowerCase()}`}>{row.role}</span></td>
                  <td><span className={`status-badge ${row.status === 'Active' ? 'active' : 'inactive'}`}>{row.status}</span></td>
                  <td>{row.joined}</td>
                  <td>
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">Showing {filtered.length} of {initialData.length} entries</div>
      </div>
    </div>
  );
};

export default Tables;
