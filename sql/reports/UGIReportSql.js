export const selectUGIquery = `
    WITH CRT AS (
        SELECT CRT * 0.0884 AS P FROM LabSpearSIB.report.검사결과_종합대사기능
        WHERE 검사ID= @name
    )
    SELECT 
        입력날짜 AS userDt, 검사ID AS userPk, userName, userGender, userBirth, userAge, CRT.P,
        report.UgisanCalculation(0, 1.21, ISNULL(ADP / CRT.P ,0), 0)  AS 'UGI111', 
        report.UgisanCalculation(0, 1.61, ISNULL(ETM / CRT.P ,0), 0)  AS 'UGI112', 
        report.UgisanCalculation(0, 4.26, ISNULL(SBR / CRT.P ,0), 0)  AS 'UGI113', 
        report.UgisanCalculation(0, 57.1, ISNULL(LACT / CRT.P ,0), 0)  AS 'UGI121', 
        report.UgisanCalculation(0, 10.3, ISNULL(PRV / CRT.P ,0), 0)  AS 'UGI122', 
        report.UgisanCalculation(0, 0.48, ISNULL(A_HDIC / CRT.P ,0), 0)  AS 'UGI131', 
        report.UgisanCalculation(0, 0.42, ISNULL(A_HDIV / CRT.P ,0), 0)  AS 'UGI132', 
        report.UgisanCalculation(0, 6.2, ISNULL(B_HDGT / CRT.P ,0), 0)  AS 'UGI133', 
        report.UgisanCalculation(0, 0.76, ISNULL(B_MTGT / CRT.P ,0), 0)  AS 'UGI134', 
        report.UgisanCalculation(0, 1.9, ISNULL(PNPV / CRT.P ,0), 0)  AS 'UGI135', 
        report.UgisanCalculation(0, 0.36, ISNULL(HMG / CRT.P ,0), 0)  AS 'UGI136', 
        report.UgisanCalculation(0, 0.21, ISNULL(MDA / CRT.P ,0), 0)  AS 'UGI137', 
        report.UgisanCalculation(0, 1.46, ISNULL(B_HDIB / CRT.P ,0), 0)  AS 'UGI141', 
        report.UgisanCalculation(0, 2.8065, ISNULL(HDPL / CRT.P ,0), 0)  AS 'UGI211', 
        report.UgisanCalculation(1000, 5000, ISNULL(PHPH / CRT.P ,0), 0)  AS 'UGI221', 
        report.UgisanCalculation(0, 10.97, ISNULL(A_KGT / CRT.P ,0), 1)  AS 'UGI311', 
        report.UgisanCalculation(0.2, 0.69, ISNULL(FMR / CRT.P ,0), 1)  AS 'UGI312', 
        report.UgisanCalculation(0.07, 1.57, ISNULL(MALA / CRT.P ,0), 1)  AS 'UGI313', 
        report.UgisanCalculation(0.2, 6.92, ISNULL(SUCC / CRT.P ,0), 1)  AS 'UGI314', 
        report.UgisanCalculation(0.5, 2.06, ISNULL(HDMG / CRT.P ,0), 1)  AS 'UGI315', 
        report.UgisanCalculation(9.3275, 47.8765, ISNULL(CAA / CRT.P ,0), 1)  AS 'UGI316', 
        report.UgisanCalculation(20.2, 292.16, ISNULL(CTRA / CRT.P ,0), 1)  AS 'UGI317', 
        report.UgisanCalculation(0.79, 29.29, ISNULL(ISCT / CRT.P ,0), 1)  AS 'UGI318', 
        report.UgisanCalculation(0, 0.45, ISNULL(A_KIC / CRT.P ,0), 0)  AS 'UGI321', 
        report.UgisanCalculation(0, 0.49, ISNULL(A_KIV / CRT.P ,0), 0)  AS 'UGI322', 
        report.UgisanCalculation(0, 1.61, ISNULL(A_KMTV / CRT.P ,0), 0)  AS 'UGI323', 
        report.UgisanCalculation(0, 12.1, ISNULL(B_HDISV / CRT.P ,0), 0)  AS 'UGI324', 
        report.UgisanCalculation(0, 1.28, ISNULL(GLTR / CRT.P ,0), 0)  AS 'UGI325', 
        report.UgisanCalculation(0, 1.46, ISNULL(MTCT / CRT.P ,0), 0)  AS 'UGI326', 
        report.UgisanCalculation(0, 3.328, ISNULL(XTR / CRT.P ,0), 0)  AS 'UGI327', 
        report.UgisanCalculation(0, 0.95, ISNULL(MTML / CRT.P ,0), 0)  AS 'UGI331', 
        report.UgisanCalculation(0, 1.3, ISNULL(A_HDHP / CRT.P ,0), 0)  AS 'UGI411', 
        report.UgisanCalculation(0, 1.35, ISNULL(A_MTHP / CRT.P ,0), 0)  AS 'UGI412', 
        report.UgisanCalculation(0, 17, ISNULL(HDHP / CRT.P ,0), 0)  AS 'UGI413', 
        report.UgisanCalculation(0, 1.8, ISNULL(A_HDBT / CRT.P ,0), 0)  AS 'UGI414', 
        report.UgisanCalculation(0, 1.03, ISNULL(OTA / CRT.P ,0), 0)  AS 'UGI415', 
        report.UgisanCalculation(0, 1, ISNULL(PTA / CRT.P ,0), 0)  AS 'UGI416', 
        report.UgisanCalculation(0, 26, ISNULL(PRGT / CRT.P ,0), 0)  AS 'UGI417', 
        report.UgisanCalculation(0, 0.56, ISNULL(TMN / CRT.P ,0), 0)  AS 'UGI421', 
        report.UgisanCalculation(0, 9.7, ISNULL(URC / CRT.P ,0), 0)  AS 'UGI422', 
        report.UgisanCalculation(0, 2.78, ISNULL(Benz / CRT.P ,0), 0)  AS 'UGI521', 
        report.UgisanCalculation(0, 328.67, ISNULL(HIPP / CRT.P ,0), 0)  AS 'UGI522', 
        report.UgisanCalculation(0, 11, ISNULL(IDD / CRT.P ,0), 0)  AS 'UGI523', 
        report.UgisanCalculation(0, 1.23, ISNULL(HDBZ / CRT.P ,0), 0)  AS 'UGI524', 
        report.UgisanCalculation(0, 12.52, ISNULL(HDPA / CRT.P ,0), 0)  AS 'UGI525', 
        report.UgisanCalculation(0, 1.25, ISNULL(TRCB / CRT.P ,0), 0)  AS 'UGI526', 
        report.UgisanCalculation(0, 1.2, ISNULL(A_HDPA / CRT.P ,0), 0)  AS 'UGI511', 
        report.UgisanCalculation(0, 1.22, ISNULL(DHPP / CRT.P ,0), 0)  AS 'UGI512', 
        report.UgisanCalculation(0, 0.43, ISNULL(PNAC / CRT.P ,0), 0)  AS 'UGI513', 
        report.UgisanCalculation(0, 0.08, ISNULL(PNPP / CRT.P ,0), 0)  AS 'UGI514', 
        report.UgisanCalculation(0, 208, ISNULL(HPHPA / CRT.P ,0), 0)  AS 'UGI515', 
        report.UgisanCalculation(0, 75, ISNULL(CRSL / CRT.P ,0), 0)  AS 'UGI516', 
        report.UgisanCalculation(0, 18, ISNULL(HDMF / CRT.P ,0), 0)  AS 'UGI531', 
        report.UgisanCalculation(0, 16, ISNULL(FDB / CRT.P ,0), 0)  AS 'UGI532', 
        report.UgisanCalculation(0, 2.3, ISNULL(FCBG / CRT.P ,0), 0)  AS 'UGI533', 
        report.UgisanCalculation(0, 101, ISNULL(Oxal / CRT.P ,0), 0)  AS 'UGI534', 
        report.UgisanCalculation(0, 5.3, ISNULL(TRTR / CRT.P ,0), 0)  AS 'UGI535', 
        report.UgisanCalculation(0, 7.9575, ISNULL(CTRM / CRT.P ,0), 0)  AS 'UGI536', 
        report.UgisanCalculation(0, 8.4, ISNULL(HIAA / CRT.P ,0), 1)  AS 'UGI611', 
        report.UgisanCalculation(0.56, 4.1, ISNULL(HMVN / CRT.P ,0), 1)  AS 'UGI612', 
        report.UgisanCalculation(0.02, 2.66, ISNULL(VNMD / CRT.P ,0), 1)  AS 'UGI613', 
        report.UgisanCalculation(0, 5.1925, ISNULL(KNR / CRT.P ,0), 0)  AS 'UGI621', 
        report.UgisanCalculation(0, 5.5215, ISNULL(QNL / CRT.P ,0), 0)  AS 'UGI622', 
        report.UgisanCalculation(0.04, 22.03, ISNULL(PCL / CRT.P ,0), 1)  AS 'UGI623'
    FROM LabSpearSIB.report.검사결과_종합대사기능, CRT
    WHERE 검사ID= @name ;
    `;

    export const selectSupplementquery = `
    SELECT * FROM report.UgisanRecomend(@supple);
    `

export const selectUgiIdByDate = `
    SELECT 검사ID as userId FROM LabSpearSIB.report.검사결과_종합대사기능
    WHERE 입력날짜 = @date;
    `;


