import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Wine {
  id: string;
  name: string;
  year: number;
  type: string;
  varietal: string;
  rating: number;
  price: number;
  stock: number;
}

const Wines: React.FC = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch wines from API
    const mockWines: Wine[] = [
      { id: '1', name: 'Chateau Margaux', year: 2015, type: 'Red', varietal: 'Cabernet Sauvignon', rating: 4.5, price: 500, stock: 10 },
      { id: '2', name: 'Cloudy Bay', year: 2020, type: 'White', varietal: 'Sauvignon Blanc', rating: 4.2, price: 30, stock: 20 },
    ];
    setWines(mockWines);
  }, []);

  const handleReserve = async (wineId: string) => {
    // TODO: Implement wine reservation logic
    console.log(`Reserved wine with ID: ${wineId}`);
    // Update the stock of the reserved wine
    setWines(wines.map(wine => 
      wine.id === wineId ? { ...wine, stock: wine.stock - 1 } : wine
    ));
  };

  const handleDelete = async (wineId: string) => {
    // TODO: Implement wine deletion logic (for admin users)
    console.log(`Deleted wine with ID: ${wineId}`);
    setWines(wines.filter(wine => wine.id !== wineId));
  };

  const handleAddWine = () => {
    // TODO: Implement add wine functionality
    console.log('Add new wine');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Wines</h1>
      {user?.isAdmin && (
        <button onClick={handleAddWine} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
          Add New Wine
        </button>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wines.map((wine) => (
          <li key={wine.id} className="bg-white shadow rounded-lg p-6">
            <Link to={`/wines/${wine.id}`} className="block hover:text-blue-500">
              <h3 className="text-xl font-semibold mb-2">{wine.name}</h3>
            </Link>
            <p className="mb-1">Year: {wine.year}</p>
            <p className="mb-1">Type: {wine.type}</p>
            <p className="mb-1">Varietal: {wine.varietal}</p>
            <p className="mb-1">Rating: {wine.rating}</p>
            <p className="mb-1">Price: ${wine.price}</p>
            <p className="mb-2">Stock: {wine.stock}</p>
            <button 
              onClick={() => handleReserve(wine.id)} 
              disabled={wine.stock === 0}
              className={`px-4 py-2 rounded ${wine.stock === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            >
              {wine.stock === 0 ? 'Out of Stock' : 'Reserve'}
            </button>
            {user?.isAdmin && (
              <button onClick={() => handleDelete(wine.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wines;