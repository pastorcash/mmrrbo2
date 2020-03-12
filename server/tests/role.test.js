// --- Mocha Server Test file
const expect = require('expect');
const request = require('supertest');
// const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Role} = require('./../models/role');
const {
  roles,
  populateRoles,
} = require('./seed/role.seed');

// Test lifecycle code:
// ======================

// Now clear collection and then repopluate with seed data
//  before EACH execution of EACH Test.
beforeEach(populateRoles);
 
// Data tests here!!! 
// 
// ------------------

describe('Populate Database', async function() {
    it('Should put data into the test database', (done) => {
      return done();
    });
  });