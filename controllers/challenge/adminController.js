import { logger } from '../../config/winston.js';
import * as service from '../../services/challenge/adminService.js';

// 롯데 챌린지 용!!!
// post mapping = /challenge/manager
export function getManagerData(req, res){
    try{
        res.render('challenge/challengeManager');

    }catch(error){
        res.status(500).json({ error: error.message });
        logger.error(error)
        console.log(error)
    }
}

// get mapping = /challenge/loadData
export async function loadAllData(req, res) {
    try{
        const result = await service.getUserDataService();
        
        res.json({
            challenger: result.allChallenger,
            mapping : result.allMapping,
        });
    } catch(error){
        res.status(500).json({ error: error.message });
        logger.error(error);
    }
}

// /challenge/saveChallengerData
export async function saveChallengerData(req, res) {
    try {
        logger.info('==================================');
        logger.info('saveChallengerData : '+req.body);
        logger.info('==================================');
        const { userid , username, startDt, endDt, groupCode } = req.body; // 요청 데이터 추출

        if ( !userid || !username || !startDt || !endDt || !groupCode ) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid data. 사용자 이름 또는 입력일자가 없음니바.',
            });
        }

        const datas = {
            'userid' : userid,
            'name' : username,
            'startDt' : startDt, 
            'endDt' : endDt, 
            'groupCode' : groupCode
        }

        const {result} = await service.insertChallengerDataService(datas);
        if(result){
            // 성공 응답
            logger.info('========================================');
            logger.info(result);
            logger.info('========================================');
            res.status(200).json({
                status: 'success',
                message: 'Data saved successfully.',
                data : result,
            });
        }else {
            res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing the request.',
        });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        logger.error('Error processing request:', error);

        // 에러 응답
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing the request.',
        });
    }
}

// /challenge/saveMappingData
export async function saveMappingData(req, res) {
  try {
      logger.info('==================================');
      logger.info('saveMappingData : '+req.body);
      logger.info('==================================');
    const {usercode , userid, report, testcode, testNm, fileNm} = req.body; // 요청 데이터 추출
        
    if ( !usercode || !userid || !report || !testcode || !testNm || !fileNm) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid data. 사용자 이름 또는 입력일자가 없음니바.',
      });
    }

    const datas = {
        'usercode' : usercode,
        'userid' : userid,
        'report' : report,
        'testcode' : testcode,
        'testNm' : testNm,
        'fileNm' : fileNm
    }

    const {result} = await service.insertMappingDataService(datas);
    if(result){
      // 성공 응답
      logger.info('========================================');
      logger.info(result);
      logger.info('========================================');
      res.status(200).json({
          status: 'success',
          message: 'Data saved successfully.',
          data : result,
      });
    }else {
        res.status(500).json({
          status: 'error',
          message: 'An error occurred while processing the request.',
      });
    }
  } catch (error) {
      console.error('Error processing request:', error);
      logger.error('Error processing request:', error);

      // 에러 응답
      res.status(500).json({
          status: 'error',
          message: 'An error occurred while processing the request.',
      });
  }
}