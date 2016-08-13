#!/usr/bin/env node
var exec = require('child_process').exec;
var async = require('async');

module.exports = {
  set: function(to) {
    return new Promise(function (resolve, reject) {
      exec(`amixer -D pulse sset Master ${to}%`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Mixer set volume error: ${error}`);
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  }
};
