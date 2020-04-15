const server = require('./server.js');
const url = server.domain;
const dhyurl = server.dhData;
module.exports = {
  wxlogin: url + '/api/wx/user/login',
  postUserInfo: '/api/wx/user/userInfo',
  userInfo:'/api/wx/user/userInfo'
};
