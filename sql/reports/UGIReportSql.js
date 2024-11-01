export const selectUGIquery = `
    /* UGIReportSql.selectUGIquery */
        SELECT b.성명, a.*
        FROM LabSpearSIB.report.검사신청서_종합호르몬 b
        LEFT JOIN LabSpearSIB.report.검사결과_타액호르몬 a ON a.검사ID = b.검사ID
        WHERE b.성명 = @name
    `