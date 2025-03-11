"use client";

import { useEffect, useState } from "react";
import { DashboardCard } from "@/components/Dashboard";

export default function Home() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    errors: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 1024,
        newUsers: 58,
        errors: 12,
      });
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Page header */}
      <div className="w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">메인 홈</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard 
              title="총 사용자" 
              value={String(stats.totalUsers)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                </svg>
              }
              trend={+12}
            />
            <DashboardCard 
              title="신규 가입자" 
              value={String(stats.newUsers)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                  <path d="M16 19h6"></path>
                  <path d="M19 16v6"></path>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                </svg>
              }
              trend={+8}
            />
            <DashboardCard 
              title="오류 발생" 
              value={String(stats.errors)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M12 8l0 4"></path>
                  <path d="M12 16l.01 0"></path>
                </svg>
              }
              trend={-5}
              trendColor="text-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
  