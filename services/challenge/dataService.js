import ServiceLogger from '../../config/ServiceLogger.js';
import * as SqlService from '../SqlService.js';
import * as ChallengeSql from '../../sql/challenge/challengeSql.js'

const logger = new ServiceLogger('UGIReportService');


// 롯데 챌린지 용!!!
export async function getUserDataService(param) {
  let connection;
    try {
      logger.info(`[challenge] 조회 시작 - 사용자: ${param}`);
        const query1 = ChallengeSql.selectAllUserData;
        const query2 = ChallengeSql.selectUserInfo;
        const query3 = ChallengeSql.userReportInfo;
        const query4 = ChallengeSql.selectRate;
        const params = [
            { name: 'userid', type: SqlService.sql.NVarChar, value: param }
        ];

        SqlService.queryLogging(query1, params);
        SqlService.queryLogging(query2, params);
        SqlService.queryLogging(query3, params);
        SqlService.queryLogging(query4, params);

        const data = await SqlService.selectList(query1, params); 
        const userData = await SqlService.selectData(query2, params);
        const reports = await SqlService.selectList(query3, params);
        const rate = await SqlService.selectData(query4, params);

        logger.info('조회 완료');
        return {data, userData, reports, rate};
    } catch (error) {
      if (connection) await connection.close();
      console.error('Error inserting data into database:', error);
      throw error;
    }
}

export async function insertUserDataService(param) {
  let connection;
  try {
    const {userid, rgstDt, breakfast, lunch, dinner, snack, drink, weight, bedtime, waketime, sleep, excer, excerScore, conScore, conCheck} = param;
    logger.info(`[challenge] 조회 : ${param}`);
    const params = [
      { name: 'userid', type: SqlService.sql.VarChar, value: userid },
      { name: 'rgstDt', type: SqlService.sql.VarChar, value: rgstDt },
      { name: 'breakfast', type: SqlService.sql.NVarChar, value: breakfast },
      { name: 'lunch', type: SqlService.sql.NVarChar, value: lunch },
      { name: 'dinner', type: SqlService.sql.NVarChar, value: dinner},
      { name: 'snack', type: SqlService.sql.Bit, value: snack },
      { name: 'drink', type: SqlService.sql.Bit, value: drink},
      { name: 'weight', type: SqlService.sql.Float, value: weight },
      { name: 'bedtime', type: SqlService.sql.VarChar, value: bedtime },
      { name: 'waketime', type: SqlService.sql.VarChar, value: waketime },
      { name: 'sleep', type: SqlService.sql.VarChar, value: sleep },
      { name: 'excer', type: SqlService.sql.NVarChar, value: excer },
      { name: 'excerScore', type: SqlService.sql.Int, value: excerScore },
      { name: 'conScore', type: SqlService.sql.Int, value: conScore },
      { name: 'conCheck', type: SqlService.sql.Bit, value: conCheck },
    ];
    if (params.length !== 15) {
      throw new Error('Incorrect number of parameters');
    }
    const query1 = ChallengeSql.mergeChallenge;
    const query2 = ChallengeSql.selectAllUserData;
    const query3 = ChallengeSql.selectRate;
    
    await SqlService.insertData(query1, params);
    const result = await SqlService.selectList(query2, params);
    const rate = await SqlService.selectData(query3, params);
    console.log('Data select successfully');
    
    return {result, rate};

    
  } catch (error) {
    console.error('Full Error Details:', {
      message: error.message,
      stack: error.stack,
      odbcErrors: error.odbcErrors
    });
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed successfully');
      } catch (closeError) {
        console.error('Error closing connection:', closeError);
      }
    }
  }

}
