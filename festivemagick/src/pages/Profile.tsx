import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Reservations from '../components/Reservations';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <p className="mb-2">Username: {user.username}</p>
        <p className="mb-2">User ID: {user.id}</p>
        <p className="mb-2">Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
      </div>
      <Reservations />
    </div>
  );
};

export default Profile;