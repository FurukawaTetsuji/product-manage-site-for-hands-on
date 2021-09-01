// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
};
