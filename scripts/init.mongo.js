#!/usr/bin/mongo

var db = new Mongo().getDB("bugsdb");

db.bugs.remove({});

db.bugs.insert([
  {priority: 'p1', status:'open', owner:'Ravan', title:'App crashes on open'},
  {priority: 'p2', status:'new', owner:'Eddie', title:'Misaligned border on panel'}
]);
