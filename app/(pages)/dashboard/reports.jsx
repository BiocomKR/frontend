"use client"

import { useState, useEffect, useRef } from "react";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

export function RepurchaseRateReport() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

  // 차트 초기화 및 업데이트 함수
    const initChart = (chartData) => {
        if (chartRef.current) {
        // 이미 차트 인스턴스가 있으면 dispose
        if (chartInstance.current) {
            chartInstance.current.dispose();
        }

        // 새 차트 인스턴스 생성
        const chart = echarts.init(chartRef.current);
        chartInstance.current = chart;
        const managerList = Array.from(new Set(chartData.map(item => item.manager)));
        const chartDataList = managerList.reduce((obj, manager) => {
            const managerData = chartData.filter(item => item.manager === manager);
            obj[manager] = managerData;
            return obj;
        }, {});
        console.log(chartDataList);
        console.log(managerList);
        console.log(chartData);

        // 차트 옵션 설정
        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    // 툴팁 커스터마이징
                    let result = params[0].axisValue + '<br/>';
                    params.forEach((param, index) => {
                        result += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>`;
                        result += `${param.seriesName}: ${param.value}%<br/>`;
                    });
                    return result;
                }
            },
            legend:{
                data: managerList,
                type: 'scroll',
                orient: 'horizontal',
                top: 0,
                right: '10%'
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: Array.from(new Set(chartData.map(item => item.repurchase_period))),
                boundaryGap: false,
                axisLabel: {
                    rotate: 0,
                    fontSize: 12
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            series: Object.keys(chartDataList).map(manager => ({
                name: manager,
                type: 'line',
                data: chartDataList[manager].map(item => item.repurchase_rate),
                smooth: true,
                lineStyle: {
                    width: 3,
                },
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                },
                areaStyle: manager === '전체' ? {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
                    { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
                    ])
                } : undefined // 다른 매니저는 areaStyle 없음
            })),
            // [
            //     {
            //         name: '재구매율',
            //         type: 'line',
            //         data: chartData.map(item => item.repurchase_rate),
            //         smooth: true,
            //         lineStyle: {
            //             width: 3,
            //             color: '#3B82F6'
            //         },
            //         symbol: 'circle',
            //         symbolSize: 8,
            //         itemStyle: {
            //             color: '#3B82F6'
            //         },
            //         areaStyle: {
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //             { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
            //             { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
            //         ])
            //         }
            //     }
            // ]
            grid: {
                left: '5%',
                right: '5%',
                bottom: '10%',
                top: '15%',
                containLabel: true
            }
        };

            // 차트 옵션 적용
            chart.setOption(option);

            // 반응형 처리
            window.addEventListener('resize', () => {
                chart.resize();
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                // 토큰 가져오기 (로컬 스토리지에 저장된 토큰)
                const token = localStorage.getItem('token');
                
                // 요청 헤더 설정
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };
                
                // 토큰이 있으면 Authorization 헤더 추가
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                // 기존 코드를 새로운 FastAPI 엔드포인트로 변경
                const response = await fetch(`http://localhost:8000/api/dashboard/purchase-conversion-details`, {
                    method: 'GET',
                    headers: headers,
                    mode: 'cors'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data.data);

                // 임시 데이터
                const mockData = {
                    // chartData: data.data,
                    chartData: data.data,
                    tableData: [
                        { manager: '전체', user_name: '홍길동', user_phone: '010-1234-5678', test_type: '호르몬', consultation_timestamp: '2025-03-01 10:00:00', purchase_timestamp: '2025-02-25 10:00:00', purchase_list: '엔자임베네핏핏핏', purchase_price: 100000},
                        { manager: '경태', user_name: '홍길동', user_phone: '010-1234-5678', test_type: '호르몬', consultation_timestamp: '2025-03-01 10:00:00', purchase_timestamp: '2025-02-25 10:00:00', purchase_list: '엔자임베네핏핏핏', purchase_price: 100000},
                        { manager: '민정', user_name: '홍길동', user_phone: '010-1234-5678', test_type: '호르몬', consultation_timestamp: '2025-03-01 10:00:00', purchase_timestamp: '2025-02-25 10:00:00', purchase_list: '엔자임베네핏핏핏', purchase_price: 100000},
                    ],
                };
                const averageRate = mockData.chartData.filter(item=>item.manager === '전체').reduce((avg,item) => {
                    avg += item.repurchase_rate;
                    return avg;
                }, 0) / mockData.chartData.filter(item=>item.manager === '전체').length;
                console.log(averageRate);
                mockData.summary = {
                        averageRate: averageRate.toFixed(1),
                        previousRate: 73.1,
                        yearlyAverage: 67.8,
                        totalCustomers: 4305
                    }
                    setData(mockData);
                    setIsLoading(false);
            } catch (error) {
                console.error("데이터 로딩 중 오류 발생:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

  // 데이터가 로드되면 차트 초기화
    useEffect(() => {
        if (data && !isLoading) {
            initChart(data.chartData);
        }
    
    // 컴포넌트 언마운트 시 차트 인스턴스 정리
        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
        };
    }, [data, isLoading]);

  // 숫자 포맷팅 함수
    const formatNumber = (num) => {
        return new Intl.NumberFormat('ko-KR').format(num);
    };

    if (isLoading) {
        return (
        <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    const handleExportReport = () => {
        console.log('보고서 내보내기');
        alert('준비중입니다:)');
    };

    return (
    <div className="flex flex-col gap-6 p-4">
      {/* 페이지 헤더 */}
        <div className="w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-gray-900">재구매율 대시보드</h1>
                <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Beta
                </span>
            </div>
            <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleExportReport}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M7 11l5 5l5 -5"></path>
                        <path d="M12 4l0 12"></path>
                    </svg>
                    보고서 내보내기
                </button>
            </div>
        </div>
    </div>
    </div>

    {/* 요약 정보 카드 */}
    <div className="w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">전체 재구매율</div>
                    <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{data.summary.averageRate}%</div>
                        <div className="ml-2 text-sm font-medium text-emerald-600">
                        +{(data.summary.currentRate - data.summary.previousRate).toFixed(1)}%
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">전월 대비</div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">기간별 평균 재구매율</div>
                    <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{data.summary.yearlyAverage}%</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2023년 평균</div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">총 전환 수</div>
                    <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{formatNumber(data.summary.totalCustomers)}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">누적 고객 수</div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm font-medium text-gray-500">총 전환 금액</div>
                    <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{formatNumber(data.tableData[data.tableData.length-1].totalSales)}원</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2023년 12월</div>
                </div>
            </div>
            </div>
        </div>

      {/* 차트 영역 */}
        <div className="w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-lg font-medium text-gray-900 mb-4">재구매율 추이</div>
                    <div ref={chartRef} style={{ height: '400px', width: '100%' }}></div>
                </div>
            </div>
        </div>

      {/* 데이터 테이블 */}
        <div className="w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="text-lg font-medium text-gray-900 p-4 border-b">상세 데이터</div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 담당자자 </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 상담일자 </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 구매일자 </th>
                                        {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 고객 성함 </th> */}
                                        {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 고객 연락처 </th> */}
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 검사 종류 </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 구매 내역 </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 가격 </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.tableData.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {row.manager} {/* 담당자자 */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {row.consultation_timestamp} {/* 상담일자 */}
                                            </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {row.purchase_timestamp} {/* 구매일자 */}
                                                </td>
                                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {row.user_name} 
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {row.user_phone} 
                                            </td> */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className={`px-2 py-1 rounded-full ${
                                                row.test_type.indexOf('호르몬') > -1 ? 'bg-green-100 text-green-700' : 
                                                row.test_type.indexOf('대사') > -1 ? 'bg-blue-100 text-blue-700' : 
                                                row.test_type.indexOf('지연성') > -1 ? 'bg-yellow-100 text-yellow-700' : 
                                                row.test_type.indexOf('영양중금속') > -1 ? 'bg-red-100 text-red-700' : 
                                                'bg-gray-100 text-gray-700'
                                                }`}>
                                                {row.test_type} {/* 검사 종류 */}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {row.purchase_list} {/* 구매 내역 */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatNumber(row.purchase_price)+ ' 원'} {/* 가격 */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
