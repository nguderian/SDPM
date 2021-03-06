const { sequelize } = require('../models');

// This class at the moment contains the basic API requests for each of the columns in the student table (currently just hardcoded JSON)
class studentInfo {

    static async getAllStudents(req, res, next) {

        // Get all students based on user type.
        // Return the first, last, and user_id.

        const { user_id, type } = req.body;
        
        if(type == 'coordinator')
        {
            try
            {
                let studentList = await sequelize.query('CALL get_all_students_coordinator(?)', 
                {replacements:[ user_id ], type: sequelize.QueryTypes.CALL});
                console.log(studentList);
                res.send(studentList);
            }
            catch(error)
            {
                console.log(error);
                res.send({ status : "Get Students Failed" });
            }
        }

        if(type === 'advisor')
        {
            try
            {
                let studentList = await sequelize.query('CALL get_all_students_advisor(?);', 
                {replacements:[ user_id ], type: sequelize.QueryTypes.CALL});
                
                res.send(studentList);
            }
            catch(error)
            {
                console.log(error);
                res.send({ status : "Get Students Failed" });
            }
        }          
    }  

    static async updateStudent(req, res, next){
        
        const { degree_id, sd1_term, sd1_year, sd2_term, sd2_year, team_id, student_id, class_id } = req.body;

        try{
            await sequelize.query('CALL update_student(?,?,?,?,?,?,?,?)',
            { replacements: [student_id, team_id, degree_id, sd1_term, sd1_year, sd2_term, sd2_year, class_id],
            types: sequelize.QueryTypes.CALL});
        }catch(error){
            console.log("update student failed");
            res.send({status : "update student failed"});
        }
        res.send({status : "update student success"});
    }

    //Just handles team assignment.
    static async updateStudentWithTeam(req, res, next){
        
        const { student_id, team_id } = req.body;

        try{
            await sequelize.query('CALL update_student_with_team(?,?)',
            { replacements: [student_id, team_id],
            types: sequelize.QueryTypes.CALL});
        }catch(error){
            console.log("update student failed");
            res.send({status : "update student failed"});
        }
        res.send({status : "update student success"});
    }

    static async getStudentName(req, res, next) {
        
        const {user_id}   = req.body;
        let student_name;
        try{
            student_name = await sequelize.query('Call get_student_name(?)',
            { replacements: [user_id], types: sequelize.QueryTypes.CALL });
            console.log(student_name);
        }catch(error){
            console.log("get student name failed");
            res.send({status: "get student name failed"});
        }
        res.send(student_name[0]);
    }

    static async deleteStudent(req, res, next) {
        
        const {user_id, class_id}   = req.body;
        let student_name;
        try{
            student_name = await sequelize.query('Call delete_student(?,?)',
            { replacements: [user_id, class_id], types: sequelize.QueryTypes.CALL });
        }catch(error){
            console.log("delete student failed");
            res.send({status: "delete student failed"});
        }
        res.send({status : "delete student success"});
    }
}

module.exports = studentInfo;
