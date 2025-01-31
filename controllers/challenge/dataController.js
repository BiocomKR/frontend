import { logger } from '../../config/winston.js';
import * as service from '../../services/challenge/dataService.js';

// 롯데 챌린지 용!!!


export async function getUsersData(req, res) {
  try{
    const { userid } = req.body;
    
    if (!userid) return res.status(400).json({error:'존재하지 않는 사용자 입니다.'});
    
    const result = await service.getUserDataService(userid);
    
    res.json({
      data: result.data,
      userData : result.userData,
      reports: result.reports,
      rate: result.rate,
    });
  } catch(error){
    res.status(500).json({ error: error.message });
    logger.error(error);
  }
}

export async function setUsersData(req, res) {
  try {
    const { userid, rgstDt } = req.body; // 요청 데이터 추출
    if ( !userid || !rgstDt) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid data. 사용자 이름 또는 입력일자가 없음니바.',
      });
    }

    const datas = {
      'userid' : req.body.userid ,
      'rgstDt' : req.body.rgstDt ,
      'breakfast' : req.body.breakfast|| '' ,
      'lunch' : req.body.lunch|| '' ,
      'dinner' : req.body.dinner|| '' ,
      'snack' : req.body.snack? 1 : 0,
      'drink' : req.body.drink? 1 : 0,
      'weight' : req.body.weight|| 0 ,
      'bedtime' : req.body.bedtime|| '00:00' ,
      'waketime' : req.body.waketime|| '00:00' ,
      'sleep' : req.body.sleep|| '00:00' ,
      'excer' : req.body.excer|| '' ,
      'excerScore' : req.body.excerScore|| 0  ,
      'conScore' : req.body.conScore|| 0  ,
      'conCheck' : req.body.conCheck? 1 : 0,
    }
    // 데이터 로그 출력
    // console.log('Data to be inserted:', datas);

    const {result, rate} = await service.insertUserDataService(datas);
    if(result){
      // 성공 응답
      res.status(200).json({
          status: 'success',
          message: 'Data saved successfully.',
          data : result,
          rate : rate,
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