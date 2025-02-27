export const countAllUGI = `
    SELECT CEILING (CONVERT(FLOAT, COUNT(DISTINCT 검사ID))/  (CONVERT(FLOAT, @pageRow))) AS totalPage
   FROM LabSpearSIB.report.검사결과_종합대사기능;
`;

export const selectListUGIquery = `
    with rows as (
        SELECT 검사ID as 'userId', 입력날짜 as 'date', userName, userGender, userBirth ,
        row_number() over (order by 입력날짜 desc, 검사ID desc) as RowNum
        FROM LabSpearSIB.report.검사결과_종합대사기능 
    )
    select * from rows
    where RowNum between (@pageNo-1) * @pageRow + 1 and @pageNo * @pageRow
    ORDER BY date DESC, userId desc
`;

export const selectListUGIqueryByDate = `
    with rows as (
        SELECT 검사ID as 'userId', 입력날짜 as 'date', userName, userGender, userBirth ,
        row_number() over (order by 입력날짜 desc, 검사ID desc) as RowNum
        FROM LabSpearSIB.report.검사결과_종합대사기능 
        where 입력날짜 = @date
    )
    select * from rows
    where RowNum between (@pageNo-1) * @pageRow + 1 and @pageNo * @pageRow
    ORDER BY date DESC, userId desc
`;

export const countAllIgG = `
    SELECT CEILING (CONVERT(FLOAT, COUNT(DISTINCT a.차트번호))/  (CONVERT(FLOAT, @pageRow))) AS totalPage
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
    with rows as (
  SELECT 검사접수.접수일자 as 'date',
        ISNULL(검사접수.차트번호, '') as 'userId',
        검사접수.성명 as 'userName',
        CASE 검사접수.성별코드
            WHEN 'F' THEN '여'
            WHEN 'M' THEN '남'
        END 'userGender',
        검사접수.나이 as 'userAge',
        검사접수.주민등록번호 as 'userBirth',
        row_number() over (order by 검사접수.접수일자 desc, 검사접수.차트번호 desc) as RowNum
        FROM LabSpearSIB.dbo.검사접수 검사접수
        INNER JOIN LabSpearSIB.dbo.검사결과 검사결과
            ON 검사결과.접수일자 = 검사접수.접수일자
            AND 검사결과.접수번호 = 검사접수.접수번호
        WHERE 검사결과.오더코드 = 'D0004'
            AND 검사접수.차트번호 IS NOT NULL
            AND 검사접수.주민등록번호 IS NOT NULL
            AND 검사결과.결과값 IS NOT NULL
        GROUP BY 검사접수.접수일자, 검사접수.차트번호, 검사접수.성명, 검사접수.성별코드, 검사접수.나이, 검사접수.주민등록번호
    )
    select * from rows
    where RowNum between (@pageNo-1) * @pageRow + 1 and @pageNo * @pageRow
    ORDER BY date Desc, userId Desc
    `;

export const selectListIgGqueryByDate = `
    with rows as (
        SELECT 검사접수.접수일자 as 'date', 
            ISNULL(검사접수.차트번호, '') as 'userId', 
            검사접수.성명 as 'userName',
            CASE 검사접수.성별코드 
            WHEN 'F' THEN '여'
            WHEN 'M' THEN '남'
        END 'userGender',
        검사접수.나이 as 'userAge',
        검사접수.주민등록번호 as 'userBirth',
        row_number() over (order by 검사접수.접수일자 desc, 검사접수.차트번호 desc) as RowNum
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
    )
    select * from rows
    where RowNum between (@pageNo-1) * @pageRow + 1 and @pageNo * @pageRow
    ORDER BY date Desc, userId Desc
`;

