"use client";

import { useEffect, useState } from "react";
import QLists from "./list";
import QReport from "./report"


export default function QuestionnairePage() {
    const [selectedData, setSelectedData] = useState(null);
  
    const handleItemClick = (item) =>{
      console.log("선택된 항목:", item);
      setSelectedData(item);
    }
  return (
    <>
      {selectedData? (
        <QReport selectedData={selectedData} />
      ) : (
        <QLists handleItemClick={handleItemClick}  />
      )}
    </>
  );
}