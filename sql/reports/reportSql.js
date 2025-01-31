export const countAllUGI = `
    SELECT COUNT(DISTINCT 검사ID) / @pageRow AS totalPage
    FROM LabSpearSIB.report.검사결과_종합대사기능;
`;

export const selectListUGIquery = `
	SELECT 검사ID as 'userId', 입력날짜 as 'date', userName, userGender, userBirth FROM LabSpearSIB.report.검사결과_종합대사기능 
	ORDER BY date DESC, 검사ID desc
    OFFSET (@pageNo-1) * @pageRow ROWS 
    FETCH NEXT @pageRow ROWS ONLY;
`;

export const selectListUGIqueryByDate = `
    SELECT 검사ID as 'userId', 입력날짜 as 'date', userName, userGender, userBirth FROM LabSpearSIB.report.검사결과_종합대사기능 
    where 입력날짜 = @date
    ORDER BY date DESC, 검사ID desc
    OFFSET (@pageNo-1) * @pageRow ROWS
    FETCH NEXT @pageRow ROWS ONLY;
`;

export const countAllIgG = `
    SELECT COUNT(DISTINCT a.차트번호) / @pageRow AS totalPage
    FROM LabSpearSIB.dbo.검사접수 a
    INNER JOIN (
        SELECT DISTINCT 접수일자, 접수번호
        FROM LabSpearSIB.dbo.검사결과
        WHERE 오더코드 = 'D0004'
        AND 결과값 IS NOT NULL
    ) b ON a.접수일자 = b.접수일자
    AND a.접수번호 = b.접수번호
    WHERE a.차트번호 IS NOT NULL;
`;

export const selectListIgGquery = `
  SELECT 검사접수.접수일자 as 'date',
        ISNULL(검사접수.차트번호, '') as 'userId',
        검사접수.성명 as 'userName',
        CASE 검사접수.성별코드
            WHEN 'F' THEN '여'
            WHEN 'M' THEN '남'
        END 'userGender',
        검사접수.나이 as 'userAge',
            검사접수.주민등록번호 as 'userBirth'
    FROM LabSpearSIB.dbo.검사접수 검사접수
    INNER JOIN LabSpearSIB.dbo.검사결과 검사결과
        ON 검사결과.접수일자 = 검사접수.접수일자
        AND 검사결과.접수번호 = 검사접수.접수번호
    WHERE 검사결과.오더코드 = 'D0004'
        AND 검사접수.차트번호 IS NOT NULL
        AND 검사접수.주민등록번호 IS NOT NULL
        AND 검사결과.결과값 IS NOT NULL
    GROUP BY 검사접수.접수일자, 검사접수.차트번호, 검사접수.성명, 검사접수.성별코드, 검사접수.나이, 검사접수.주민등록번호
    ORDER BY 검사접수.접수일자 DESC, 검사접수.차트번호 DESC
    OFFSET (@pageNo-1) * @pageRow ROWS 
    FETCH NEXT @pageRow ROWS ONLY;
`;

export const selectListIgGqueryByDate = `
  SELECT 검사접수.접수일자 as 'date', 
        ISNULL(검사접수.차트번호, '') as 'userId', 
        검사접수.성명 as 'userName',
        CASE 검사접수.성별코드 
            WHEN 'F' THEN '여'
            WHEN 'M' THEN '남'
        END 'userGender',
        검사접수.나이 as 'userAge',
        검사접수.주민등록번호 as 'userBirth'
	FROM LabSpearSIB.dbo.검사접수 검사접수
	INNER JOIN LabSpearSIB.dbo.검사결과 검사결과 
	    ON 검사결과.접수일자 = 검사접수.접수일자 
	    AND 검사결과.접수번호 = 검사접수.접수번호 
	WHERE 검사결과.오더코드 = 'D0004'
	    AND 검사접수.차트번호 IS NOT NULL
		AND 검사접수.주민등록번호 IS NOT NULL
        AND 검사결과.결과값 IS NOT NULL
        AND 검사접수.접수일자 = @date
	GROUP BY 검사접수.접수일자, 검사접수.차트번호, 검사접수.성명, 검사접수.성별코드, 검사접수.나이, 검사접수.주민등록번호
	ORDER BY 검사접수.접수일자 DESC, 검사접수.차트번호 DESC
    OFFSET (@pageNo-1) * @pageRow ROWS
    FETCH NEXT @pageRow ROWS ONLY;
`;

