"use client";

import { useEffect, useState } from "react";
import { QuestionnaireList, LoadingSkList } from "@/components/ItemLists";

export default function QLists({handleItemClick}) {
    const [stats, setStats] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () =>{
            try{
                setIsLoading(true);
                const response = await fetch("https://localhost:3001/api/test/questionnaire");
                const data = await response.json();
                console.log(data);
                setStats(data.results);
                setIsLoading(false);
            }catch (Error) {
                console.error("데이터를 불러오는데 실패했습니다.", Error);
                alert("신청서 검색 중 오류 발생\n 오류코드: "+ Error+'\nIT팀에 해당 메세지를 공유 바랍니다.');
            }
        }
        fetchData();
    }, []);
    
      // 검색어 입력 핸들러
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };
    
      // 검색 버튼 클릭 핸들러
    const handleSearch = async () => {
        try {
            console.log("검색어:", search);
            if(search === ""){
                window.location.reload();
            }
            setIsLoading(true);
            const response = await fetch(`https://localhost:3001/api/test/searchQuestionnaire?name=${search}`);
            const data = await response.json();
            //   console.log("검색 결과:", data);
            setStats(data.results);
            setIsLoading(false);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
            alert("신청서 검색 중 오류 발생\n 오류코드: "+ error+'\nIT팀에 해당 메세지를 공유 바랍니다.');
        }
    };
  
    return (
        <div className="flex flex-col gap-6 p-4">
        {/* Page header */}
            <div className="w-full">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-semibold text-gray-900">검사신청서 목록</h1>
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Beta
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Stats cards */}
            <div className="w-full">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                    <div className="flex gap-3 items-center">
                        <div className="relative flex-1 max-w-md">
                            <input 
                            type="text" 
                            value={search}
                            onChange={handleInputChange}
                            placeholder="이름, 검사ID로 검색" 
                            className="w-full px-4 py-2.5 pr-10 text-sm bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSearch();
                            }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            </div>
                        </div>
                        <button 
                            onClick={handleSearch}
                            className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm font-medium" >
                            검색
                        </button>
                    </div>
                </div>
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4">
                    {
                        isLoading ? (
                        <>
                            <LoadingSkList />
                            <LoadingSkList />
                            <LoadingSkList />
                            <LoadingSkList />
                        </>
                        ) : stats.length > 0 ? (
                            stats.map((item, index) => (
                            <QuestionnaireList key={index} items={item} 
                                handleItemClick={handleItemClick} // 함수만 전달.. 콜백함수처럼
                            />
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                            검색 결과가 없습니다.
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}
  
