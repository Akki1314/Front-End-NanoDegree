 //We're placing all of our tests within the $() function,
 //since some of these tests may require DOM elements. We want
 // to ensure they don't run until the DOM is ready.

 //given
 $(function () {
     // default suite
     describe('RSS Feeds', function () {
         //given spec
         it('are defined', function () {
             expect(allFeeds).toBeDefined();
             expect(allFeeds.length).not.toBe(0);
         });

         // TODO: Write a test that loops through each feed
         // in the allFeeds object and ensures it has a URL defined
         //and that the URL is not empty.

         it('url defined', function () {
             for (var j in allFeeds) {
                 //expect that url is non empty
                 expect(allFeeds[j].url).not.toEqual("");
                 expect(allFeeds[j].url).not.toBeNull();
                 //checks url is defined or not
                 expect(allFeeds[j].url).toBeDefined();

             }
         });

         it('Name defined or not and also check its empty or not', function () {
             for (var j = 0; j < allFeeds.length; j++) {
                 // checks name is non empty
                 expect(allFeeds[j].name).not.toEqual("");
                 //checks name is defined or not
                 expect(allFeeds[j].name).toBeDefined();
             } // end for loop
         });
     });

     // make a new suite 'The menu'
     describe('The menu', function () {
         var body = document.body;
         it('ensures menu element  hidden by default', function () {
             //check menu element is present or not
             expect(body.classList).toContain("menu-hidden");
         });

         //var menuicon = document.getElementsByClassName("menu-icon-link");
         var menuicon = document.querySelector(".menu-icon-link");
         it('Menu changes visibilty when menu icon is clicked',
             function () {
                 menuicon.click();
                 //on click show the menu
                 expect(body.classList).not.toContain("menu-hidden");
                 menuicon.click();
                 //on click hide the menu
                 expect(body.classList).toContain("menu-hidden");
             });
     });

     // make a new suite named as 'Initial Entries'
     describe('Initial Entries', function () {
         // we use before each to check redundancy
         beforeEach(function (done) {
             loadFeed(0, function () {
                 done();
             });
         });

         // use of asynchronous done() and loadfeed() function 
         it('At least Single entry element within feed container', function (done) {
             //this checks that there is a single entry in feed container or not
             expect($('.feed .entry').length).toBeGreaterThan(0);
             done();
         });

     });

     // make a new suite name as 'New Feed Selection'
     describe('New feed Selection', function () {
         //offed is old feed and nfeed is new feed
         var ofeed, nfeed;
         //before Each checks reduandancy
         beforeEach(function (done) {
             loadFeed(0, function () {
                 ofeed = document.querySelector('.feed').innerHTML;
                 loadFeed(1, function () {
                     nfeed = document.querySelector('.feed').innerHTML;
                     done();
                 });
             });
         });

         it('comparing both the feeds', function (done) {
             // compare both the old and new feed and it will be different
             expect(ofeed).not.toEqual(nfeed);
             done();
         });
     });
 }());
