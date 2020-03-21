const { sequelize } = require('../models');
const dice = require('dice-coefficient');
const levenstein = require('js-levenshtein');

class classes {

    static async insertClass(req, res, next) {

        const { name, sd1_term, sd1_year, sd2_term, sd2_year, user_id } = req.body;
        let returnClass;
        let class_id;
        let status = {};

        try {
            returnClass = await sequelize.query(
                'CALL insert_class(?,?,?,?,?,?)',
                { replacements: [user_id, name, sd1_term, sd1_year, sd2_term, sd2_year], type: sequelize.QueryTypes.CALL });
            console.log(returnClass[0]['LAST_INSERT_ID()']);
            class_id = returnClass[0]['LAST_INSERT_ID()'];
            console.log(class_id);
            status.status1 = "Class Created";
            next;
        } catch (error) {
            console.log(class_id);
            status.status1 = "Failed";
            next;
        }

        res.send({ 'status': status, 'class_id': class_id });

    }

    static async getAllClasses(req, res, next) {

        const { user_id } = req.body;
        let status = {};
        let returnClasses;

        try {
            returnClasses = await sequelize.query(
                'CALL get_all_classes_coordinator(?)',
                { replacements: [user_id], type: sequelize.QueryTypes.CALL });
            status.status1 = "All classes";
            console.log(returnClasses);
            next;
        } catch (error) {
            console.log(class_id);
            status.status1 = "Failed";
            next;
        }

        res.send(returnClasses);

    }
    
    

}



module.exports = classes;