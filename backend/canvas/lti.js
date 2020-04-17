'use strict';
const lti = require('ims-lti');
const nonceStore = new lti.Stores.MemoryStore();
const secrets = {
  canvaskey: 'canvassecret'
};

const getSecret = (consumerKey, callback) => {
  const secret = secrets[consumerKey];
  if (secret) {
    return callback(null, secret);
  }

  let err = new Error(`Unknown consumer ${consumerKey}`);
  err.status = 403;

  return callback(err);
};

exports.handleLaunch = (req, res, next) => {
  if (!req.body) {
    let err = new Error('Expected a body');
    err.status = 400;
    return next(err);
  }

  const consumerKey = req.body.oauth_consumer_key;
  if (!consumerKey) {
    let err = new Error('Expected a consumer');
    err.status = 422;
    return next(err);
  }

  getSecret(consumerKey, (err, consumerSecret) => {
    if (err) {
      return next(err);
    }

    const provider = new lti.Provider(consumerKey, consumerSecret, nonceStore, lti.HMAC_SHA1);

    provider.valid_request(req, (err, isValid) => {
      if (err) {
        return next(err);
      }
      if (isValid) {
        req.session.regenerate(err => {
          if (err) next(err);
          req.session.email = provider.body.lis_person_contact_email_primary;
          req.session.contextId = provider.context_id;
          req.session.userId = provider.userId;
          req.session.userfullname = provider.body.lis_person_name_full;
          req.session.ltiConsumer = provider.body.tool_consumer_instance_guid;
          req.session.isTutor = provider.instructor === true;
          req.session.context_id = provider.context_id;
          req.session.coursename = provider.context_title;
          req.session.username = provider.display_name;
          console.log("UserID: " + req.session.userId);
          console.log("Email: " + req.session.email);
          console.log("Course: " + req.session.coursename);
          if(req.session.isTutor){  //to implement: teacher has different view from student
            console.log("This is a teacher");
            return res.redirect(301, 'http://localhost:3000');
          }else{
            console.log("This is a student");
            return res.redirect(301, 'http://localhost:3000');
          };
        });
      } else {
        return next(err);
      }
    });
  });
};
