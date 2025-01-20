export const selectAllUserData = `
  select * from challenge_records
  where userid = @userid
  order by rgstDt;
`;
export const selectUserInfo = `
  select name, startDt, endDt from challenge_users
  where userid = @userid
  ;
`;
export const userReportInfo = `
  select * from  LabSpearSIB.report.challenge_mapping
  where userid = @userid
`;
export const selectRate = `
with usercode as  (select groupCode as gr from challenge_users where userid = @userid )
select CAST(SUM(CASE WHEN cr.conCheck = 1 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) AS rate 
from  challenge_users cu 
inner join challenge_records cr
  on cr.userid  = cu.userid 
inner join usercode uc
  on uc.gr = cu.groupCode 
`;
export const mergeChallenge = `
    MERGE INTO LabSpearSIB.report.challenge_records AS target
    USING (VALUES (@userid, @rgstDt, @breakfast, @lunch, @dinner, @snack, @drink, @weight, @bedtime, @waketime, @sleep, @excer, @excerScore, @conScore, @conCheck)) AS source 
    (userid, rgstDt, breakfast, lunch, dinner, snack, drink, weight, bedtime, waketime, sleep, excer, excerScore, conScore, conCheck)
    ON target.userid = source.userid AND target.rgstDt = source.rgstDt
    WHEN MATCHED THEN
    UPDATE SET 
        target.breakfast = source.breakfast,
        target.lunch = source.lunch,
        target.dinner = source.dinner,
        target.snack = source.snack,
        target.drink = source.drink,
        target.weight = source.weight,
        target.bedtime = source.bedtime,
        target.waketime = source.waketime,
        target.sleep = source.sleep,
        target.excer = source.excer,
        target.excerScore = source.excerScore,
        target.conScore = source.conScore,
        target.conCheck = source.conCheck
    WHEN NOT MATCHED THEN
    INSERT (userid, rgstDt, breakfast, lunch, dinner, snack, drink, weight, bedtime, waketime, sleep, excer, excerScore, conScore, conCheck)
    VALUES (@userid, @rgstDt, @breakfast, @lunch, @dinner, @snack, @drink, @weight, @bedtime, @waketime, @sleep, @excer, @excerScore, @conScore, @conCheck);
`;

export const selectAllChallengers = `
  select * from challenge_users
  order by rgstDt;
`;
export const selectAllMapping = `
  select * from LabSpearSIB.report.challenge_mapping
  order by userid;
`;

export const insertChallengerData = `
  insert into challenge_users (userid , name, startDt, endDt, groupCode)
  values (@userid , @name, @startDt, @endDt, @groupCode);
`;

export const insertMappingData = `
  insert into LabSpearSIB.report.challenge_mapping (usercode, report, userid, testcode, testNm, fileNm)
  values (@usercode, @report, @userid, @testcode, @testNm, @fileNm);
`;

