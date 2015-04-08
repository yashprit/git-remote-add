'use strict';
var
  exec = require("child_process").exec,
  ssh = require("git-repo-url").ssh,
  path = require('path');

function remote(username, reponame, cb) {

  if (typeof username !== 'string') {
    throw new Error('username should be string');
  }

  if (typeof reponame === 'function') {
    cb = reponame;
    reponame = path.basename(process.cwd());
  }

  if (typeof cb !== "function") {
    throw new Error("callback should be function")
  }

  var prefix = "git remote add origin ";
  var url = ssh(username, reponame);
  var command = prefix + url;
  exec(command, function(err, status) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, true);
  });
};

module.exports = remote;
