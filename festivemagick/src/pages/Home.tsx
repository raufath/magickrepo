import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface TopSeller {
  id: string;
  name: string;
  sales: number;
}

interface SalesStats {
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const [topSellers, setTopSellers] = useState<TopSeller[]>([]);
  const [salesStats, setSalesStats] = useState<SalesStats | null>(null);

  useEffect(() => {
    // TODO: Fetch top sellers and sales statistics from API
    const mockTopSellers: TopSeller[] = [
      { id: '1', name: 'Chateau Margaux', sales: 50 },
      { id: '2', name: 'Cloudy Bay', sales: 45 },
      { id: '3', name: 'Opus One', sales: 40 },
    ];
    setTopSellers(mockTopSellers);

    const mockSalesStats: SalesStats = {
      totalSales: 500,
      totalRevenue: 25000,
      averageRating: 4.3,
    };
    setSalesStats(mockSalesStats);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Festive Wine App</h1>
      {user ? (
        <p className="mb-4">Hello, {user.username}!</p>
      ) : (
        <p className="mb-4">Please log in or register to access all features.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Top Sellers</h2>
          <ol className="list-decimal list-inside">
            {topSellers.map((wine) => (
              <li key={wine.id} className="mb-2">
                {wine.name} - {wine.sales} sales
              </li>
            ))}
          </ol>
        </section>

        {salesStats && (
          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Sales Statistics</h2>
            <p className="mb-2">Total Sales: {salesStats.totalSales}</p>
            <p className="mb-2">Total Revenue: ${salesStats.totalRevenue.toFixed(2)}</p>
            <p className="mb-2">Average Rating: {salesStats.averageRating.toFixed(1)}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;