// Test lifecycle code:
// =========================
const {ObjectID} = require('mongodb');
const {Role} = require('./../../models/role');

// Create and seed three roles
const roleOneId = new ObjectID();  // Admin
const roleTwoId = new ObjectID();  // Grantor/District
const roleThreeId = new ObjectID();  // Location
const roleFourId= new ObjectID(); // Teacher


const roles = [{
    _id: roleOneId,
    roleName: 'Admin',
    roleDescription: 'Administrator',
    toolBarDisplay: 'Admin',
    dasboardDisplay: 'Admin',
    restrictedRole: false,
  }, {
    _id: roleTwoId,
    roleName: 'Grantor',
    roleDescription: 'Grantor/Fundor',
    toolBarDisplay: 'Multi',
    dasboardDisplay: 'Grantor',
    restrictedRole: true,
  }, {
    _id: roleThreeId,
    roleName: 'Location',
    roleDescription: 'Single Site/School',
    toolBarDisplay: 'Location',
    dasboardDisplay: 'Location',
    restrictedRole: true,
  }, {
    _id: roleFourId,
    roleName: 'Teacher',
    roleDescription: 'Teacher',
    toolBarDisplay: 'Teacher',
    dasboardDisplay: 'Teacher',
    restrictedRole: false,
  }
];

// Now populate documents/data tables
const populateRoles = async () => {
    try {
      await Role.remove({});
      const roleOne = await new Role(roles[0]).save();
      const roleTwo = await new Role(roles[1]).save();
      const roleThree = await new Role(roles[2]).save();
      const roleFour = await new Role(roles[3]).save();
    } catch (err) {
      console.log('Pop Roles db Error: ', err);
    }
  };   
  
  module.exports = {
    roles,
    populateRoles,
  };
  