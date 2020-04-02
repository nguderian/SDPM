const request = require('request');
const canvas_link = 'http://192.168.1.174:3000/api/v1/'
var obj = 4;
const access_token = '28UJuZgFjSb8vjn52jTLNmEnukOUXvStzTH6PoXovqZ8abJwD4CXslaZwLJGujEP'

// api/v1/users/[userID]/courses -> get courses for a user
// api/v1/courses/[courseID]/students -> get students
// api/v1/courses/[courseID]/groups -> get all groups in a course
// api/v1/group/[groupID]/users -> get all users in a group
exports.getUserProfile = function (callback, user_id) {
  request(canvas_link +'users/' + user_id + '/profile?access_token=' + access_token, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    return callback(body);
  })
};
exports.getCoursesofUser = function (callback, user_id) {
  request(canvas_link +'users/' + user_id + '/courses?access_token=' + access_token, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    return callback(body);
  })
};

exports.getStudentsinCourse = function (callback, course_id){
  request(canvas_link +'courses/' + course_id + '/students?access_token=' + access_token, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    return callback(body);
  })
};

exports.getGroupsinCourse = function (callback, course_id) {
  request(canvas_link +'courses/' + course_id + '/groups?access_token=' + access_token, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    return callback(body);
  })
};

exports.getUsersinGroup = function (callback, group_id) {
  request(canvas_link +'groups/' + group_id + '/users?access_token=' + access_token, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    return callback(body);
  })
};