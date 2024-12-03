export const selectListUGIquery = `
 SELECT 검사ID as 'userId', 입력날짜 as 'date', userName, userGender, userBirth FROM LabSpearSIB.report.검사결과_종합대사기능 
  ORDER BY 검사ID DESC`;

export const selectUGIquery = `
    WITH CRT AS (
        SELECT CRT * 0.0884 AS P FROM LabSpearSIB.report.검사결과_종합대사기능
        WHERE 검사ID= @name
    )
    SELECT 
        입력날짜 AS userDt, 검사ID AS userPk, userName, userGender, userBirth, userAge, CRT.P,
        report.UgisanCalculatePercent(0, 1.21, ISNULL(ADP / CRT.P ,0), 0)  AS 'UGI111_rank', report.UgisanCalculateScore(0, 1.21, ISNULL(ADP / CRT.P ,0), 0)  AS 'UGI111', 
        report.UgisanCalculatePercent(0, 1.61, ISNULL(ETM / CRT.P ,0), 0)  AS 'UGI112_rank', report.UgisanCalculateScore(0, 1.61, ISNULL(ETM / CRT.P ,0), 0)  AS 'UGI112', 
        report.UgisanCalculatePercent(0, 4.26, ISNULL(SBR / CRT.P ,0), 0)  AS 'UGI113_rank', report.UgisanCalculateScore(0, 4.26, ISNULL(SBR / CRT.P ,0), 0)  AS 'UGI113', 
        report.UgisanCalculatePercent(0, 57.1, ISNULL(LACT / CRT.P ,0), 0)  AS 'UGI121_rank', report.UgisanCalculateScore(0, 57.1, ISNULL(LACT / CRT.P ,0), 0)  AS 'UGI121', 
        report.UgisanCalculatePercent(0, 10.3, ISNULL(PRV / CRT.P ,0), 0)  AS 'UGI122_rank', report.UgisanCalculateScore(0, 10.3, ISNULL(PRV / CRT.P ,0), 0)  AS 'UGI122', 
        report.UgisanCalculatePercent(0, 0.48, ISNULL(A_HDIC / CRT.P ,0), 0)  AS 'UGI131_rank', report.UgisanCalculateScore(0, 0.48, ISNULL(A_HDIC / CRT.P ,0), 0)  AS 'UGI131', 
        report.UgisanCalculatePercent(0, 0.42, ISNULL(A_HDIV / CRT.P ,0), 0)  AS 'UGI132_rank', report.UgisanCalculateScore(0, 0.42, ISNULL(A_HDIV / CRT.P ,0), 0)  AS 'UGI132', 
        report.UgisanCalculatePercent(0, 6.2, ISNULL(B_HDGT / CRT.P ,0), 0)  AS 'UGI133_rank', report.UgisanCalculateScore(0, 6.2, ISNULL(B_HDGT / CRT.P ,0), 0)  AS 'UGI133', 
        report.UgisanCalculatePercent(0, 0.76, ISNULL(B_MTGT / CRT.P ,0), 0)  AS 'UGI134_rank', report.UgisanCalculateScore(0, 0.76, ISNULL(B_MTGT / CRT.P ,0), 0)  AS 'UGI134', 
        report.UgisanCalculatePercent(0, 1.9, ISNULL(PNPV / CRT.P ,0), 0)  AS 'UGI135_rank', report.UgisanCalculateScore(0, 1.9, ISNULL(PNPV / CRT.P ,0), 0)  AS 'UGI135', 
        report.UgisanCalculatePercent(0, 0.36, ISNULL(HMG / CRT.P ,0), 0)  AS 'UGI136_rank', report.UgisanCalculateScore(0, 0.36, ISNULL(HMG / CRT.P ,0), 0)  AS 'UGI136', 
        report.UgisanCalculatePercent(0, 0.21, ISNULL(MDA / CRT.P ,0), 0)  AS 'UGI137_rank', report.UgisanCalculateScore(0, 0.21, ISNULL(MDA / CRT.P ,0), 0)  AS 'UGI137', 
        report.UgisanCalculatePercent(0, 1.46, ISNULL(B_HDIB / CRT.P ,0), 0)  AS 'UGI141_rank', report.UgisanCalculateScore(0, 1.46, ISNULL(B_HDIB / CRT.P ,0), 0)  AS 'UGI141', 
        report.UgisanCalculatePercent(0, 1.09, ISNULL(HDPL / CRT.P ,0), 0)  AS 'UGI211_rank', report.UgisanCalculateScore(0, 1.09, ISNULL(HDPL / CRT.P ,0), 0)  AS 'UGI211', 
        report.UgisanCalculatePercent(1000, 5000, ISNULL(PHPH / CRT.P ,0), 0)  AS 'UGI221_rank', report.UgisanCalculateScore(1000, 5000, ISNULL(PHPH / CRT.P ,0), 0)  AS 'UGI221', 
        report.UgisanCalculatePercent(0, 10.97, ISNULL(A_KGT / CRT.P ,0), 1)  AS 'UGI311_rank', report.UgisanCalculateScore(0, 10.97, ISNULL(A_KGT / CRT.P ,0), 1)  AS 'UGI311', 
        report.UgisanCalculatePercent(0.2, 0.69, ISNULL(FMR / CRT.P ,0), 1)  AS 'UGI312_rank', report.UgisanCalculateScore(0.2, 0.69, ISNULL(FMR / CRT.P ,0), 1)  AS 'UGI312', 
        report.UgisanCalculatePercent(0.07, 1.57, ISNULL(MALA / CRT.P ,0), 1)  AS 'UGI313_rank', report.UgisanCalculateScore(0.07, 1.57, ISNULL(MALA / CRT.P ,0), 1)  AS 'UGI313', 
        report.UgisanCalculatePercent(0.2, 6.92, ISNULL(SUCC / CRT.P ,0), 1)  AS 'UGI314_rank', report.UgisanCalculateScore(0.2, 6.92, ISNULL(SUCC / CRT.P ,0), 1)  AS 'UGI314', 
        report.UgisanCalculatePercent(0.5, 2.06, ISNULL(HDMG / CRT.P ,0), 1)  AS 'UGI315_rank', report.UgisanCalculateScore(0.5, 2.06, ISNULL(HDMG / CRT.P ,0), 1)  AS 'UGI315', 
        report.UgisanCalculatePercent(1.38, 10.07, ISNULL(CAA / CRT.P ,0), 1)  AS 'UGI316_rank', report.UgisanCalculateScore(1.38, 10.07, ISNULL(CAA / CRT.P ,0), 1)  AS 'UGI316', 
        report.UgisanCalculatePercent(20.2, 292.16, ISNULL(CTRA / CRT.P ,0), 1)  AS 'UGI317_rank', report.UgisanCalculateScore(20.2, 292.16, ISNULL(CTRA / CRT.P ,0), 1)  AS 'UGI317', 
        report.UgisanCalculatePercent(0.79, 29.29, ISNULL(ISCT / CRT.P ,0), 1)  AS 'UGI318_rank', report.UgisanCalculateScore(0.79, 29.29, ISNULL(ISCT / CRT.P ,0), 1)  AS 'UGI318', 
        report.UgisanCalculatePercent(0, 0.45, ISNULL(A_KIC / CRT.P ,0), 0)  AS 'UGI321_rank', report.UgisanCalculateScore(0, 0.45, ISNULL(A_KIC / CRT.P ,0), 0)  AS 'UGI321', 
        report.UgisanCalculatePercent(0, 0.49, ISNULL(A_KIV / CRT.P ,0), 0)  AS 'UGI322_rank', report.UgisanCalculateScore(0, 0.49, ISNULL(A_KIV / CRT.P ,0), 0)  AS 'UGI322', 
        report.UgisanCalculatePercent(0, 1.61, ISNULL(A_KMTV / CRT.P ,0), 0)  AS 'UGI323_rank', report.UgisanCalculateScore(0, 1.61, ISNULL(A_KMTV / CRT.P ,0), 0)  AS 'UGI323', 
        report.UgisanCalculatePercent(0, 12.1, ISNULL(B_HDISV / CRT.P ,0), 0)  AS 'UGI324_rank', report.UgisanCalculateScore(0, 12.1, ISNULL(B_HDISV / CRT.P ,0), 0)  AS 'UGI324', 
        report.UgisanCalculatePercent(0, 1.28, ISNULL(GLTR / CRT.P ,0), 0)  AS 'UGI325_rank', report.UgisanCalculateScore(0, 1.28, ISNULL(GLTR / CRT.P ,0), 0)  AS 'UGI325', 
        report.UgisanCalculatePercent(0, 1.46, ISNULL(MTCT / CRT.P ,0), 0)  AS 'UGI326_rank', report.UgisanCalculateScore(0, 1.46, ISNULL(MTCT / CRT.P ,0), 0)  AS 'UGI326', 
        report.UgisanCalculatePercent(0, 0.92, ISNULL(XTR / CRT.P ,0), 0)  AS 'UGI327_rank', report.UgisanCalculateScore(0, 0.92, ISNULL(XTR / CRT.P ,0), 0)  AS 'UGI327', 
        report.UgisanCalculatePercent(0, 0.95, ISNULL(MTML / CRT.P ,0), 0)  AS 'UGI331_rank', report.UgisanCalculateScore(0, 0.95, ISNULL(MTML / CRT.P ,0), 0)  AS 'UGI331', 
        report.UgisanCalculatePercent(0, 1.3, ISNULL(A_HDHP / CRT.P ,0), 0)  AS 'UGI411_rank', report.UgisanCalculateScore(0, 1.3, ISNULL(A_HDHP / CRT.P ,0), 0)  AS 'UGI411', 
        report.UgisanCalculatePercent(0, 1.35, ISNULL(A_MTHP / CRT.P ,0), 0)  AS 'UGI412_rank', report.UgisanCalculateScore(0, 1.35, ISNULL(A_MTHP / CRT.P ,0), 0)  AS 'UGI412', 
        report.UgisanCalculatePercent(0, 17, ISNULL(HDHP / CRT.P ,0), 0)  AS 'UGI413_rank', report.UgisanCalculateScore(0, 17, ISNULL(HDHP / CRT.P ,0), 0)  AS 'UGI413', 
        report.UgisanCalculatePercent(0, 1.8, ISNULL(A_HDBT / CRT.P ,0), 0)  AS 'UGI414_rank', report.UgisanCalculateScore(0, 1.8, ISNULL(A_HDBT / CRT.P ,0), 0)  AS 'UGI414', 
        report.UgisanCalculatePercent(0, 1.03, ISNULL(OTA / CRT.P ,0), 0)  AS 'UGI415_rank', report.UgisanCalculateScore(0, 1.03, ISNULL(OTA / CRT.P ,0), 0)  AS 'UGI415', 
        report.UgisanCalculatePercent(0, 1, ISNULL(PTA / CRT.P ,0), 0)  AS 'UGI416_rank', report.UgisanCalculateScore(0, 1, ISNULL(PTA / CRT.P ,0), 0)  AS 'UGI416', 
        report.UgisanCalculatePercent(0, 26, ISNULL(PRGT / CRT.P ,0), 0)  AS 'UGI417_rank', report.UgisanCalculateScore(0, 26, ISNULL(PRGT / CRT.P ,0), 0)  AS 'UGI417', 
        report.UgisanCalculatePercent(0, 0.56, ISNULL(TMN / CRT.P ,0), 0)  AS 'UGI421_rank', report.UgisanCalculateScore(0, 0.56, ISNULL(TMN / CRT.P ,0), 0)  AS 'UGI421', 
        report.UgisanCalculatePercent(0, 9.7, ISNULL(URC / CRT.P ,0), 0)  AS 'UGI422_rank', report.UgisanCalculateScore(0, 9.7, ISNULL(URC / CRT.P ,0), 0)  AS 'UGI422', 
        report.UgisanCalculatePercent(0, 2.78, ISNULL(Benz / CRT.P ,0), 0)  AS 'UGI511_rank', report.UgisanCalculateScore(0, 2.78, ISNULL(Benz / CRT.P ,0), 0)  AS 'UGI511', 
        report.UgisanCalculatePercent(0, 328.67, ISNULL(HIPP / CRT.P ,0), 0)  AS 'UGI512_rank', report.UgisanCalculateScore(0, 328.67, ISNULL(HIPP / CRT.P ,0), 0)  AS 'UGI512', 
        report.UgisanCalculatePercent(0, 11, ISNULL(IDD / CRT.P ,0), 0)  AS 'UGI513_rank', report.UgisanCalculateScore(0, 11, ISNULL(IDD / CRT.P ,0), 0)  AS 'UGI513', 
        report.UgisanCalculatePercent(0, 1.23, ISNULL(HDBZ / CRT.P ,0), 0)  AS 'UGI514_rank', report.UgisanCalculateScore(0, 1.23, ISNULL(HDBZ / CRT.P ,0), 0)  AS 'UGI514', 
        report.UgisanCalculatePercent(0, 12.52, ISNULL(HDPA / CRT.P ,0), 0)  AS 'UGI515_rank', report.UgisanCalculateScore(0, 12.52, ISNULL(HDPA / CRT.P ,0), 0)  AS 'UGI515', 
        report.UgisanCalculatePercent(0, 1.25, ISNULL(TRCB / CRT.P ,0), 0)  AS 'UGI516_rank', report.UgisanCalculateScore(0, 1.25, ISNULL(TRCB / CRT.P ,0), 0)  AS 'UGI516', 
        report.UgisanCalculatePercent(0, 1.2, ISNULL(A_HDPA / CRT.P ,0), 0)  AS 'UGI521_rank', report.UgisanCalculateScore(0, 1.2, ISNULL(A_HDPA / CRT.P ,0), 0)  AS 'UGI521', 
        report.UgisanCalculatePercent(0, 1.22, ISNULL(DHPP / CRT.P ,0), 0)  AS 'UGI522_rank', report.UgisanCalculateScore(0, 1.22, ISNULL(DHPP / CRT.P ,0), 0)  AS 'UGI522', 
        report.UgisanCalculatePercent(0, 0.43, ISNULL(PNAC / CRT.P ,0), 0)  AS 'UGI523_rank', report.UgisanCalculateScore(0, 0.43, ISNULL(PNAC / CRT.P ,0), 0)  AS 'UGI523', 
        report.UgisanCalculatePercent(0, 0.08, ISNULL(PNPP / CRT.P ,0), 0)  AS 'UGI524_rank', report.UgisanCalculateScore(0, 0.08, ISNULL(PNPP / CRT.P ,0), 0)  AS 'UGI524', 
        report.UgisanCalculatePercent(0, 208, ISNULL(HPHPA / CRT.P ,0), 0)  AS 'UGI531_rank', report.UgisanCalculateScore(0, 208, ISNULL(HPHPA / CRT.P ,0), 0)  AS 'UGI531', 
        report.UgisanCalculatePercent(0, 75, ISNULL(CRSL / CRT.P ,0), 0)  AS 'UGI532_rank', report.UgisanCalculateScore(0, 75, ISNULL(CRSL / CRT.P ,0), 0)  AS 'UGI532', 
        report.UgisanCalculatePercent(0, 18, ISNULL(HDMF / CRT.P ,0), 0)  AS 'UGI541_rank', report.UgisanCalculateScore(0, 18, ISNULL(HDMF / CRT.P ,0), 0)  AS 'UGI541', 
        report.UgisanCalculatePercent(0, 16, ISNULL(FDB / CRT.P ,0), 0)  AS 'UGI542_rank', report.UgisanCalculateScore(0, 16, ISNULL(FDB / CRT.P ,0), 0)  AS 'UGI542', 
        report.UgisanCalculatePercent(0, 2.3, ISNULL(FCBG / CRT.P ,0), 0)  AS 'UGI543_rank', report.UgisanCalculateScore(0, 2.3, ISNULL(FCBG / CRT.P ,0), 0)  AS 'UGI543', 
        report.UgisanCalculatePercent(0, 101, ISNULL(Oxal / CRT.P ,0), 0)  AS 'UGI544_rank', report.UgisanCalculateScore(0, 101, ISNULL(Oxal / CRT.P ,0), 0)  AS 'UGI544', 
        report.UgisanCalculatePercent(0, 5.3, ISNULL(TRTR / CRT.P ,0), 0)  AS 'UGI545_rank', report.UgisanCalculateScore(0, 5.3, ISNULL(TRTR / CRT.P ,0), 0)  AS 'UGI545', 
        report.UgisanCalculatePercent(0, 3.6, ISNULL(CTRM / CRT.P ,0), 0)  AS 'UGI546_rank', report.UgisanCalculateScore(0, 3.6, ISNULL(CTRM / CRT.P ,0), 0)  AS 'UGI546', 
        report.UgisanCalculatePercent(0, 8.4, ISNULL(HIAA / CRT.P ,0), 1)  AS 'UGI611_rank', report.UgisanCalculateScore(0, 8.4, ISNULL(HIAA / CRT.P ,0), 1)  AS 'UGI611', 
        report.UgisanCalculatePercent(0.56, 4.1, ISNULL(HMVN / CRT.P ,0), 1)  AS 'UGI612_rank', report.UgisanCalculateScore(0.56, 4.1, ISNULL(HMVN / CRT.P ,0), 1)  AS 'UGI612', 
        report.UgisanCalculatePercent(0.02, 2.66, ISNULL(VNMD / CRT.P ,0), 1)  AS 'UGI613_rank', report.UgisanCalculateScore(0.02, 2.66, ISNULL(VNMD / CRT.P ,0), 1)  AS 'UGI613', 
        report.UgisanCalculatePercent(0, 2.2, ISNULL(KNR / CRT.P ,0), 0)  AS 'UGI621_rank', report.UgisanCalculateScore(0, 2.2, ISNULL(KNR / CRT.P ,0), 0)  AS 'UGI621', 
        report.UgisanCalculatePercent(0, 2.25, ISNULL(QNL / CRT.P ,0), 0)  AS 'UGI622_rank', report.UgisanCalculateScore(0, 2.25, ISNULL(QNL / CRT.P ,0), 0)  AS 'UGI622', 
        report.UgisanCalculatePercent(0.04, 22.03, ISNULL(PCL / CRT.P ,0), 1)  AS 'UGI623_rank', report.UgisanCalculateScore(0.04, 22.03, ISNULL(PCL / CRT.P ,0), 1)  AS 'UGI623'
    FROM LabSpearSIB.report.검사결과_종합대사기능, CRT
    WHERE 검사ID= @name ;
    `;

    export const selectSupplementquery = `
    SELECT * FROM report.UgisanRecomend(@supple);
    `