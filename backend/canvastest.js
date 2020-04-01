const canvas = require('./canvas/canvasapi');
const access_token = '28UJuZgFjSb8vjn52jTLNmEnukOUXvStzTH6PoXovqZ8abJwD4CXslaZwLJGujEP'
var buffer;
function callback(result){
    buffer = result;
    index = 0;
    console.log('There are ' + buffer.length + ' elements.');
    while(index < buffer.length){
        //console.log(buffer[index]);
        console.log('ID:' + buffer[index].id + '    NAME:' + buffer[index].name);
        index++;
    };
}

//canvas.getCoursesofUser(access_token, callback, '35'); //users: 35, 40, 36, 39
canvas.getStudentsinCourse(access_token, callback, '1'); //courses: 1, 2
//canvas.getGroupsinCourse(access_token, callback, '1'); //courses: 1, 2
//canvas.getUsersinGroup(access_token, callback, '1'); // groups: 1, 2