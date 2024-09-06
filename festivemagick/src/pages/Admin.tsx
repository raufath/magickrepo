import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch users and events from API
    const mockUsers: User[] = [
      { id: '1', username: 'admin', isAdmin: true },
      { id: '2', username: 'user1', isAdmin: false },
    ];
    const mockEvents: Event[] = [
      { id: '1', name: 'Wine Tasting', date: '2023-06-15', description: 'Annual wine tasting event' },
      { id: '2', name: 'Vineyard Tour', date: '2023-07-20', description: 'Tour of local vineyards' },
    ];
    setUsers(mockUsers);
    setEvents(mockEvents);
  }, []);

  const handleAddUser = () => {
    // TODO: Implement add user functionality
    console.log('Add user');
  };

  const handleDeleteUser = (userId: string) => {
    // TODO: Implement delete user functionality
    console.log(`Delete user with ID: ${userId}`);
  };

  const handleAddEvent = () => {
    // TODO: Implement add event functionality
    console.log('Add event');
  };

  const handleDeleteEvent = (eventId: string) => {
    // TODO: Implement delete event functionality
    console.log(`Delete event with ID: ${eventId}`);
  };

  if (!user?.isAdmin) {
    return <div className="container mx-auto px-4 py-8">Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
      
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">User Management</h3>
        <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">Add New User</button>
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u.id} className="flex items-center justify-between bg-white shadow rounded-lg p-4">
              <span>{u.username} (Admin: {u.isAdmin ? 'Yes' : 'No'})</span>
              <button onClick={() => handleDeleteUser(u.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Event Management</h3>
        <button onClick={handleAddEvent} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">Add New Event</button>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="bg-white shadow rounded-lg p-4">
              <h4 className="text-xl font-semibold">{event.name} - {event.date}</h4>
              <p className="mb-2">{event.description}</p>
              <button onClick={() => handleDeleteEvent(event.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;