"use client";

import React from 'react';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';

const RecentlyViewedProducts = () => {
  const { recentlyViewed } = useRecentlyViewed();

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Recently Viewed</h2>
      {recentlyViewed.length > 0 ? (
        <ul>
          {recentlyViewed.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No recently viewed products.</p>
      )}
    </div>
  );
};

export default RecentlyViewedProducts;
