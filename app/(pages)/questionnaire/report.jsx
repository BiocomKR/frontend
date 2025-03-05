"use client";
import React, { useEffect, useState } from "react";
import { FreeDiv, FreeTrWNo, LoadingSkPage, FreeListWTitle } from "@/components/ItemLists";
import Comments from '@/components/Comments'

export default function QReport({selectedData}) {
    const [isLoading, setIsLoading] = useState(false);
    const [reportData, setReportData] = useState({});

    useEffect(() => {
        const fetchData = async () =>{
            try{
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
                const response = await fetch(`http://localhost:8000/api/sib/detail?exam_id=${selectedData['검사ID']}`, {
                    method: 'GET',
                    headers: headers,
                    mode: 'cors'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                const jsonData = await jsonProvider();
                console.log(data, jsonData)
                
                const reportData = Object.entries(data).reduce((obj, [k,v]) => {
                    const title = jsonData[k]?.title || k;
                    const detail = jsonData[k]?.detail? jsonData[k].detail[(v-1)]||'입력없음': v;
                    const no = jsonData[k]?.no||'-';
                    if(jsonData[k]){
                        k.includes('최근5년이내질환') ? 
                            obj.disease.push({ no, title,  detail : detail==1? '있음' : null }) 
                            : obj.basic.push({ no, title, detail });
                    }else {
                        obj.user[k] = detail;
                    }
                    return obj;
                }, {user: {}, basic: [], disease: []});
                
                console.log(reportData);
                setReportData(reportData);
                setIsLoading(false);
            }catch (Error) {
                console.error("데이터를 불러오는데 실패했습니다.", Error);
                setIsLoading(false);
            }
        }
        fetchData();
        const jsonProvider =async _=> {
            const response = await import(`@/app/(pages)/questionnaire/data/mapping.json`);
            return response.default;
        };
    }, [selectedData]);

    const userMap = ['검사종류', '업로드날짜', '성명', '성별', '휴대번호', '검사ID', '복용중','복용기타', '분석목적', '생년월일', '검사시점 만나이', '신장','체중','채취일자','채취경과일일']
    const basicGbn = {
        0: '1. 기본증상',
        11: '2. 피로/스트레스',
        16: '3. 피부/모발',
        20: '4. 감각(눈/코/입/귀)',
        26: '5. 감정/신경',
        34: '6. 근육/뼈',
        39: '7. 소화',
        44: '8. 혈압',
        47: '9. 호흡',
        49: '10. 신진대사',
        53: '11. 소변/생리'
    }

    return (
        <div className="flex flex-col gap-6  p-4">
            {/* 페이지 헤더 */}
            <div className="w-full">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-semibold text-gray-900">검사 결과 상세</h1>
                            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {selectedData['성명']}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button 
                                onClick={() => window.location.href = "/questionnaire"}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm font-medium"
                            >
                                뒤로가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 페이지 본문 */}
            <div className="w-full">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <LoadingSkPage />
                        </div>
                    ) : Object.keys(reportData).length > 0 ? (
                        <div className="grid grid-cols-[1.5fr_1fr] gap-6 h-screen-80 ">
                            <div className="grid grid-rows-[1fr_1fr] gap-4">
                                <div className='overflow-y-scroll'>
                                    추후 여기에 리포트가 나옵니다 ㅎㅎ
                                </div>
                                <div className="overflow-y-scroll">
                                    <Comments chartId={selectedData['검사ID']} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 overflow-y-scroll bg-white p-1">
                                <div>
                                    <div>
                                        <div className="text-lg font-medium text-white p-2 pl-3 mb-4 bg-bico-mt">고객정보</div>
                                        <div className="pl-2 pb-2  grid grid-cols-[1fr_1fr]">
                                            {userMap.map((item, idx) => (
                                                <FreeListWTitle 
                                                    key={idx} 
                                                    items={{title: item, value: reportData.user[item]}} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-medium text-white p-2 pl-3 bg-bico-mt">검사결과</div>
                                        <div>
                                            <div className="text-lg font-medium  p-2 pl-3 mb-2 bg-gray-200">5년 이내 앓았던 질환정보</div>
                                            <div className="pl-2 pb-2 grid grid-cols-4">
                                                    {reportData.disease.filter(i=> i.detail).length > 0 ?
                                                        reportData.disease.filter(i=> i.detail).map((item, idx) => (
                                                        <FreeDiv  key={idx} items={{value: item.title}} />
                                                    ))
                                                    : <div className="text-sm font-medium pl-3 p-1 bg-gray-100" colSpan={4}>
                                                        없음
                                                    </div>
                                                    }
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="text-lg font-medium  p-1 pl-3 mb-2 bg-gray-200">기본정보</div>
                                                <div className="space-y-3 pl-2 pb-2">
                                                    <table>
                                                        <tbody>
                                                            {reportData.basic.map((item, idx) => (
                                                                <React.Fragment key={idx}>
                                                                {basicGbn[idx] && 
                                                                    <tr>
                                                                        <td className="text-sm font-medium pl-3 p-1 bg-gray-100" colSpan={3}>
                                                                            {basicGbn[idx]}
                                                                        </td>
                                                                    </tr>}
                                                                <FreeTrWNo 
                                                                    items={{no: item.no+'.  ', title: item.title, value: item.detail}} 
                                                                />
                                                                </React.Fragment>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            검사 신청서 데이터가 현재 없습니다.<br/>
                            신청서 데이터를 공정관리팀에 문의 바랍니다.
                        </div>
                    )}
                </div>
            </div>

            
        </div>
    );
}