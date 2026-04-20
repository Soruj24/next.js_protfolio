"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RecentlyViewedContextType {
  recentlyViewed: string[];
  addRecentlyViewed: (item: string) => void;
}

const RecentlyViewedContext = createContext<
  RecentlyViewedContextType | undefined
>(undefined);

export const RecentlyViewedProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  const addRecentlyViewed = (item: string) => {
    setRecentlyViewed((prev) =>
      [item, ...prev.filter((i) => i !== item)].slice(0, 5),
    );
  };

  return (
    <RecentlyViewedContext.Provider
      value={{ recentlyViewed, addRecentlyViewed }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error(
      "useRecentlyViewed must be used within a RecentlyViewedProvider",
    );
  }
  return context;
};
