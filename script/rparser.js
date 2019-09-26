#!/usr/bin/env node

const ros=require('rosnodejs');
const std_msgs=ros.require('std_msgs').msg;
const geometry_msgs=ros.require('geometry_msgs').msg;
const tflib=require('./tflib');

exports.parse=function(str){
  // data format is assumed as '***(X,Y,Z,A,B,C)\n'.
  const ary=str.replace(/\).*/g, ']').replace(/.*\(/, '[').replace(/;/, '],[').replace(/E\+/g, 'E').replace(/\+/g, '');
  let coords;
  coords=JSON.parse('['+ary+']');
  return coords.map(function(e){
    if(e.length<6){
      ros.log.warn('r-parser warn: short elements '+ary);
      return null;
    }
    return e;
  }).filter(e=>e);
}
/*
  const msg='X2(1,2,3,4,5,6;7,6,5,4,3,2)(0,1)';
  let coods=exports.parse(msg.substr(2).trim());
  console.log(coods);
*/
