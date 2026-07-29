import React, { createContext, useContext, useState } from 'react';

const INITIAL_USERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin',  status: 'Active',   joined: '2024-01-15' },
  { id: 2, name: 'Bob Smith',     email: 'bob@example.com',   role: 'Editor', status: 'Active',   joined: '2024-02-20' },
  { id: 3, name: 'Carol White',   email: 'carol@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-03-10' },
  { id: 4, name: 'David Lee',     email: 'david@example.com', role: 'Editor', status: 'Active',   joined: '2024-04-05' },
  { id: 5, name: 'Eva Brown',     email: 'eva@example.com',   role: 'Admin',  status: 'Active',   joined: '2024-05-18' },
  { id: 6, name: 'Frank Miller',  email: 'frank@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-06-22' },
  { id: 7, name: 'Grace Davis',   email: 'grace@example.com', role: 'Editor', status: 'Active',   joined: '2024-07-01' },
  { id: 8, name: 'Henry Wilson',  email: 'henry@example.com', role: 'Viewer', status: 'Active',   joined: '2024-08-14' },
];

const UsersContext = createContext({});

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch { return INITIAL_USERS; }
  });

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Date.now(),
      joined: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => {
      const updated = [...prev, newUser];
      localStorage.setItem('admin_users', JSON.stringify(updated));
      return updated;
    });
    return newUser;
  };

  const deleteUser = (id) => {
    setUsers(prev => {
      const updated = prev.filter(u => u.id !== id);
      localStorage.setItem('admin_users', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUser = (id, changes) => {
    setUsers(prev => {
      const updated = prev.map(u => u.id === id ? { ...u, ...changes } : u);
      localStorage.setItem('admin_users', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UsersContext.Provider value={{ users, addUser, deleteUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
