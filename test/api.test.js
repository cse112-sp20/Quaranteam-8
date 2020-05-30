const api = require('../src/api/api');
const testAPIToken = "5ed2b278-d7a6-4344-b33f-94b8901aa75a";
const memberID = "5ecdd3de-0125-4888-802a-5d3ba46ca0dc";
const fetch =  require("isomorphic-fetch").fetch;
const resolve = require("isomorphic-fetch").resolve;

// These variables are based on the testing clubhouse
// MAKE SURE THESE ARE UP TO DATE IF YOU ADD/REMOVE/EDIT STORIES ON CLUBHOUSE
const myIncompleteIDs = [31, 30, 38];
const allIncompleteIDs = [31, 30, 34, 38];
const myName = '_Test User_';
const myIcon = 'https://cdn.patchcdn.com/assets/layout/contribute/user-default.png'


/**
 * Unit Test 1
 * Testing for api.getMyIncompleteStories()
 * Checks if the count of test stories are correct and that they are the correct ids
 */
it('Test MY Incomplete Stories', done => {
    // Set up API variables, then run our test
    api.setupTest(testAPIToken, memberID, () => {
        // The only story that has been assigned to this test user as of right now is story 56
        incompleteStories = api.getMyIncompleteStories();
        expect(incompleteStories.length).toBe(myIncompleteIDs.length);  // Make sure the number of incomplete is correct

        // Make sure each incomplete ID specified above will be in here
        incompleteStories.forEach(story => {
            expect(myIncompleteIDs).toContain(story['id']);
        });

        done();
    });
});

/**
 * Unit Test 2
 * Testing for api.getAllIncompleteStories()
 * Checks if the count of test stories are correct and that they are the correct ids
 */
it('Test ALL Incomplete Stories', done => {
    // Set up API variables, then run our test
    api.setupTest(testAPIToken, memberID, () => {
        // The only story that has been assigned to this test user as of right now is story 56
        incompleteStories = api.getAllIncompleteStories();
        
        expect(incompleteStories.length).toBe(allIncompleteIDs.length);  // Make sure the number of all incomplete is correct

        // Just like UT1, check if all the stories returned is a part of our expected list
        incompleteStories.forEach(story => {
            expect(allIncompleteIDs).toContain(story['id']);
        });
        
        done();
    });
});



/**
 * Testing suite for api.js unit tests
 * Copied Arren's format
 * 
 */
describe('api simple unit tests', () => {

    /**
     * Unit Test 3:
     * Checks if getMemberName returns correct name
     */
    it('Testing getMemberName', () => {
        var name;
        // test setup - tried in beforeAll/beforeEach block, can't get it to work
        api.setupTest(testAPIToken, memberID, () => {
            name = api.getMemberName();
            expect(name).toMatch(myName);
            done();
        })

    });

    /**
     * Unit Test 4:
     * Checks if getMemberProfile returns a correct default profile
     */
    it('Testing default getMemberProfile', () => {
        var name;
        var icon;
        var profile;

        api.setupTest(testAPIToken, memberID, () => {
            profile = api.getMemberProfile();
            expect(profile.name).toMatch(myName);
            expect(profile.icon).toContain(myIcon);
            done();
        });

    });

});