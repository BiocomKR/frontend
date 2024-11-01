export const queries = {
    getUserNameByEmail: "SELECT CONVERT(nvarchar(50), 이름) as value FROM 챌린지_참여자정보 WHERE email = ? and 챌린지_기수 = '1기_연장'",
    getUserDashboardInfo: "SELECT CONVERT(nvarchar(50), a.이름) AS 이름, 체중 AS 시작체중, 목표체중 FROM 챌린지_통합문진 a, 챌린지_참여자정보 b WHERE a.이름 = b.이름 AND Email = ? and a.챌린지_기수 = '1기_연장' and b.챌린지_기수 = '1기_연장'",
    getUserAVG: "select CONVERT(nvarchar(50), 이름) AS 이름, CONVERT(nvarchar(50), 카톡_별명) AS 카톡_별명, 체중 AS 시작체중 from 챌린지_통합문진 where 챌린지_기수 = '1기_연장'"
};
