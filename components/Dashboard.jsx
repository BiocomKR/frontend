export function DashboardCard({ title, value, icon, trend, trendColor = "text-green-600" }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-500 text-sm font-medium">
            {title}
          </h3>
          <div className="text-gray-400">
            {icon}
          </div>
        </div>

        {/* Card Value */}
        <div className="flex items-baseline">
          <div className="text-2xl font-semibold text-gray-900">
            {value}
          </div>
          
          {/* Trend Indicator */}
          {trend && (
            <span className={`ml-2 flex items-center text-sm font-medium ${trendColor}`}>
              {trend > 0 ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {trend}%
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                  {Math.abs(trend)}%
                </>
              )}
            </span>
          )}
        </div>

        {/* Progress Bar (optional, 나중에 추가 가능) */}
        <div className="mt-3 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-1 bg-blue-600 rounded-full" 
            style={{ width: `${Math.min(Math.abs(trend || 0) * 5, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
} 


export function Dashcard({ title, icon}) {
  return (<div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 pb-1">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">
              {title}
            </h3>
            <div className="text-gray-400">
              {icon}
            </div>
          </div>
        </div>
      </div>
  )
}