"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/Dashboard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 1024,
    newUsers: 58,
    errors: 12,
  });

  // useEffect에서 데이터 페칭만 수행
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출 로직을 여기에 구현
        // 현재는 더미 데이터를 사용하므로 주석 처리
        // const response = await fetch('/api/stats');
        // const data = await response.json();
        // setStats(data);
      } catch (error) {
        console.error('데이터 로딩 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Page header */}
      <div className="w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">대시보드</h1>
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Beta
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 5l0 14"></path>
                  <path d="M5 12l14 0"></path>
                </svg>
                새 보고서
              </button>
              <button className="inline-flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 11l5 5l5 -5"></path>
                  <path d="M12 4l0 12"></path>
                </svg>
                내보내기
              </button>
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
