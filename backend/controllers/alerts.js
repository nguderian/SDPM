const { sequelize } = require('../models/');

class alerts {

    static async getUserDashboardAlerts(req, res, next){

        const { user_id } = req.body;
        let result;

        try{
            result = await sequelize.query('CALL get_user_dashboard_alerts(?)',
            { replacements : [ user_id ], type : sequelize.QueryTypes.CALL});
        }catch(error){
            console.log(error);
            res.send({ status : "get dashboard alerts failed"});
        }

        res.send(result);

    }

    static async setAlertViewed(req, res, next){

        const { alert_id } = req.body;
        let result;

        try{
            result = await sequelize.query('CALL alert_viewed(?)',
            { replacements : [ alert_id ], type : sequelize.QueryTypes.CALL});
        }catch(error){
            console.log(error);
            res.send({ status : "alert failed to update"});
        }

        res.send({status : "update alert success"});

    }

}
module.exports = alerts;