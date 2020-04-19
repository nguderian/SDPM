const { sequelize } = require('../models/');
const mailer = require('./mailer');

class alerts {
    static async getUserDashboardAlerts(req, res, next) {

        const { user_id, is_viewed } = req.body;
        let result;

        try {
            result = await sequelize.query('CALL get_user_dashboard_alerts(?,?)',
                { replacements: [user_id, is_viewed], type: sequelize.QueryTypes.CALL });
        } catch (error) {
            console.log(error);
            res.send({ status: "get dashboard alerts failed" });
        }

        res.send(result);

    }

    static async getUserAlertsForClass(req, res, next) {

        const { user_id, class_id, is_viewed } = req.body;
        let result;

        try {
            result = await sequelize.query('CALL get_user_dashboard_alerts_class(?,?,?)',
                { replacements: [user_id, class_id, is_viewed], type: sequelize.QueryTypes.CALL });
        } catch (error) {
            console.log(error);
            res.send({ status: "get dashboard alerts failed" });
        }

        res.send(result);

    }

    static async getAllUserDashboardAlerts(req, res, next) {

        const { user_id } = req.body;
        let result;

        try {
            result = await sequelize.query('CALL get_all_user_dashboard_alerts(?)',
                { replacements: [user_id], type: sequelize.QueryTypes.CALL });
        } catch (error) {
            console.log(error);
            res.send({ status: "get dashboard alerts failed" });
        }

        res.send(result);

    }

    static async getAllUserAlertsForClass(req, res, next) {

        const { user_id, class_id } = req.body;
        let result;

        try {
            result = await sequelize.query('CALL get_all_user_dashboard_alerts_class(?,?)',
                { replacements: [user_id, class_id], type: sequelize.QueryTypes.CALL });
        } catch (error) {
            console.log(error);
            res.send({ status: "get dashboard alerts failed" });
        }

        res.send(result);

    }

    static async setAlertViewed(req, res, next) {

        const { alert_id } = req.body;
        let result;

        try {
            result = await sequelize.query('CALL alert_viewed(?)',
                { replacements: [alert_id], type: sequelize.QueryTypes.CALL });
        } catch (error) {
            console.log(error);
            res.send({ status: "alert failed to update" });
        }

        res.send({ status: "update alert success" });

    }

    static async sendEmailAlerts() {
        let userList;
        try {
            userList = await sequelize.query('CALL get_user_coordinators');

        } catch (error) {
            console.log(error);
        }
        console.log(userList);

        for (var i in userList) {
            let alertList;
            try {
                alertList = await sequelize.query('CALL get_all_unemailed_alerts(?,?)',
                    { replacements: [userList[i].user_id, 0], type: sequelize.QueryTypes.CALL });
            } catch (error) {
                console.log(error);
            }
            console.log(alertList);
            
            if (alertList != '') {
                let message = 'Alerts for Senior Design:\n\n';
                //console.log(alertList);
                for (var j in alertList) {
                    message = message + ("Student: " + alertList[j].first_name + " " + alertList[j].last_name + "\n");
                    message = message + ("Assignment: " + alertList[j].title + "\n");
                    message = message + ("Grade: " + alertList[j].grade + "\n\n");
                }
                console.log(message);
                let subjectLine = "View Alerts for Senior Design Students";
                mailer.sendEmail(userList[i].email, subjectLine, message);

                for (var j in alertList) {

                    try {
                        let result = await sequelize.query('CALL set_alert_emailed(?)',
                            { replacements: [alertList[j].alert_id], type: sequelize.QueryTypes.CALL });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

        }

    }

}
module.exports = alerts;