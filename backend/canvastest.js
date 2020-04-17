const canvas = require('./canvas/canvasapi');
var buffer;
function callback(result){
    buffer = result;
    index = 0;
    console.log('There are ' + buffer.length + ' elements.');
    while(index < buffer.length){
        console.log(buffer[index]);
        //console.log('ID:' + buffer[index].id + '    NAME:' + buffer[index].name);
        index++;
    };
}

//canvas.getCoursesofUser(callback, 35); //users: 35, 40, 36, 39
//canvas.getStudentsinCourse(callback, 1); //courses: 1, 2
//canvas.getGroupsinCourse(callback, 1); //courses: 1, 2
canvas.getUsersinGroup(callback, 2); // groups: 1, 2