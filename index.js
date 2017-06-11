'use strict';
var
  exec = require("shelljs").exec,
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

  const { stdout, stderr, code } = exec(command, { silent: true });

  if(stderr) {
    cb(stderr, null);
  } else {
    cb(null, true);
  }
};

module.exports = remote;
