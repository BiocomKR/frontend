import { logger } from '../../config/winston.js';

// get mapping = reportInfo
export function getInsertInfo(req, res){
    try{
        res.render('reports/Reportinfo');
    }catch(error){
        res.status(500).json({ error: error.message });
        logger.error(error)
        console.log(error)
    }
}
