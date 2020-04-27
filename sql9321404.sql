-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql9.freemysqlhosting.net
-- Generation Time: Apr 26, 2020 at 09:02 PM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql9321404`
--
CREATE DATABASE IF NOT EXISTS `sql9321404` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sql9321404`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`sql9321404`@`%` PROCEDURE `alert_viewed` (IN `alert_id_in` INT)  NO SQL
UPDATE alert_history
SET alert_history.is_viewed = 1
WHERE alert_history.alert_id = alert_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `assign_instance_to_all` (IN `form_id_in` INT, IN `end_date_in` DATE, IN `start_date_in` DATE, IN `threshold_grade_in` INT, IN `threshold_int_in` INT)  NO SQL
BEGIN
INSERT INTO form_instances (form_instances.form_id, form_instances.grade, form_instances.is_complete, form_instances.start_date, form_instances.end_date, form_instances.user_id)
VALUES ((SELECT forms.form_id
        FROM forms
        WHERE forms.form_id = form_id_in),
       NULL,
       0,
       start_date_in,
       end_date_in,
       (SELECT users.user_id
       FROM users
       WHERE users.type = 'students'));
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `assign_sponsor` (IN `sponsor_id_in` INT, IN `team_id_in` INT)  NO SQL
BEGIN
UPDATE sponsors
SET teams.sponsor_id = sponsor_id_in
WHERE teams.team_id = team_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `assign_to_team` (IN `team_id_in` INT, IN `user_id_in` INT)  BEGIN
UPDATE students 
SET students.team_id = (
	SELECT teams.team_id
	FROM teams
	WHERE teams.team_id = team_id_in)
WHERE students.user_id = user_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `check_student_class` (IN `user_id_in` INT, IN `class_id_in` INT)  NO SQL
SELECT students.student_id
FROM students
WHERE user_id = user_id_in AND class_id = class_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `complete_quiz` (IN `grade_in` INT, IN `instance_id_in` INT)  NO SQL
BEGIN
UPDATE form_instances
SET form_instances.grade = grade_in, form_instances.is_complete = 1
WHERE form_instances.instance_id = instance_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `delete_student` (IN `user_id_in` INT, IN `class_id_in` INT)  MODIFIES SQL DATA
DELETE 
FROM students
/*INNER JOIN students ON students.user_id = users.user_id*/
WHERE students.user_id = user_id_in
AND students.class_id = class_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_attendance` ()  NO SQL
BEGIN
SELECT * FROM attendance;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_classes_coordinator` (IN `user_id_in` INT, IN `is_active_in` INT)  NO SQL
SELECT classes.class_id, classes.name
FROM classes
WHERE classes.user_id = user_id_in
AND classes.is_active = is_active_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_classes_student` (IN `user_id_in` INT, IN `is_active_in` INT)  NO SQL
SELECT classes.class_id, classes.name, students.student_id, students.team_id
FROM classes
INNER JOIN students
ON students.user_id = user_id_in AND students.class_id = classes.class_id
WHERE classes.is_active = is_active_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_coordinators` ()  NO SQL
BEGIN
SELECT * FROM coordinators;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_forms` (IN `user_id_in` INT)  NO SQL
BEGIN
SELECT * 
FROM forms
WHERE forms.user_id = user_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_forms_type` (IN `user_id_in` INT, IN `type_in` VARCHAR(20))  NO SQL
BEGIN
SELECT * 
FROM forms
WHERE forms.user_id = user_id_in AND forms.type = type_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_form_answers` ()  NO SQL
BEGIN
SELECT * FROM form_answers;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_form_instances` ()  READS SQL DATA
BEGIN
SELECT * 
FROM form_instances;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_form_milestones` ()  READS SQL DATA
BEGIN
SELECT * FROM form_milestones;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_form_participate` ()  NO SQL
BEGIN
SELECT * FROM form_participate;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_form_questions` ()  NO SQL
BEGIN
SELECT * FROM form_questions;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_form_task` ()  NO SQL
BEGIN
SELECT * FROM form_tasks;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_question_category` ()  NO SQL
BEGIN
SELECT * FROM question_category;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_sponsors` ()  NO SQL
BEGIN
SELECT * FROM sponsors;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_students` ()  NO SQL
BEGIN
SELECT * FROM students;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_students_advisor` (IN `user_id_in` INT)  NO SQL
BEGIN
SELECT users.first_name, users.last_name, users.user_id
FROM users
INNER JOIN students ON users.user_id = students.user_id
INNER JOIN teams ON students.team_id = teams.team_id
INNER JOIN advisors ON teams.team_id = advisors.team_id
WHERE advisors.user_id = user_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_students_assign` (IN `sd1_term_in` SET('spring','summer','fall',''), IN `sd1_year_in` YEAR, IN `sd2_term_in` SET('spring','summer','fall',''), IN `sd2_year_in` YEAR)  NO SQL
BEGIN

IF (sd1_term_in IS NOT NULL AND sd2_term_in IS NOT NULL) THEN
	SELECT students.user_id 
	FROM students
	WHERE students.sd1_term = sd1_term_in 
    AND students.sd1_year = sd1_year_in 
    OR students.sd2_term = sd2_term_in 
    AND students.sd2_year = sd2_year_in;
    
ELSEIF (sd1_term_in IS NOT NULL AND sd2_term_in IS NULL) THEN
	SELECT students.user_id 
	FROM students
	WHERE students.sd1_term = sd1_term_in 
    AND students.sd1_year = sd1_year_in;
    
ELSEIF (sd1_term_in IS NULL AND sd2_term_in IS NOT NULL) THEN
	SELECT students.user_id 
	FROM students
	WHERE students.sd2_term = sd2_term_in 
    AND students.sd2_year = sd2_year_in;
END IF;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_students_class` (IN `class_id_in` INT)  NO SQL
SELECT users.first_name, users.last_name, users.user_id, students.student_id, teams.team_id, teams.project_name
FROM users
INNER JOIN students ON students.user_id = users.user_id
LEFT JOIN teams ON students.team_id = teams.team_id 
WHERE students.class_id = class_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_students_coordinator` (IN `user_id_in` INT)  NO SQL
SELECT users.first_name, users.last_name, users.user_id
FROM users
INNER JOIN students ON users.user_id = students.user_id
INNER JOIN teams ON students.team_id = teams.team_id
INNER JOIN coordinators ON teams.coordinator_id = coordinators.coordinator_id
WHERE teams.coordinator_id = coordinators.coordinator_id 
AND coordinators.user_id = user_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_teams` (IN `user_id_in` INT)  NO SQL
BEGIN
IF 
	(SELECT users.type 
    FROM users 
    WHERE users.user_id = user_id_in) = 'coordinator'
THEN 
	SELECT * 
    FROM teams
    INNER JOIN coordinators ON teams.coordinator_id = coordinators.coordinator_id
    WHERE coordinators.user_id = user_id_in;
ELSEIF
	(SELECT users.type 
    FROM users 
    WHERE users.user_id = user_id_in) = 'advisor'
THEN
	SELECT * 
    FROM teams
    INNER JOIN advisors ON teams.team_id = advisors.team_id
    WHERE advisors.user_id = user_id_in;
END IF;

END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_teams_class` (IN `class_id_in` INT)  NO SQL
SELECT teams.team_id, teams.project_name, teams.description
FROM teams
WHERE teams.class_id = class_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_ucf_degrees` ()  NO SQL
BEGIN
SELECT * FROM ucf_degrees;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_unemailed_alerts` (IN `user_id_in` INT, IN `is_emailed_in` INT)  NO SQL
SELECT alert_history.instance_id, alert_history.alert_id, form_instances.student_id, users.first_name, users.last_name, form_instances.grade, forms.title
FROM alert_history
INNER JOIN form_instances
ON alert_history.instance_id = form_instances.instance_id
INNER JOIN students
ON students.student_id = form_instances.student_id
INNER JOIN users
ON students.user_id = users.user_id
INNER JOIN forms
ON form_instances.form_id = forms.form_id
WHERE alert_history.user_id = user_id_in AND alert_history.is_emailed = is_emailed_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_user_dashboard_alerts` (IN `user_id_in` INT)  NO SQL
SELECT alert_history.alert_id, form_instances.instance_id, forms.type, forms.title, form_instances.student_id, form_instances.team_id, teams.project_name, teams.team_id, form_instances.grade, students.class_id, users.first_name, users.last_name, classes.name
FROM alert_history
INNER JOIN form_instances ON alert_history.instance_id = form_instances.instance_id
INNER JOIN students ON form_instances.student_id = students.student_id
INNER JOIN teams ON students.team_id = teams.team_id
INNER JOIN users ON students.user_id = users.user_id
INNER JOIN forms ON form_instances.form_id = forms.form_id
INNER JOIN classes ON students.class_id = classes.class_id
WHERE alert_history.user_id = user_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_all_user_dashboard_alerts_class` (IN `user_id_in` INT, IN `class_id_in` INT)  NO SQL
SELECT alert_history.alert_id, form_instances.instance_id, forms.type, forms.title, form_instances.student_id, form_instances.team_id, teams.project_name, teams.team_id, form_instances.grade, users.first_name, users.last_name, classes.name
FROM alert_history
INNER JOIN form_instances ON alert_history.instance_id = form_instances.instance_id
INNER JOIN students ON form_instances.student_id = students.student_id
INNER JOIN teams ON students.team_id = teams.team_id
INNER JOIN users ON students.user_id = users.user_id
INNER JOIN forms ON form_instances.form_id = forms.form_id
INNER JOIN classes ON students.class_id = classes.class_id
WHERE alert_history.user_id= user_id_in
AND students.class_id = class_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_answer_key` (IN `answer_id_in` INT)  NO SQL
BEGIN
SELECT * 
FROM answer_keys
WHERE answer_keys.key_id = answer_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_auth_code` (IN `username_in` VARCHAR(60))  NO SQL
BEGIN
SELECT email_verifications.auth_code, users.username
FROM email_verifications
INNER JOIN users ON email_verifications.user_id = users.user_id
WHERE users.username = username_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_completed_meeting` (IN `instance_id_in` INT)  NO SQL
SELECT forms.title, forms.description, form_instances.start_date, form_instances.end_date, users.first_name, users.last_name, form_attendance.reason, form_attendance.did_attend
FROM forms
INNER JOIN form_instances ON forms.form_id = form_instances.form_id
INNER JOIN form_attendance ON form_instances.instance_id = form_attendance.instance_id
INNER JOIN students ON form_attendance.student_id = students.student_id
INNER JOIN users ON users.user_id = students.user_id
WHERE form_instances.instance_id = instance_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_coordinator` (IN `coordinator_id_in` INT)  NO SQL
BEGIN
SELECT * FROM coordinators
WHERE coordinators.coordinator_id = coordinator_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_current_class` (IN `user_id_in` INT)  NO SQL
SELECT * FROM students
INNER JOIN classes ON (classes.class_id = students.class_id) AND (classes.is_active = 1)
WHERE students.user_id = user_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form` (IN `form_id_in` INT)  NO SQL
BEGIN
SELECT * FROM forms
WHERE forms.form_id = form_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_answer` (IN `answer_id_in` INT)  READS SQL DATA
BEGIN
SELECT * 
FROM form_answers
WHERE form_answers.answer_id = answer_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_answer_text` (IN `instance_id_in` INT, IN `question_id_in` INT)  NO SQL
SELECT form_answers.answer_text
FROM form_answers
WHERE form_answers.instance_id = instance_id_in AND form_answers.question_id = question_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_attendance` (IN `attendance_id_in` INT)  READS SQL DATA
BEGIN
SELECT * 
FROM form_attendance
WHERE form_attendance.attendance_id = attendance_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_completion` (IN `form_completion_id_in` INT)  READS SQL DATA
BEGIN
SELECT *
FROM form_completion
WHERE form_completion.form_completion_id = form_completion_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_from_instance` (IN `instance_id_in` INT)  BEGIN
select * from forms where forms.form_id= (select form_id from form_instances
where instance_id=instance_id_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_id` (IN `instance_id_in` INT)  NO SQL
BEGIN
SELECT form_instances.form_id
FROM form_instances
WHERE form_instances.instance_id = instance_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_instance` (IN `instance_id_in` INT)  SELECT *
FROM form_instances
WHERE form_instances.instance_id = instance_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_milestone` (IN `milestone_id_in` INT)  READS SQL DATA
BEGIN
SELECT *
FROM form_milestones
WHERE form_milestones.milestone_id = milestone_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_question` (IN `question_id_in` INT)  READS SQL DATA
BEGIN
SELECT *
FROM form_questions
WHERE form_questions.question_id = question_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_questions` (IN `form_id_in` INT)  BEGIN
SELECT * 
FROM form_questions 
INNER JOIN answer_keys ON form_questions.question_id = answer_keys.question_id
WHERE form_id = form_id_in
AND form_questions.is_active = 1;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_results` (IN `user_id_in` INT, IN `form_id_in` INT)  NO SQL
SELECT forms.title, forms.description, form_instances.start_date, form_instances.end_date, form_questions.question_text, form_questions.question_type, form_answers.answer_text, form_instances.grade
FROM forms
INNER JOIN form_instances ON forms.form_id = form_instances.form_id
INNER JOIN form_questions ON forms.form_id = form_questions.form_id
INNER JOIN form_answers ON form_instances.instance_id = form_answers.instance_id
WHERE forms.form_id = form_id_in AND form_instances.user_id = user_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_task` (IN `task_id_in` INT)  READS SQL DATA
BEGIN
SELECT *
FROM form_tasks
WHERE form_tasks.task_id = task_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_test` (IN `form_id_in` INT)  NO SQL
SELECT forms_test.title, form_questions_test.question_id, 	   form_questions_test.category_id, form_questions_test.title, form_answers_test.text
FROM forms_test 
INNER JOIN form_questions_test ON forms_test.form_id = form_questions_test.form_id
INNER JOIN form_answers_test ON form_questions_test.question_id = form_answers_test.question_id
WHERE form_questions_test.form_id = form_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_test_instructor` (IN `form_id_in` INT)  NO SQL
SELECT forms_test.title, form_questions_test.question_id, 	   form_questions_test.category_id, form_questions_test.title, form_answers_test.text, form_answers_test.is_correct
FROM forms_test 
INNER JOIN form_questions_test ON forms_test.form_id = form_questions_test.form_id
INNER JOIN form_answers_test ON form_questions_test.question_id = form_answers_test.question_id
WHERE form_questions_test.form_id = form_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_form_type` (IN `form_id_in` INT)  READS SQL DATA
BEGIN
SELECT forms.type
FROM forms
WHERE forms.form_id = form_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_instance_grade` (IN `instance_id_in` INT)  NO SQL
SELECT form_instances.grade 
FROM form_instances
WHERE form_instances.instance_id = instance_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_milestone_instance` (IN `milestone_id_in` INT)  BEGIN
SELECT form_milestones.instance_id 
FROM form_milestones 
WHERE milestone_id =
	(SELECT form_milestones.milestone_id 
     FROM form_milestones 
     WHERE form_milestones.milestone_id = milestone_id_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_name_student_id` (IN `student_id_in` INT)  NO SQL
SELECT users.first_name, users.last_name
FROM users
INNER JOIN students ON students.user_id = users.user_id
WHERE students.student_id = student_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_question_category` (IN `category_id_in` INT)  READS SQL DATA
BEGIN
SELECT *
FROM question_category
WHERE question_category.category_id = category_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_quiz` (IN `form_id_in` INT)  NO SQL
SELECT forms.type, forms.description, forms.form_threshold, forms.title, form_questions.question_id, 	   form_questions.question_text, form_questions.question_type, answer_keys.key_text, answer_keys.is_correct
FROM forms 
INNER JOIN form_questions ON forms.form_id = form_questions.form_id
INNER JOIN answer_keys ON form_questions.question_id = answer_keys.question_id
WHERE form_questions.form_id = form_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_quiz_key_answers` (IN `form_id_in` INT)  SELECT form_questions.question_type, answer_keys.key_text, answer_keys.question_id, answer_keys.is_correct
FROM answer_keys 
INNER JOIN form_questions ON answer_keys.question_id = form_questions.question_id 
WHERE form_questions.form_id = form_id_in and answer_keys.is_correct = 1$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_sponsor` (IN `sponsor_id_in` INT)  READS SQL DATA
BEGIN
SELECT *
FROM sponsors
WHERE sponsors.sponsor_id=sponsor_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student` (IN `student_id_in` INT)  READS SQL DATA
BEGIN
SELECT * 
FROM students
WHERE students.student_id = student_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student_advisor` (IN `user_id_in` INT)  NO SQL
select users.email,users.user_id,coordinators.coordinator_id 
from (((students INNER JOIN teams on students.team_id=teams.team_id)
INNER JOIN coordinators on teams.coordinator_id=coordinators.coordinator_id) 
INNER JOIN users on coordinators.user_id=users.user_id) 
where students.user_id=user_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student_coordinator` (IN `student_id_in` INT)  SELECT classes.user_id
FROM classes
WHERE classes.class_id = (SELECT students.class_id FROM students WHERE students.student_id = student_id_in)$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student_instances` (IN `student_id_in` INT)  NO SQL
BEGIN
SELECT forms.type, forms.form_id, forms.title, forms.description, form_instances.instance_id, form_instances.start_date, form_instances.end_date, form_instances.is_complete, form_instances.grade
FROM form_instances
INNER JOIN forms ON form_instances.form_id = forms.form_id
WHERE form_instances.student_id = student_id_in
OR form_instances.team_id = (SELECT students.team_id FROM students WHERE students.student_id = student_id_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student_instances_is_complete` (IN `student_id_in` INT, IN `is_complete_in` INT)  BEGIN
SELECT forms.type, forms.form_id, forms.title, forms.description, form_instances.instance_id, form_instances.start_date, form_instances.end_date, form_instances.is_complete, form_instances.grade
FROM form_instances
INNER JOIN forms ON form_instances.form_id = forms.form_id
WHERE form_instances.is_complete = is_complete_in AND (form_instances.student_id = student_id_in
OR form_instances.team_id = (SELECT students.team_id FROM students WHERE students.student_id = student_id_in));
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student_name` (IN `user_id_in` INT)  READS SQL DATA
SELECT users.first_name, users.last_name
FROM users
INNER JOIN students ON students.user_id = users.user_id
WHERE students.user_id = user_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student_team_instance` (IN `instance_id_in` INT)  NO SQL
SELECT form_instances.student_id, students.team_id
FROM form_instances
INNER JOIN students ON students.student_id = form_instances.student_id
WHERE form_instances.instance_id = instance_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student_type_instances` (IN `student_id_in` INT, IN `type_in` SET('quiz','survey','milestone','task','meeting','attendance'))  NO SQL
BEGIN
SELECT forms.type, forms.title, forms.description, form_instances.instance_id, form_instances.start_date, form_instances.end_date, form_instances.is_complete, form_instances.form_id, form_instances.grade
FROM form_instances
INNER JOIN forms ON form_instances.form_id = forms.form_id
WHERE (form_instances.student_id = student_id_in OR form_instances.team_id = (SELECT students.team_id FROM students WHERE students.student_id = student_id_in))
AND forms.type = type_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student_type_instances_is_complete` (IN `student_id_in` INT, IN `type_in` VARCHAR(20), IN `is_complete_in` INT)  NO SQL
BEGIN
SELECT forms.type, forms.title, forms.description, form_instances.instance_id, form_instances.start_date, form_instances.end_date, form_instances.is_complete, form_instances.form_id, form_instances.grade
FROM form_instances
INNER JOIN forms ON form_instances.form_id = forms.form_id
WHERE (form_instances.student_id = student_id_in OR form_instances.team_id = (SELECT students.team_id FROM students WHERE students.student_id = student_id_in))
AND (forms.type = type_in) AND (form_instances.is_complete = is_complete_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_student_verification` (IN `username_in` VARCHAR(60))  NO SQL
BEGIN

IF (SELECT users.type
   FROM users
   WHERE users.username = username_in) = 'student' THEN

SELECT students.is_verified, users.username, users.email
FROM students
INNER JOIN users ON students.user_id = users.user_id
WHERE users.username = username_in;
ELSE
SELECT "USER NOT STUDENT" AS username;
END IF;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_survey` (IN `form_id_in` INT(11))  NO SQL
SELECT forms.type, forms.title, forms.description, form_questions.question_id, 	   form_questions.question_text, form_questions.question_type, form_questions.question_threshold
FROM forms 
INNER JOIN form_questions ON forms.form_id = form_questions.form_id
WHERE form_questions.form_id = form_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_survey_answer` (IN `instance_id_in` INT, IN `question_id_in` INT)  NO SQL
SELECT form_answers.answer_text, form_answers.student_id
FROM form_answers
WHERE form_answers.instance_id = instance_id_in AND form_answers.question_id = question_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_team` (IN `team_id_in` INT)  READS SQL DATA
BEGIN
SELECT *
FROM teams
WHERE teams.team_id = team_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_teams_with_coordinator` (IN `user_id_in` INT)  MODIFIES SQL DATA
BEGIN
SELECT team_id from teams where coordinator_id=(select coordinator_id from coordinators where user_id=user_id_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_team_advisor` (IN `team_id_in` INT)  NO SQL
select users.user_id,users.email 
from users 
where users.user_id=(
select coordinators.user_id from coordinators where team_id=team_id_in)$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_team_forms` (IN `team_in` INT)  BEGIN
Select * from form_instances where team_id=team_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_team_id` (IN `student_id_in` INT)  NO SQL
BEGIN
SELECT students.team_id
FROM students
WHERE students.student_id = student_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_team_instances` (IN `team_id_in` INT)  BEGIN
SELECT forms.type, forms.title, forms.description, form_instances.instance_id, form_instances.start_date, form_instances.end_date, form_instances.is_complete
FROM form_instances
INNER JOIN forms ON form_instances.form_id = forms.form_id
WHERE form_instances.team_id = team_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_team_names` (IN `team_id_in` INT)  SELECT users.first_name, students.user_id, users.last_name, students.student_id
FROM students
INNER JOIN users ON students.user_id = users.user_id
where students.team_id = team_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_ucf_degree` (IN `degree_id_in` INT)  READS SQL DATA
BEGIN
SELECT *
FROM ucf_degrees
WHERE ucf_degrees.degree_id = degree_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_ucf_department` (IN `department_id_in` INT)  READS SQL DATA
BEGIN
SELECT *
FROM ucf_departments
WHERE ucf_departments.departments_id = department_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_user` (IN `user_id_in` INT)  READS SQL DATA
BEGIN
SELECT * 
FROM users
WHERE users.user_id = user_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_username` (IN `username_in` VARCHAR(15))  NO SQL
SELECT user_id
from users 
WHERE username = username_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_users_from_team` (IN `team_id_in` INT)  NO SQL
BEGIN
SELECT students.user_id
FROM students
WHERE students.team_id = team_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_users_with_coordinator` (IN `id` INT)  MODIFIES SQL DATA
BEGIN
SELECT users.username,users.email,students.user_id,students.major
    FROM((( coordinators INNER JOIN teams on teams.coordinator_id=coordinators.coordinator_id) INNER JOIN students on teams.team_id = students.student_id )INNER JOIN users on students.user_id=users.user_id);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_users_with_sponsor` (IN `id` INT)  MODIFIES SQL DATA
BEGIN
SELECT users.username,users.email,students.user_id,students.major
FROM((( teams INNER JOIN users on id=teams.id) INNER JOIN students on students.team_id=teams.id)INNER JOIN users u2 on students.username=users.username);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_user_coordinators` ()  NO SQL
SELECT * from users
WHERE users.type = 'coordinator'$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_user_dashboard_alerts` (IN `user_id_in` INT, IN `is_viewed_in` INT)  NO SQL
SELECT alert_history.alert_id, form_instances.instance_id, forms.type, forms.title, form_instances.student_id, form_instances.team_id, teams.project_name, teams.team_id, form_instances.grade, students.class_id, users.first_name, users.last_name, classes.name
FROM alert_history
INNER JOIN form_instances ON alert_history.instance_id = form_instances.instance_id
INNER JOIN students ON form_instances.student_id = students.student_id
INNER JOIN teams ON students.team_id = teams.team_id
INNER JOIN users ON students.user_id = users.user_id
INNER JOIN forms ON form_instances.form_id = forms.form_id
INNER JOIN classes ON students.class_id = classes.class_id
WHERE alert_history.user_id = user_id_in
AND alert_history.is_viewed = is_viewed_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_user_dashboard_alerts_class` (IN `user_id_in` INT, IN `class_id_in` INT, IN `is_viewed_in` INT)  NO SQL
SELECT alert_history.alert_id, form_instances.instance_id, forms.type, forms.title, form_instances.student_id, form_instances.team_id, teams.project_name, teams.team_id, form_instances.grade, users.first_name, users.last_name, classes.name
FROM alert_history
INNER JOIN form_instances ON alert_history.instance_id = form_instances.instance_id
INNER JOIN students ON form_instances.student_id = students.student_id
INNER JOIN teams ON students.team_id = teams.team_id
INNER JOIN users ON students.user_id = users.user_id
INNER JOIN forms ON form_instances.form_id = forms.form_id
INNER JOIN classes ON students.class_id = classes.class_id
WHERE alert_history.user_id= user_id_in
AND students.class_id = class_id_in
AND alert_history.is_viewed = is_viewed_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_user_quiz_answers` (IN `instance_id_in` INT)  NO SQL
BEGIN
SELECT form_answers.answer_text, form_answers.question_id
FROM form_answers
WHERE form_answers.instance_id = instance_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_user_survey_answers` (IN `instance_id_in` INT, IN `user_id_in` INT)  BEGIN
SELECT ANS.answer_text, QUE.question_text
FROM form_answers ANS
INNER JOIN form_questions QUE
ON ANS.question_id = QUE.question_id
WHERE ANS.instance_id = instance_id_in AND ANS.user_id = user_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `get_user_type` (IN `user_id_in` INT)  NO SQL
BEGIN
SELECT users.type
FROM users
WHERE users.user_id = user_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_advisor` (IN `team_id_in` INT, IN `user_id_in` INT)  BEGIN
INSERT INTO advisors (advisors.user_id,advisors.team_id)
VALUES((SELECT users.user_id
        FROM users
        WHERE users.user_id = user_id_in),
        (SELECT teams.team_id
        FROM teams
        WHERE teams.team_id = team_id_in));
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_alert_history` (IN `instance_id_in` INT, IN `user_id_in` INT)  NO SQL
INSERT INTO alert_history (instance_id,user_id,is_viewed)
VALUES (instance_id_in,user_id_in,0)$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_answer_key` (IN `key_text_in` VARCHAR(300), IN `question_id_in` INT, IN `is_correct_in` BOOLEAN)  MODIFIES SQL DATA
BEGIN
INSERT INTO answer_keys(answer_keys.key_text, answer_keys.question_id, answer_keys.is_correct)
VALUES (key_text_in, 
        (SELECT form_questions.question_id
        FROM form_questions
        WHERE form_questions.question_id = question_id_in),
       is_correct_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_auth_code` (IN `auth_code_in` VARCHAR(45), IN `username_in` VARCHAR(60))  NO SQL
BEGIN
INSERT INTO email_verifications (email_verifications.auth_code, email_verifications.user_id)
VALUES (auth_code_in,
       (SELECT users.user_id
       FROM users
       WHERE users.username = username_in));
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_class` (IN `user_id_in` INT, IN `name_in` VARCHAR(25), IN `sd1_term_in` VARCHAR(20), IN `sd1_year_in` INT, IN `sd2_term_in` VARCHAR(20), IN `sd2_year_in` INT)  BEGIN
INSERT INTO classes (user_id, name, sd1_term, sd1_year, sd2_term, sd2_year)
VALUES (user_id_in,name_in,sd1_term_in,sd1_year_in,sd2_term_in,sd2_year_in);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_coordinator` (IN `user_id_in` INT)  MODIFIES SQL DATA
INSERT INTO coordinators (coordinators.user_id)
VALUES ((SELECT users.user_id
        FROM users
        WHERE users.user_id = user_id_in))$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form` (IN `access_level_in` VARCHAR(20), IN `description_in` VARCHAR(150), IN `form_threshold_in` INT, IN `title_in` VARCHAR(50), IN `type_in` VARCHAR(20), IN `user_id_in` INT)  BEGIN

INSERT INTO forms (access_level, description, form_threshold, title, type, user_id)
VALUES(access_level_in,
      description_in,
      form_threshold_in,
      title_in,
      type_in,
      user_id_in);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_answer` (IN `instance_id_in` INT, IN `question_id_in` INT, IN `text_in` VARCHAR(300), IN `user_id_in` INT)  MODIFIES SQL DATA
BEGIN
INSERT INTO form_answers (form_answers.user_id, form_answers.question_id, form_answers.instance_id, form_answers.text)
VALUES ((SELECT user_id
        FROM users
        WHERE users.user_id = user_id_in), 
        (SELECT question_id
        FROM form_questions
        WHERE form_questions.question_id = question_id_in),
        (SELECT instance_id
        FROM form_instances
        WHERE form_instances.instance_id = instance_id_in),
        text_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_answer_test` (IN `question_id_in` INT, IN `text_in` VARCHAR(150), IN `is_correct_in` INT)  NO SQL
BEGIN
INSERT INTO form_answers_test (form_answers_test.question_id, form_answers_test.text, form_answers_test.is_correct)
VALUES (question_id_in,
        text_in,
        is_correct_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_attendance` (IN `did_attend_in` BOOLEAN, IN `instance_id_in` INT, IN `reason_in` VARCHAR(60), IN `student_id_in` INT)  MODIFIES SQL DATA
BEGIN
INSERT INTO form_attendance (form_attendance.instance_id, form_attendance.student_id, form_attendance.did_attend, form_attendance.reason)
VALUES ((SELECT form_instances.instance_id
        FROM form_instances
        WHERE form_instances.instance_id = instance_id_in),
        (SELECT students.student_id
        FROM students
        WHERE students.student_id = student_id_in), 
        did_attend_in, 
        reason_in);
CALL meeting_complete(instance_id_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_completion` (IN `user_id_in` INT, IN `form_id_in` INT, IN `grade_in` INT)  MODIFIES SQL DATA
BEGIN
INSERT INTO form_completion(form_completion.user_id, form_completion.form_id, form_completion.grade)
VALUES (user_id_in, form_id_in, grade_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_instance_team` (IN `end_date_in` DATETIME, IN `form_id_in` INT, IN `start_date_in` DATETIME, IN `team_id_in` INT)  NO SQL
BEGIN
INSERT INTO form_instances (form_id, team_id, start_date, end_date, grade, is_complete)
VALUES((SELECT form_id
       FROM forms
       WHERE forms.form_id = form_id_in),
      (SELECT teams.team_id
      FROM teams	
      WHERE teams.team_id = team_id_in),
      start_date_in,
      end_date_in,
      NULL,
      0);
      select  LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_instance_user` (IN `end_date_in` DATETIME, IN `form_id_in` INT, IN `start_date_in` DATETIME, IN `student_id_in` INT)  NO SQL
BEGIN
INSERT INTO form_instances (form_instances.form_id, form_instances.student_id, form_instances.team_id, form_instances.start_date, form_instances.end_date, form_instances.grade, form_instances.is_complete)
VALUES((SELECT forms.form_id
      FROM forms
      WHERE forms.form_id = form_id_in),
      (SELECT students.student_id
      FROM students
      WHERE students.student_id = student_id_in),
      NULL,
      start_date_in,
      end_date_in,
      NULL,
      0);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_instance_user_and_team` (IN `end_date_in` DATE, IN `form_id_in` INT, IN `start_date_in` DATE, IN `team_id_in` INT, IN `user_id_in` INT)  NO SQL
BEGIN
INSERT INTO form_instances (form_instances.form_id, form_instances.user_id, form_instances.team_id, form_instances.start_date, form_instances.end_date, form_instances.grade, form_instances.is_complete)
VALUES((SELECT forms.form_id
      FROM forms
      WHERE forms.form_id = form_id_in),
      (SELECT users.user_id
      FROM users
      WHERE users.user_id = user_id_in),
      (SELECT teams.team_id
      FROM teams
      WHERE teams.team_id = team_id_in),
      start_date_in,
      end_date_in,
      NULL,
      0);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_milestone` (IN `instance_id_in` INT, IN `team_id_in` INT)  BEGIN
INSERT INTO form_milestones (form_milestones.team_id, form_milestones.instance_id) 
VALUES((SELECT teams.team_id 
        FROM teams 
        WHERE teams.team_id = team_id_in),
       (SELECT form_instances.instance_id 
        FROM form_instances 
        WHERE form_instances.instance_id= instance_id_in));
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_question` (IN `form_id_in` INT, IN `category_id_in` INT, IN `question_text_in` VARCHAR(150), IN `question_type_in` SET('free_response','multiple_choice','select','fill_blank','question','likert'), IN `threshold_in` INT)  BEGIN
INSERT INTO form_questions (form_questions.form_id, form_questions.category_id, form_questions.question_text, form_questions.question_type, form_questions.is_active, form_questions.question_threshold)
VALUES (form_id_in,
        category_id_in,
        question_text_in,
       	question_type_in,
        1,
        threshold_in);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_question_test` (IN `form_id_in` INT, IN `category_id_in` INT, IN `title_in` VARCHAR(100))  NO SQL
BEGIN
INSERT INTO form_questions_test (form_questions_test.form_id, form_questions_test.category_id, form_questions_test.title)
VALUES (form_id_in,
        category_id_in,
        title_in);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_task` (IN `instance_id_in` INT, IN `milestone_instance_id_in` INT)  BEGIN
INSERT INTO form_tasks (form_tasks.instance_id, form_tasks.milestone_instance_id, form_tasks.time_complete, form_tasks.task_note)
VALUES((SELECT form_instances.instance_id
       FROM form_instances
       WHERE form_instances.instance_id = instance_id_in),
      (SELECT form_instances.instance_id
       FROM form_instances
       WHERE form_instances.instance_id = milestone_instance_id_in),
      null,
      null);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_form_test` (IN `user_id_in` INT, IN `title_in` VARCHAR(50), IN `description_in` VARCHAR(150))  BEGIN

INSERT INTO forms_test (user_id, title, description)
VALUES(user_id_in,
      title_in,
      description_in);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_question_category` (IN `name_in` VARCHAR(60))  BEGIN
INSERT INTO question_category 
SET question_category.name = name_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_sponsor` (IN `company_in` VARCHAR(60), IN `email_in` VARCHAR(60))  BEGIN
INSERT INTO sponsors(sponsors.company, sponsors.email)
VALUES (company_in, email_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_student` (IN `user_id_in` INT, IN `class_id_in` INT)  NO SQL
BEGIN
INSERT INTO students (students.user_id, students.class_id, students.is_active, students.is_verified)
VALUES ((SELECT users.user_id
        FROM users
        WHERE users.user_id = user_id_in),
       class_id_in, 
       0,
       0);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_survey_question` (IN `category_id_in` INT, IN `form_id_in` INT, IN `question_text_in` VARCHAR(150), IN `question_type_in` SET('free_response','multiple_choice','select','fill_blank','question','radial'))  BEGIN

INSERT INTO form_questions (question_text, form_id, category_id, question_type)
VALUES (question_text_in, 
        (SELECT forms.form_id 
         FROM forms 
         WHERE forms.form_id = form_id_in),
        (SELECT question_category.category_id 
         FROM question_category 
         WHERE question_category.category_id = category_id_in),
        question_type_in
       );
       select last_insert_id();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_team` (IN `description_in` VARCHAR(150), IN `title_in` VARCHAR(60), IN `user_id_in` INT, IN `sponsor_name_in` VARCHAR(60), IN `sponsor_company_in` VARCHAR(60), IN `sponsor_email_in` VARCHAR(60), IN `class_id_in` INT)  BEGIN
INSERT INTO teams (teams.coordinator_id, teams.project_name, teams.description, teams.sponsor_name, teams.sponsor_company, teams.sponsor_email, teams.class_id)
VALUES((SELECT coordinators.coordinator_id
       FROM coordinators
       WHERE coordinators.user_id = user_id_in),
       title_in,
       description_in,
       sponsor_name_in,
       sponsor_company_in,
       sponsor_email_in,
       class_id_in);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_ucf_degree` (IN `name_in` VARCHAR(60))  NO SQL
BEGIN
INSERT INTO ucf_degrees (name)
VALUES (name_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_ucf_department` (IN `name_in` VARCHAR(60))  NO SQL
BEGIN
INSERT INTO ucf_departments (name)
VALUES (name_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `insert_user` (IN `username_in` VARCHAR(60), IN `password_in` VARCHAR(60), IN `type_in` SET('admin','student','advisor','coordinator'), IN `last_name_in` VARCHAR(30), IN `first_name_in` VARCHAR(30), IN `email_in` VARCHAR(60))  BEGIN
INSERT INTO users (username,password,type,first_name,last_name,email) 
VALUES (username_in,password_in,type_in,first_name_in,last_name_in,email_in);
select LAST_INSERT_ID();
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `login` (IN `username_in` VARCHAR(60), IN `password_in` VARCHAR(60))  BEGIN
SELECT username  
FROM users 
WHERE username_in = users.username AND password_in=users.password;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `meeting_complete` (IN `instance_id_in` INT)  NO SQL
BEGIN
UPDATE form_instances
SET form_instances.is_complete = 1
WHERE form_instances.instance_id = instance_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `set_alert_emailed` (IN `alert_id_in` INT)  NO SQL
UPDATE alert_history
SET alert_history.is_emailed = 1
WHERE alert_history.alert_id = alert_id_in$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `student_verified` (IN `username_in` VARCHAR(60))  NO SQL
BEGIN

UPDATE email_verifications
SET email_verifications.auth_code = null
WHERE email_verifications.user_id = 
(SELECT users.user_id
 FROM users
 WHERE users.username = username_in);
 
UPDATE students
SET students.is_verified = 1
WHERE students.user_id = (
	SELECT users.user_id
	FROM users
	WHERE users.username = username_in);

END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `submit_quiz` (IN `answer_text_in` VARCHAR(150), IN `instance_id_in` INT, IN `question_id_in` INT, IN `student_id_in` INT)  NO SQL
BEGIN
INSERT INTO form_answers (form_answers.student_id, form_answers.question_id, form_answers.instance_id, form_answers.answer_text)
VALUES ((SELECT students.student_id
        FROM students
        WHERE students.student_id = student_id_in),
       (SELECT form_questions.question_id
       FROM form_questions
       WHERE form_questions.question_id = question_id_in),
       (SELECT form_instances.instance_id
       FROM form_instances
       WHERE form_instances.instance_id = instance_id_in),
       answer_text_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `submit_survey` (IN `instance_id_in` INT, IN `question_id_in` INT, IN `answer_text_in` VARCHAR(200), IN `student_id_in` INT)  BEGIN
INSERT INTO form_answers (student_id, question_id, instance_id, answer_text)
values(student_id_in,
      question_id_in,
      instance_id_in,
      answer_text_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_answer_key` (IN `key_id_in` INT, IN `question_id_in` INT, IN `text_in` VARCHAR(60))  NO SQL
BEGIN
UPDATE answer_keys
SET answer_keys.text = text_in, answer_keys.question_id = question_id_in
WHERE answer_keys.key_id = key_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_attendance` (IN `id` INT, IN `result` TINYINT(1), IN `new_reason` VARCHAR(60))  BEGIN
IF(strcmp(date_in,'')!=0) 
	THEN UPDATE `attendance` set didattend=result where meeting_id=id_in; 
end if;
IF(strcmp(new_agenda,'')!=0) 
	THEN UPDATE `attendance` set reason=new_reason where meeting_id=id_in; 
end if;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_coordinator` (IN `user_id_in` INT, IN `department_id_in` INT)  MODIFIES SQL DATA
BEGIN 
UPDATE coordinators
SET coordinators.user_id = user_id_in, coordinators.department_id = department_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_form` (IN `access_level_in` SET('coordinator','sponsor','student',''), IN `end_date_in` DATE, IN `form_id_in` INT, IN `is_complete` BOOLEAN, IN `start_date_in` DATE, IN `title_in` VARCHAR(60), IN `type_in` SET('quiz','survey','milestone','meeting','task','attendance'), IN `user_id_in` INT)  MODIFIES SQL DATA
BEGIN
UPDATE forms
SET forms.user_id = user_id_in, forms.type = type_in, forms.title = title_in, forms.start_date = start_date_in, forms.end_date = end_date_in, forms.access_level = access_level_in, forms.is_complete = is_complete_in
WHERE forms.form_id = form_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_form_answer` (IN `answer_id_in` INT, IN `user_id_in` INT, IN `form_id_in` INT, IN `question_id_in` INT, IN `text_in` VARCHAR(150))  MODIFIES SQL DATA
BEGIN
UPDATE form_answers
SET form_answers.user_id = user_id_in, form_answers.question_id = question_id_in, form_answers.form_id = form_id_in, form_answers.text = text_in
WHERE form_answers.answer_id = answer_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_form_grades` (IN `user_id_in` INT, IN `form_id_in` INT, IN `grade_in` INT)  MODIFIES SQL DATA
BEGIN
UPDATE form_grades
SET form_grades.user_id = user_id_in, form_grades.form_id = form_id_in, form_grades.grade = grade_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_form_milestone` (IN `milestone_id_in` INT, IN `team_id_in` INT, IN `form_id_in` INT)  NO SQL
BEGIN
UPDATE form_milestones
SET form_milestones.team_id = team_id_in, form_milestones.form_id = form_id_in
WHERE form_milestones.milestone_id = milestone_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_form_question` (IN `question_id_in` INT, IN `form_id_in` INT, IN `category_id_in` INT, IN `text_in` VARCHAR(150))  MODIFIES SQL DATA
BEGIN
UPDATE form_questions set is_active =0 where from_question.question_id =question_id_in;
UPDATE form_questions
SET form_questions.form_id = form_id_in, form_questions.category_id= category_id_in, form_questions.text = text_in
WHERE form_questions.question_id = question_id_in ;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_form_task` (IN `task_id_in` INT, IN `student_id_in` INT, IN `form_id_in` INT, IN `milestone_id_in` INT)  MODIFIES SQL DATA
BEGIN
UPDATE form_tasks
SET form_tasks.student_id = student_id_in, form_tasks.form_id = form_id_in, form_tasks.milestone_id = milestone_id_in
WHERE form_tasks.task_id = task_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_password` (IN `id_in` INT, IN `username_in` VARCHAR(60), IN `new_password` VARCHAR(60))  BEGIN 

UPDATE users SET users.password = new_password where id_in=`users`.id and username_in=username;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_question_category` (IN `category_id_in` INT, IN `name_in` VARCHAR(60))  MODIFIES SQL DATA
BEGIN
UPDATE question_category
SET question_category.name = name_in
WHERE question_category.category_id = category_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_sponsor` (IN `sponsor_id_in` INT, IN `user_id_in` INT, IN `team_id_in` INT, IN `company_in` VARCHAR(60), IN `is_internal_in` BOOLEAN)  MODIFIES SQL DATA
BEGIN
UPDATE sponsors
SET sponsors.user_id=user_id_in, sponsors.team_id=team_id_in, sponsors.company=company_id_in, sponsors.is_internal=is_internal_in
WHERE sponsors.sponsor_id=sponsor_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_student` (IN `student_id_in` INT, IN `team_id_in` INT, IN `degree_id_in` INT, IN `sd1_term_in` SET('spring','summer','fall',''), IN `sd1_year_in` YEAR, IN `sd2_term_in` SET('spring','summer','fall',''), IN `sd2_year_in` YEAR, IN `class_id_in` INT)  NO SQL
BEGIN
UPDATE students
SET students.team_id = (
    SELECT teams.team_id
	FROM teams
	WHERE teams.team_id = team_id_in),
students.degree_id = degree_id_in,
students.sd1_term = sd1_term_in,
students.sd1_year = sd1_year_in,
students.sd2_term = sd2_term_in, 
students.sd2_year = sd2_year_in,
students.class_id = class_id_in
WHERE students.student_id = student_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_student_old` (IN `id_in` INT, IN `team_in` INT, IN `major_in` ENUM('CS','ECE','IEMS','MAE'), IN `user_in` INT, IN `username_in` VARCHAR(60), IN `type_in` SET('admin','student','SPONSOR','PROFESSOR'), IN `first_name_in` VARCHAR(30), IN `last_name_in` VARCHAR(30), IN `email_in` VARCHAR(60))  MODIFIES SQL DATA
BEGIN
IF(strcmp(class_in,'')!=0) 
	THEN UPDATE `students` set class_id=class_in where students.user_id=id_in; 
end if;
IF(strcmp(team_in,'')!=0) 
	THEN UPDATE `students` set team_id=team_in where students.user_id=id_in; 
end if;
IF(strcmp(major_in,' ')!=0) 
	THEN UPDATE `students` set major=major_in where students.user_id=id_in; 
end if;
call edit_user(user_in,username_in,type_in,first_name_in,last_name_in,email_in);
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_student_with_team` (IN `student_id_in` INT, IN `team_id_in` INT)  NO SQL
BEGIN
UPDATE students
SET students.team_id = (
    SELECT teams.team_id
	FROM teams
	WHERE teams.team_id = team_id_in)
WHERE students.student_id = student_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_team` (IN `id_in` INT, IN `new_coordinator` INT, IN `name_in` VARCHAR(60), IN `description_in` VARCHAR(150), IN `sd1_in` SET('spring','summer','fall'), IN `sd2_in` SET('spring','summer','fall'), IN `sd1_year_in` YEAR, IN `sd2_year_in` YEAR)  MODIFIES SQL DATA
BEGIN
IF(strcmp(name_in,'')!=0) 
	THEN UPDATE `teams` set project_title=name_in where team_id=id_in;
end if;
IF(strcmp(description_in,'')!=0) 
	THEN UPDATE `teams` set description=description_in where team_id=id_in;
end if;
IF(strcmp(sd1_in,'')!=0) 
	THEN UPDATE `teams` set sd1_semester=sd1_in where team_id=id_in;
end if;
IF(strcmp(sd1_year_in,'')!=0) 
	THEN UPDATE `teams` set sd1_year=sd1_year_in where team_id=id_in;
end if;
IF(strcmp(sd2_in,'')!=0) 
	THEN UPDATE `teams` set sd2_semester=sd2_in where team_id=id_in;
end if;
IF(strcmp(sd2_year_in,'')!=0) 
	THEN UPDATE `teams` set sd2_year=sd2_year_in  where team_id=id_in;
end if;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_ucf_degree` (IN `name_in` VARCHAR(60), IN `degree_id_in` INT)  NO SQL
BEGIN
UPDATE ucf_degrees
SET name = name_in
WHERE degree_id = degree_id_in;
END$$

CREATE DEFINER=`sql9321404`@`%` PROCEDURE `update_user` (IN `id_in` INT, IN `username_in` VARCHAR(60), IN `type_in` SET('admin','student','SPONSOR','PROFESSOR'), IN `first_name_in` VARCHAR(30), IN `last_name_in` VARCHAR(30), IN `email_in` VARCHAR(60))  BEGIN
IF(strcmp(username_in,'')!=0) 
	THEN UPDATE `users` set username=username_in where users.user_id=id_in; 
end if;
IF(strcmp(first_name_in,'')!=0) 
	THEN UPDATE `users` set first_name=first_name_in where users.user_id=id_in; 
end if;
IF(strcmp(last_name_in,'')!=0) 
	THEN UPDATE `users` set last_name=last_name_in where users.user_id=id_in; 
end if;
IF(strcmp(email_in,'')!=0) 
	THEN UPDATE `users` set email=email_in where users.user_id=id_in; 
end if;
IF(strcmp(type_in,'')!=0) 
	THEN UPDATE `users` set type=type_in where users.user_id=id_in; 
end if;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `advisors`
--

CREATE TABLE `advisors` (
  `advisor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `team_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `alert_history`
--

CREATE TABLE `alert_history` (
  `alert_id` int(11) NOT NULL,
  `instance_id` int(11) NOT NULL,
  `is_viewed` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `is_emailed` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alert_history`
--

INSERT INTO `alert_history` (`alert_id`, `instance_id`, `is_viewed`, `user_id`, `is_emailed`) VALUES
(4, 13, 1, 3, 1),
(5, 18, 1, 3, 1),
(6, 18, 1, 3, 1),
(7, 17, 1, 3, 1),
(8, 17, 0, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `answer_keys`
--

CREATE TABLE `answer_keys` (
  `key_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `key_text` varchar(300) NOT NULL,
  `is_correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answer_keys`
--

INSERT INTO `answer_keys` (`key_id`, `question_id`, `key_text`, `is_correct`) VALUES
(2, 3, 'A period of 2-4 weeks in which all team members agree upon an amount of work to be completed', 1),
(3, 3, 'The time between the start of a project and the end of a project', 0),
(4, 3, 'A period of 2-4 weeks in which the Scrum Master determines what work will be completed', 0),
(5, 3, 'A daily 15 minute meeting in which team members talk about the project', 0),
(6, 4, 'A period of 2-4 weeks in which all team members agree upon an amount of work to be completed', 1),
(7, 4, 'The time between the start of a project and the end of a project', 0),
(8, 4, 'A period of 2-4 weeks in which the Scrum Master determines what work will be completed', 0),
(9, 4, 'A daily 15 minute meeting in which team members talk about the project', 0),
(10, 5, '', 1),
(11, 6, 'novelty', 1),
(12, 8, '405', 1),
(13, 9, 'Relational Databases', 0),
(14, 9, 'NoSQL Databases', 1),
(15, 9, 'AWS S3', 0),
(16, 9, 'Azure absolute databases', 0),
(17, 10, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `sd1_term` varchar(10) NOT NULL,
  `sd2_term` varchar(10) NOT NULL,
  `sd1_year` int(11) NOT NULL,
  `sd2_year` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `user_id`, `name`, `sd1_term`, `sd2_term`, `sd1_year`, `sd2_year`, `is_active`) VALUES
(1, 3, 'COP 4934 Fall 2019', 'fall', 'spring', 2019, 2020, 0),
(2, 3, 'COP 4934 Spring 2020', 'spring', 'fall', 2020, 2020, 1),
(4, 3, 'COP 4935 Spring 2020', 'fall', 'spring', 2019, 2020, 1),
(5, 3, 'COP 4934 Summer 2020', 'Summer', 'Fall', 2020, 2020, 1);

-- --------------------------------------------------------

--
-- Table structure for table `coordinators`
--

CREATE TABLE `coordinators` (
  `coordinator_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coordinators`
--

INSERT INTO `coordinators` (`coordinator_id`, `user_id`, `department_id`) VALUES
(1, 3, 1),
(2, 28, 0);

-- --------------------------------------------------------

--
-- Table structure for table `email_verifications`
--

CREATE TABLE `email_verifications` (
  `verification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `auth_code` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `form_id` int(11) NOT NULL,
  `type` set('quiz','survey','milestone','task','meeting','attendance') NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `access_level` set('coordinator','sponsor','student','advisor') NOT NULL,
  `description` varchar(2048) NOT NULL,
  `form_threshold` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`form_id`, `type`, `user_id`, `title`, `access_level`, `description`, `form_threshold`) VALUES
(4, 'quiz', 3, 'Quiz #1', 'coordinator', 'This quiz focuses on the software development cycle ', 78),
(5, 'quiz', 3, 'Quiz #1', 'coordinator', 'This quiz focuses on the software development cycle ', 78),
(6, 'meeting', 42, 'Final Presentation Practice', 'student', 'Make sure your code is committed and has no bugs', NULL),
(7, 'survey', 3, 'Final Group Peer Review', 'coordinator', 'Make or break your teammates\' grades!', NULL),
(8, 'quiz', 3, 'Quiz # 2', 'coordinator', 'This quiz focuses on personal and company finances / economics', 90),
(9, 'survey', 3, 'Final Group Peer Review', 'coordinator', 'Make or break your teammates\' grades!', NULL),
(10, 'meeting', 44, 'First Presentation Practice', 'student', 'Let\'s introduce ourselves', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `form_answers`
--

CREATE TABLE `form_answers` (
  `answer_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `instance_id` int(11) NOT NULL,
  `answer_text` varchar(150) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `form_answers`
--

INSERT INTO `form_answers` (`answer_id`, `question_id`, `instance_id`, `answer_text`, `student_id`) VALUES
(7, 8, 13, '192', 64),
(8, 9, 13, 'Relational Databases', 64),
(9, 10, 13, 'Against   The facebook users were not being told that they would undergo a psychological experiment.  Additionally, neither the users or facebook empl', 64),
(10, 8, 14, '405', 65),
(11, 9, 14, 'NoSQL Databases', 65),
(12, 10, 14, 'Against   The facebook users were not being told that they would undergo a psychological experiment.  Additionally, neither the users or facebook empl', 65),
(13, 11, 18, '4', 62),
(14, 11, 18, '1', 63),
(15, 11, 18, '6', 64),
(16, 11, 18, '10', 65),
(17, 11, 17, '1', 62),
(18, 11, 17, '1', 63),
(19, 11, 17, '10', 64),
(20, 11, 17, '6', 65);

-- --------------------------------------------------------

--
-- Table structure for table `form_attendance`
--

CREATE TABLE `form_attendance` (
  `attendance_id` int(11) NOT NULL,
  `instance_id` int(11) NOT NULL,
  `did_attend` tinyint(1) NOT NULL,
  `reason` varchar(60) DEFAULT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `form_attendance`
--

INSERT INTO `form_attendance` (`attendance_id`, `instance_id`, `did_attend`, `reason`, `student_id`) VALUES
(3, 19, 1, '', 62),
(4, 19, 1, '', 63),
(5, 19, 1, '', 64),
(6, 19, 0, 'We don\'t know why', 65);

-- --------------------------------------------------------

--
-- Table structure for table `form_instances`
--

CREATE TABLE `form_instances` (
  `instance_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `is_complete` tinyint(1) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `form_instances`
--

INSERT INTO `form_instances` (`instance_id`, `student_id`, `form_id`, `team_id`, `grade`, `is_complete`, `start_date`, `end_date`) VALUES
(6, 62, 5, NULL, NULL, 0, '2020-04-20 07:11:24', '2020-04-20 07:11:24'),
(7, 63, 5, NULL, NULL, 0, '2020-04-20 07:11:24', '2020-04-20 07:11:24'),
(8, 0, 6, 3, NULL, 0, '2020-04-21 13:00:00', '2020-04-21 15:00:00'),
(9, 62, 7, NULL, NULL, 0, '2020-04-20 07:15:08', '2020-04-20 07:15:08'),
(10, 63, 7, NULL, NULL, 0, '2020-04-20 07:15:08', '2020-04-20 07:15:08'),
(11, 62, 8, NULL, NULL, 0, '2020-04-22 00:00:00', '2020-04-22 23:59:00'),
(12, 63, 8, NULL, NULL, 0, '2020-04-22 00:00:00', '2020-04-22 23:59:00'),
(13, 64, 8, NULL, 33, 1, '2020-04-22 00:00:00', '2020-04-22 23:59:00'),
(14, 65, 8, NULL, 100, 1, '2020-04-22 00:00:00', '2020-04-22 23:59:00'),
(15, 62, 9, NULL, NULL, 0, '2020-04-20 08:41:59', '2020-04-20 08:41:59'),
(16, 63, 9, NULL, NULL, 0, '2020-04-20 08:41:59', '2020-04-20 08:41:59'),
(17, 64, 9, NULL, NULL, 1, '2020-04-20 08:41:59', '2020-04-20 08:41:59'),
(18, 65, 9, NULL, NULL, 1, '2020-04-20 08:41:59', '2020-04-20 08:41:59'),
(19, 0, 10, 3, NULL, 1, '2020-04-24 12:00:00', '2020-04-24 13:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `form_milestones`
--

CREATE TABLE `form_milestones` (
  `milestone_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `instance_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `form_questions`
--

CREATE TABLE `form_questions` (
  `question_id` int(11) NOT NULL,
  `question_text` varchar(150) NOT NULL,
  `category_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `question_type` set('free_response','multiple_choice','select','fill_blank','question','radial') NOT NULL,
  `form_id` int(11) NOT NULL,
  `question_threshold` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `form_questions`
--

INSERT INTO `form_questions` (`question_id`, `question_text`, `category_id`, `is_active`, `question_type`, `form_id`, `question_threshold`, `user_id`) VALUES
(3, 'In Agile Programming, what is the best description of a Sprint?', 2, 1, 'multiple_choice', 4, NULL, NULL),
(4, 'In Agile Programming, what is the best description of a Sprint?', 2, 1, 'multiple_choice', 5, NULL, NULL),
(5, 'What is GPL\'d code?', 2, 1, 'free_response', 5, NULL, NULL),
(6, '___ refers to being new or unique and is a required characteristic of a patentable idea according to USPTO', 2, 1, 'fill_blank', 5, NULL, NULL),
(7, 'Participation grade: ', 1, 1, '', 7, 4, NULL),
(8, 'Rounded to the nearest whole dollar, how much total interest is earned by putting $1000 to work for 9 years at a fixed compound annual interest rate o', 2, 1, 'fill_blank', 8, NULL, NULL),
(9, 'Which of the following is easiest to scale for data that can be queried?', 2, 1, 'multiple_choice', 8, NULL, NULL),
(10, 'Give an ethical justification both for and against the way Facebook \"experimented on its users\" in 2012.', 2, 1, 'free_response', 8, NULL, NULL),
(11, 'Participation grade: ', 1, 1, '', 9, 6, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `form_tasks`
--

CREATE TABLE `form_tasks` (
  `task_id` int(11) NOT NULL,
  `instance_id` int(11) NOT NULL,
  `milestone_instance_id` int(11) DEFAULT NULL,
  `time_complete` date DEFAULT NULL,
  `task_note` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question_category`
--

CREATE TABLE `question_category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `sponsor_id` int(11) NOT NULL,
  `company` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `team_id` int(11) DEFAULT '3',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `user_id`, `class_id`, `team_id`, `is_active`, `is_verified`) VALUES
(1, 4, 2, 1, 1, 1),
(2, 5, 2, 1, 1, 1),
(3, 6, 2, 1, 1, 1),
(4, 7, 2, 1, 1, 1),
(5, 8, 2, 1, 1, 1),
(6, 9, 4, 2, 1, 1),
(7, 10, 4, 2, 1, 1),
(8, 11, 4, 2, 1, 1),
(9, 12, 4, 2, 1, 1),
(10, 13, 4, 2, 1, 1),
(11, 14, 2, 1, 1, 1),
(12, 14, 4, 2, 1, 1),
(56, 35, 2, NULL, 0, 0),
(57, 36, 2, NULL, 0, 0),
(58, 37, 2, NULL, 0, 0),
(59, 38, 2, NULL, 0, 0),
(60, 39, 2, NULL, 0, 0),
(61, 40, 2, NULL, 0, 0),
(62, 41, 5, 3, 0, 0),
(63, 42, 5, 3, 0, 0),
(64, 43, 5, 3, 0, 0),
(65, 44, 5, 3, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL,
  `project_name` varchar(60) NOT NULL,
  `coordinator_id` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  `class_id` int(11) NOT NULL,
  `sponsor_name` varchar(60) NOT NULL,
  `sponsor_company` varchar(60) NOT NULL,
  `sponsor_email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`team_id`, `project_name`, `coordinator_id`, `description`, `class_id`, `sponsor_name`, `sponsor_company`, `sponsor_email`) VALUES
(1, 'Team 1', 1, 'Team for Class 2', 2, 'Professor M', 'M. Inc.', 'm@gmail.com'),
(2, 'Team 2', 1, 'Team for Class 4', 4, 'Professor J', 'J. Inc.', 'j@gmail.com'),
(3, 'AR Experience', 1, 'AR software with great functionality', 5, 'Siemens', 'SIemens', 'siemens@siemens.com');

-- --------------------------------------------------------

--
-- Table structure for table `ucf_degrees`
--

CREATE TABLE `ucf_degrees` (
  `degree_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ucf_degrees`
--

INSERT INTO `ucf_degrees` (`degree_id`, `name`) VALUES
(1, 'Computer Science ');

-- --------------------------------------------------------

--
-- Table structure for table `ucf_departments`
--

CREATE TABLE `ucf_departments` (
  `departments_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ucf_departments`
--

INSERT INTO `ucf_departments` (`departments_id`, `name`) VALUES
(1, 'Computer Science ');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `type` set('admin','student','sponsor','coordinator','advisor') NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `type`, `first_name`, `last_name`, `email`) VALUES
(3, 'admin', '$2b$10$jv7RZOgRXYdVXXJAmB4Y8uAscO/F2Fw/Z0dhXUd8UDPQ8HKjuyyza', 'coordinator', 'Admin', 'Heinrich', 'sd.coordinator2020@gmail.com'),
(4, 'mike', '$2b$10$GSvAKZqiDiJ/nMsk0ppaG.vDooKXunfhLLJj5Fu5g.c9NRbnKF82G', 'student', 'Mike', 'Johnson', 'emscur@gmail.com'),
(5, 'jess', '$2b$10$wI7ZfPQshIv9wLfigcKuxuZoxFQxSfsosKVQGKu7KU6kgf/G5eg3G', 'student', 'Jess', 'Gerry', 'emscur@gmail.com'),
(6, 'barry', '$2b$10$b49gOcf4G2g.m/HWUmN27eFqf/sNYAzzAlDp96UQ34G/0WQBWzaCe', 'student', 'Barry', 'Bardugo', 'emscur@gmail.com'),
(7, 'ed', '$2b$10$5MjChrh8J3uvlpAZsPFH9.YUrLjlAQPMXwbhyXx/zMvIuYLHBpTRu', 'student', 'Ed', 'Sullivan', 'emscur@gmail.com'),
(8, 'cat', '$2b$10$509nVtEPvof4DoujcdXCJuRTdKKSbA8CBSahgoP0nVzLNWSmNDZD2', 'student', 'Cat', 'Kemp', 'emscur@gmail.com'),
(9, 'kal', '$2b$10$DwqRhlmiunijn/61HjRUtuv/HedMkf92jGRaDWq2ObQ9wIALd8y.6', 'student', 'Kal', 'Mein', 'emscur@gmail.com'),
(10, 'micheal', '$2b$10$mIoMSQg3YJ2Npei4.3Om3.m/c/ftLok5tnOflvPluyVklGFCfYFNi', 'student', 'Micheal', 'Sam', 'emscur@gmail.com'),
(11, 'fran', '$2b$10$59NjRwLfpZVArXOq7zhsO.qJ1rSCa/LsW7KbmlPOr90iXf2eFyswK', 'student', 'Fran', 'Guy', 'emscur@gmail.com'),
(12, 'dude', '$2b$10$FHyB94EwHesAAKt/YH01eOq4OSYt00KAQYVwtSife0d0/4nDx7RuW', 'student', 'Dude', 'Day', 'emscur@gmail.com'),
(13, 'iko', '$2b$10$3R4RhjOJGll8CrQzsxKZu.6YjVcLeLpCQ0kRuZMx8XFv6z.CeKmfu', 'student', 'Iko', 'Jay', 'emscur@gmail.com'),
(14, 'al', '$2b$10$5qZKhuoMOmAGoTwJdt5MQemqVOHZz.CIzpT/RREKH/BeI1aok2tua', 'student', 'Al', 'Able', 'emscur@gmail.com'),
(24, 'advisor', '$2b$10$C24RhWR84JzV9HMJTBrTnecEhHIMPbpuA.Vg2FTZVDYGV5/4e3T0a', 'advisor', 'Advisor', 'Leinecker', 'emscur@gmail.com'),
(28, 'myAdmin', '$2b$10$lt7TVWQFbM9hhY5Zrz2Gg.TL2Pyuppfu8N50IqRwe5QzYBrgiKWRi', 'coordinator', 'Larry', 'Smith', 'sd.coordinator2020@gmail.com'),
(35, 'john', '$2b$10$03tJSCjAh4E1TbRF2a96yOYWNViojCUBPA5pBKVrD3cMbEuATTq46', 'student', 'John', 'Smith', 'sd.coordinator2020@gmail.com'),
(36, 'mark', '$2b$10$aFAWFTlaEi/FYX3WMJNkvuWP1HAyU03gKPQ3Or6DZNd3gf9LMvGZ6', 'student', 'Mark', 'Doe', 'sd.coordinator2020@gmail.com'),
(37, 'mary', '$2b$10$sCQS3TnokiB6rie/x/0vYuhPzc3xfVWaQuf2uIvS2YkMsYqLcq6Ie', 'student', 'Mary', 'Kay', 'sd.coordinator2020@gmail.com'),
(38, 'joseph', '$2b$10$kQXk2T/jlU3dRTMvG1qf7eHBOtoWEfRbSNwjcgYbulKLDhCHZOopi', 'student', 'Joseph', 'Tracy', 'sd.coordinator2020@gmail.com'),
(39, 'gary', '$2b$10$Yiorn1rP5Vcc54eA1CTxl.nvBEwYPOY.sfcd5h0sjjuQx7Vuo0pxW', 'student', 'Gary', 'Johnson', 'sd.coordinator2020@gmail.com'),
(40, 'jacob', '$2b$10$ivqfSYpve2B1R3/3uK9yoe7843DnYXmZ/lTBfXXF0QEQHU2ylMs1K', 'student', 'Jacob', 'John', 'sd.coordinator2020@gmail.com'),
(41, 'wyatt', '$2b$10$2ul0/gKjCcWUtmYQXLpt3eM.xA/yZ3qUlXC7e2W/LZArbscs2HAZe', 'student', 'Wyatt', 'Gray', 'sd.coordinator2020@gmail.com'),
(42, 'zack', '$2b$10$bXtO4KxjmfYlWIEI6fh7feCAF7tOCpFXKYwkR7MGV4hrZPjhNE92K', 'student', 'Zack', 'Smith', 'sd.coordinator2020@gmail.com'),
(43, 'jackie', '$2b$10$Qu1Qk6HtqqweqIRXoJW9/eiijngHWgEuRqiQG5PDiNEObTwSNyPGq', 'student', 'Jackie', 'Gray', 'sd.coordinator2020@gmail.com'),
(44, 'gabriel', '$2b$10$D/EPMHQXJsLf.NR.nIqhZuLoJeuAxNqbVFEntDBWGxE4HqWkdj4Dm', 'student', 'Gabriel', 'Smith', 'sd.coordinator2020@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advisors`
--
ALTER TABLE `advisors`
  ADD PRIMARY KEY (`advisor_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `alert_history`
--
ALTER TABLE `alert_history`
  ADD PRIMARY KEY (`alert_id`),
  ADD KEY `instance_id` (`instance_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `answer_keys`
--
ALTER TABLE `answer_keys`
  ADD PRIMARY KEY (`key_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `coordinators`
--
ALTER TABLE `coordinators`
  ADD PRIMARY KEY (`coordinator_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `email_verifications`
--
ALTER TABLE `email_verifications`
  ADD PRIMARY KEY (`verification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`form_id`),
  ADD KEY `owner` (`user_id`);

--
-- Indexes for table `form_answers`
--
ALTER TABLE `form_answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `instance_id` (`instance_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `form_attendance`
--
ALTER TABLE `form_attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `instance_id` (`instance_id`) USING BTREE,
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `form_instances`
--
ALTER TABLE `form_instances`
  ADD PRIMARY KEY (`instance_id`),
  ADD KEY `form_id` (`form_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `form_milestones`
--
ALTER TABLE `form_milestones`
  ADD PRIMARY KEY (`milestone_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `instance_id` (`instance_id`);

--
-- Indexes for table `form_questions`
--
ALTER TABLE `form_questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `form_id` (`form_id`),
  ADD KEY `form_questions_ibfk_4_idx` (`user_id`);

--
-- Indexes for table `form_tasks`
--
ALTER TABLE `form_tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `form_id` (`instance_id`),
  ADD KEY `meeting_instance_id` (`milestone_instance_id`);

--
-- Indexes for table `question_category`
--
ALTER TABLE `question_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`sponsor_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `coordinator_id` (`coordinator_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `ucf_degrees`
--
ALTER TABLE `ucf_degrees`
  ADD PRIMARY KEY (`degree_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `ucf_departments`
--
ALTER TABLE `ucf_departments`
  ADD PRIMARY KEY (`departments_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advisors`
--
ALTER TABLE `advisors`
  MODIFY `advisor_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `alert_history`
--
ALTER TABLE `alert_history`
  MODIFY `alert_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `answer_keys`
--
ALTER TABLE `answer_keys`
  MODIFY `key_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `coordinators`
--
ALTER TABLE `coordinators`
  MODIFY `coordinator_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `email_verifications`
--
ALTER TABLE `email_verifications`
  MODIFY `verification_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `form_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `form_answers`
--
ALTER TABLE `form_answers`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `form_attendance`
--
ALTER TABLE `form_attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `form_instances`
--
ALTER TABLE `form_instances`
  MODIFY `instance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `form_questions`
--
ALTER TABLE `form_questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `question_category`
--
ALTER TABLE `question_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `sponsor_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `ucf_degrees`
--
ALTER TABLE `ucf_degrees`
  MODIFY `degree_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `ucf_departments`
--
ALTER TABLE `ucf_departments`
  MODIFY `departments_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
