"use client";

import { useEffect, useState } from "react";
import {RepurchaseRateReport} from "./reports";
import { DashboardCard, Dashcard } from "@/components/Dashboard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 1024,
    newUsers: 58,
    errors: 12,
  });
  const [selectedDash, setSelectedDash] = useState("재구매율 대시보드");

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

  const handleDashChange = (dash) => {
    setSelectedDash(dash);
    console.log(dash);
  };

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
            {/* 추후 버튼영역 추가 예정 */}
            {/* <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 5l0 14"></path>
                  <path d="M5 12l14 0"></path>
                </svg>
                새 대시보드
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
            </div> */}
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 대시보드 카드 영역 */}
            <div  onClick={() => handleDashChange("재구매율 대시보드")}>
              <Dashcard
                title="재구매율 대시보드" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    className="icon" 
                    width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" 
                    stroke="#374151" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M17 10l-2 -6"></path>
                    <path d="M7 10l2 -6"></path>
                    <path d="M10.5 20h-3.256a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304h13.999a2 2 0 0 1 1.977 2.304l-.143 .817"></path>
                    <path d="M12.602 12.092a2 2 0 0 0 -2.233 3.066"></path>
                    <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" stroke="#FF0000" fill="#FFCCCC"></path>
                </svg>
                }
              />
            </div>
          </div>
          {selectedDash === "재구매율 대시보드" && (
            <div className="w-full mt-6 transition-all duration-300 ease-in-out">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <RepurchaseRateReport />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
