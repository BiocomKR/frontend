export default function Home() {
  return (
    <>
      {/* Page header */}
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">대시보드</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Page body */}
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-deck row-cards">
            {/* 대시보드 카드들 */}
          </div>
        </div>
      </div>
    </>
  )
}
