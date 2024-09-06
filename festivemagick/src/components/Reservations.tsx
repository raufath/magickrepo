import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Reservation {
  id: string;
  userId: string;
  wineId: string;
  wineName: string;
  quantity: number;
  date: string;
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch reservations from API
    const mockReservations: Reservation[] = [
      { id: '1', userId: '1', wineId: '1', wineName: 'Chateau Margaux', quantity: 2, date: '2023-05-15' },
      { id: '2', userId: '1', wineId: '2', wineName: 'Cloudy Bay', quantity: 1, date: '2023-05-16' },
    ];
    setReservations(mockReservations);
  }, []);

  const handleCancelReservation = async (reservationId: string) => {
    // TODO: Implement reservation cancellation logic
    console.log(`Cancelled reservation with ID: ${reservationId}`);
    setReservations(reservations.filter(reservation => reservation.id !== reservationId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
      {reservations.length === 0 ? (
        <p>You have no reservations.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="bg-white shadow rounded-lg p-4">
              <p className="font-semibold">{reservation.wineName}</p>
              <p>Quantity: {reservation.quantity}</p>
              <p>Date: {reservation.date}</p>
              <button 
                onClick={() => handleCancelReservation(reservation.id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel Reservation
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reservations;