#!/usr/bin/env node
var exec = require('child_process').exec;
var async = require('async');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
var os = require('os');
var osxVol = require('osx-vol');

var sayi = 50;
console.log(typeof sayi);
console.log(`0.${Math.floor(sayi/10)}`);
var i = `0.${Math.floor(sayi/10)}`;
console.log(typeof i);

console.log(parseFloat(i));

updateNotifier({pkg}).notify();
module.exports = {
  set: function(to) {
    return new Promise(function (resolve, reject) {
      if (os.type() === 'Darwin') {
        osxVol.get().then(function(level) {
            console.log(level);
        });
        var volume = parseFloat(`0.${Math.floor(to / 10)}`);
        osxVol.set(volume).then(function () {
            console.log('Changed volume level to ${to}%');
        });
      } else {
        exec(`amixer -D pulse sset Master ${to}%`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Mixer set volume error: ${error}`);
            reject(error);
            return;
          }
          resolve(stdout);
        });
      }
    });
  },
  increase: function(to) {
    return new Promise(function (resolve, reject) {
      exec(`amixer -D pulse sset Master ${to}%+`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Mixer set volume error: ${error}`);
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  },
  decrease: function(to) {
    return new Promise(function (resolve, reject) {
      exec(`amixer -D pulse sset Master ${to}%-`, (error, stdout, stderr) => {
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
