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

    static async getUserInfo(req, res, next) {

        const { user_id } = req.body;
        let result;
        let team_id, class_id, class_info, team_names, team_info;

        try {
            result = await sequelize.query('CALL get_user(?)', {
                replacements: [user_id], type: sequelize.QueryTypes.CALL
            });
        }
        catch (error) {
            console.log(error);
            res.send({ status: "failed" });
        }

        if (result[0].type = 'student') {
            try {
                class_info = await sequelize.query('CALL get_current_class(?)', {
                    replacements: [user_id], type: sequelize.QueryTypes.CALL
                });
                team_id = class_info[0].team_id;
                result[0].team_id = team_id;
                
            } catch (error) {
                console.log(error);
                res.send({ status: "failed" });
            }
            
            try 
            {
                team_names = await sequelize.query('CALL get_team_names(?)', {
                    replacements: [team_id], type: sequelize.QueryTypes.CALL
                });
                result[0].team = team_names;

            } catch (error) {
                console.log(error);
                res.send({ status: "failed" });
            }

            try {
                team_info = await sequelize.query('CALL get_team(?)', {
                    replacements: [team_id], type: sequelize.QueryTypes.CALL
                });
                result[0].project_name = team_info[0].project_name;
                result[0].sponsor_name = team_info[0].sponsor_name;
            } catch (error) {
                console.log(error);
                res.send({ status: "failed" });
            }

            console.log(result);
        }


        res.send(result);
    }

    static async getAllClasses(req, res, next) {

        const { user_id, is_active } = req.body;
        let status = {};
        let returnClasses;

        let userType = await sequelize.query(
            'CALL get_user_type(?)',
            { replacements: [user_id], type: sequelize.QueryTypes.CALL });
        let type = userType[0].type;

        if (type == "student") {
            try {
                returnClasses = await sequelize.query(
                    'CALL get_all_classes_student(?,?)',
                    { replacements: [user_id, is_active], type: sequelize.QueryTypes.CALL });
                status.status1 = "All classes";
                console.log(returnClasses);
                next;
            } catch (error) {
                status.status1 = "Failed";
                next;
            }
        }
        else if (type == "coordinator") {
            try {
                returnClasses = await sequelize.query(
                    'CALL get_all_classes_coordinator(?,?)',
                    { replacements: [user_id, is_active], type: sequelize.QueryTypes.CALL });
                status.status1 = "All classes";
                console.log(returnClasses);
                next;
            } catch (error) {
                status.status1 = "Failed";
                next;
            }
        }
        else {
            res.send("Not found.");
        }

        res.send(returnClasses);

    }

    static async getStudentsInClass(req, res, next) {
        const { class_id } = req.body;
        let returnStudents;
        let status = {};

        try {
            returnStudents = await sequelize.query(
                'CALL get_all_students_class(?)',
                { replacements: [class_id], type: sequelize.QueryTypes.CALL });
            status.status1 = "All Students: Success";
            console.log(status.status1);
            //console.log(returnStudents);
            next;
        } catch (error) {
            status.status1 = "Failed";
            next;
        }
        if (returnStudents[0] == null)
            res.send({ "result": "No students found" });
        else {
            res.send(returnStudents);
        }

    }

    static async getTeamsInClass(req, res, next) {
        const { class_id } = req.body;
        let returnTeams;
        let status = {};
        try {
            returnTeams = await sequelize.query(
                'CALL get_all_teams_class(?)',
                { replacements: [class_id], type: sequelize.QueryTypes.CALL });
            status.status1 = "All Teams: Success";
            console.log(status.status1);
            //console.log(returnStudents);
            next;
        } catch (error) {
            status.status1 = "Failed";
            next;
        }

        res.send(returnTeams);
    }



}



module.exports = classes;