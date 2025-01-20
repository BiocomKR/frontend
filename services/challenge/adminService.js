import ServiceLogger from '../../config/ServiceLogger.js';
import * as SqlService from '../SqlService.js';
import * as ChallengeSql from '../../sql/challenge/challengeSql.js'

const logger = new ServiceLogger('challengeAdminService');

// 롯데 챌린지 용!!!
export async function getUserDataService() {
  let connection;
    try {
      logger.info(`[challenge] 챌린지 사용자 등록 페이지 `);
        const selectQuery1 = ChallengeSql.selectAllChallengers;
        const selectQuery2 = ChallengeSql.selectAllMapping;

        SqlService.queryLogging(selectQuery1);
        SqlService.queryLogging(selectQuery2);

        const allChallenger = await SqlService.selectList(selectQuery1); 
        const allMapping = await SqlService.selectList(selectQuery2);

        logger.info('조회 완료');
        logger.info(allChallenger);
        logger.info(allMapping);
        logger.info('========================================');
        return {allChallenger, allMapping};
    } catch (error) {
      if (connection) await connection.close();
      console.error('Error inserting data into database:', error);
      throw error;
    }
}

export async function insertChallengerDataService(param) {
  let connection;
  try {
    const {name, userid, groupCode, startDt, endDt} = param;
    logger.info(`[challenge] 챌린저 데이터 삽입 : ${param}`);
    const params = [
        { name: 'name', type: SqlService.sql.NVarChar, value: name },
        { name: 'userid', type: SqlService.sql.VarChar, value: userid },
        { name: 'groupCode', type: SqlService.sql.VarChar, value: groupCode },
        { name: 'startDt', type: SqlService.sql.VarChar, value: startDt },
        { name: 'endDt', type: SqlService.sql.VarChar, value: endDt },
    ];
    const insertQeury = ChallengeSql.insertChallengerData;
    const selectQuery1 = ChallengeSql.selectAllChallengers;
    
    await SqlService.insertData(insertQeury, params);
    const result = await SqlService.selectList(selectQuery1, params);
    logger.info('========================================');
    logger.info('insertChallengerDataService successfully');
    logger.info('========================================');

    return {result};
  } catch (error) {
    logger.error('Full Error Details:', {
      message: error.message,
      stack: error.stack,
      odbcErrors: error.odbcErrors
    });
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
        logger.info('Connection closed successfully');
      } catch (closeError) {
        logger.error('Error closing connection:', closeError);
      }
    }
  }
}

export async function insertMappingDataService(param) {
  let connection;
  try {
    const {usercode, report, userid, testcode, testNm, fileNm} = param;
    logger.info(`[challenge] 매핑 데이터 삽입 : ${param}`);
    const params = [
        { name: 'usercode', type: SqlService.sql.VarChar, value: usercode },
        { name: 'report', type: SqlService.sql.VarChar, value: report },
        { name: 'userid', type: SqlService.sql.VarChar, value: userid },
        { name: 'testcode', type: SqlService.sql.VarChar, value: testcode },
        { name: 'testNm', type: SqlService.sql.NVarChar, value: testNm },
        { name: 'fileNm', type: SqlService.sql.NVarChar, value: fileNm },
    ];
    const insertQeury = ChallengeSql.mergeChallenge;
    const selectQuery1 = ChallengeSql.selectAllMapping;
    
    await SqlService.insertData(insertQeury, params);
    const result = await SqlService.selectList(selectQuery1, params);
    logger.info('========================================');
    logger.info('insertMappingDataService successfully');
    logger.info('========================================');
    return {result};
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
            logger.info('Connection closed successfully');
        } catch (closeError) {
            logger.error('Error closing connection:', closeError);
        }
        }
    }

}
