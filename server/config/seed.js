/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.findOne({name: 'Admin'}, function(err, user){
  if (err){ console.log(err); }
  if (!user){
    User.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function(){
      console.log('Admin account re-created');
    });
  }
});