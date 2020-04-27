# Backend



## Database

You can find an exported version of our database with all the stored procedures. This file is called sql9321404.sql. 

## API Endpoints

This application has tons of endpoints, from user registration and login, to form creation and submission. Some of them are included in a Postman collection called Backup.postman_dump.json. 

We found Postman to be very useful for simulating the API calls. If you are not familiar with Postman, I would recommend following some tutorials. This shouldn't take too long, it's a very simple application. All you need to do is download Postman and import the backup JSON. 

## Source Code

Most of the functions are stored in the /controllers directory. This is where user registration, login, and form stuff is located.

The Express routes are located in the /routes folder, in api.js.

The /uploads sub-directory is where all uploaded files are stored. At this time, we support storing the csv files used for importing students.

## Available Scripts

In the backend directory, you can run:

### `node index.js`

This will start the server, listening on port 3001. You can change these settings in the config sub-directory.

## Going Forward

The main functionality of this application is working. I would recommend setting up a local/remote database, and testing out all the API endpoints, from user registration to the forms engine. I know this can be quite overwhelming, so just take your time and make sure you understand what the parameters are for each function, and double check everything is working. 

These are some features that could be implemented/improved:

1. Canvas Integration (single sign-on login)
    Pull course information from Webcourses
    Pull user data
    Pull classes/groups information
2. Alerts for Surveys/Peer Reviews: for now, these are created based on the student that completed the peer review, rather the students that were actually reviewed/graded.
3. Make sure upoading Team CSV works: we know uploading students works, but uploading teams can be beneficial if you can't get that information from Webcourses just yet.
4. Coordinator IDs: currently, coordinators/instructors are using their user_id for pulling/populating the database. I would recommend switching those to coordinator_id for scalability. 
5. Email verifications: when you import a student CSV file, with student names, emails and IDs, a temporary password is sent to their corresponding email address. However, ideally, we should send them a verification code that will promt them to change their password. Right now, they are only getting a temporary password.
6. Graphical Analytics: this is probably one of the most important things going forward. Create some sort of student page, or group page for coordinators to access all information for any given student/group. For a student, a coordinator would like to see the classes/groups they are in (current/previous classes), their grades (right now grades are only assigned to form submission, maybe add a grade column to the students table), and their attendance in meetings. For groups page, the coordinator would like to see the group members, their grades, the group information, the meeting attendance.
7. Tags for forms and form questions: so that coordinators can filter the form templates created given a specific tag
    
