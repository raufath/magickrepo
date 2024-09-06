import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  description: string;
  imageUrl: string;
}

const WineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [wine, setWine] = useState<Wine | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch wine details from API
    const mockWine: Wine = {
      id: id || '',
      name: 'Chateau Margaux',
      year: 2015,
      type: 'Red',
      varietal: 'Cabernet Sauvignon',
      rating: 4.5,
      price: 500,
      stock: 10,
      description: 'A full-bodied wine with notes of blackcurrant, cedar, and tobacco.',
      imageUrl: 'https://example.com/chateau-margaux.jpg',
    };
    setWine(mockWine);
  }, [id]);

  const handleReserve = async () => {
    if (wine) {
      // TODO: Implement wine reservation logic
      console.log(`Reserved wine with ID: ${wine.id}`);
      setWine({ ...wine, stock: wine.stock - 1 });
    }
  };

  if (!wine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500 hover:underline">
        &larr; Back to Wines
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={wine.imageUrl} alt={wine.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{wine.name}</h1>
          <p className="mb-2">Year: {wine.year}</p>
          <p className="mb-2">Type: {wine.type}</p>
          <p className="mb-2">Varietal: {wine.varietal}</p>
          <p className="mb-2">Rating: {wine.rating}</p>
          <p className="mb-2">Price: ${wine.price}</p>
          <p className="mb-4">Stock: {wine.stock}</p>
          <p className="mb-4">{wine.description}</p>
          <button 
            onClick={handleReserve} 
            disabled={wine.stock === 0}
            className={`px-4 py-2 rounded ${wine.stock === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            {wine.stock === 0 ? 'Out of Stock' : 'Reserve'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WineDetail;