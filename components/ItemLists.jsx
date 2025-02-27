export function FreeList({items}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="font-medium">{items.value||'입력값 없음'}</div>
            </div>
        </div>
    )
}

export function FreeListWTitle({items}) {
    return (
        <div className="flex flex-col gap-4 mr-2">
            <div className="flex flex-col gap-2">
                <div className="text-gray-500 text-xs border-l-4 pl-1">{items.title}</div>
                <div className="font-medium">{items.value||'입력값 없음'}</div>
            </div>
        </div>
    )
}

export function FreeDiv({items}) {
    return (
        <div className="border border-gray-200 rounded-md p-2">{items.value}</div>
    )
}

export function FreeTR({items}) {
    return (
        <tr className='w-full border-b border-gray-200'>
            <td className="w-3/4 p-2">{items.title}</td>
            {/* <td className="w-1/5 p-2">{items.value||'입력값 없음'}</td> */}
        </tr>
    )
}

export function FreeTR2({items}) {
    return (
        <tr className='w-full border-b border-gray-200'>
            <td className="w-3/4 p-2">{items.title}</td>
            <td className="w-1/5 p-2">{items.value||'입력값 없음'}</td>
        </tr>
    )
}

export function FreeTrWNo({items}) {
    return (
        <tr className='w-full border-b border-gray-200'>
            <td className="text-gray-500 text-xs pr-2">{items.no}</td>
            <td className="w-4/5 p-2">{items.title}</td>
            <td className="w-1/5 p-2">{items.value||'입력값 없음'}</td>
        </tr>
    )
}

export function QuestionnaireList({items, handleItemClick}) {
    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-row items-center justify-between gap-6 text-sm">
                {/* 검사 정보 그룹 */}
                <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">검사종류</span>
                        <span className="font-semibold">{items['검사종류']}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">검사ID</span>
                        <span className="font-medium">{items['검사ID']}</span>
                    </div>
                </div>

                {/* 사용자 정보 그룹 */}
                <div className="flex items-center gap-4 flex-grow">
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">성명</span>
                        <span>{items['성명']}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">성별</span>
                        <span>{items['성별']=="M" ? "남성" : "여성"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">휴대번호</span>
                        <span>{items['휴대번호']}</span>
                    </div>
                </div>

                {/* 날짜 및 바로가기 그룹 */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-xs">업로드날짜</span>
                        <span>{items['업로드날짜'].substring(0, 10)}</span>
                    </div>
                    <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        data-id={items['검사ID']}
                        onClick={() => handleItemClick(items)}
                    >
                        바로가기
                    </button>
                </div>
            </div>
        </div>
    )
}

// 로딩 중 스켈레톤 컴포넌트
export const LoadingSkList = () => (
    <div className="w-full p-4 bg-white rounded-lg shadow-md animate-pulse">
        <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 min-w-[200px]">
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="flex items-center gap-4 flex-grow">
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
            <div className="flex flex-col gap-2">
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>
);
// 로딩 중 스켈레톤 컴포넌트
export const LoadingSkPage = () => (
    <div className="w-full p-4 bg-white rounded-lg shadow-md animate-pulse">
        <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 min-w-[200px]">
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="flex items-center gap-4 flex-grow">
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
            <div className="flex flex-col gap-2">
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>
);
