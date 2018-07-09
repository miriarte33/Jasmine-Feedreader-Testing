/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

		//Ensures there is a url defined and it is not empty
		it('does not have an empty url', function() {
			for (feed of allFeeds) {
				expect(feed.url.length).toBeGreaterThan(0);  
			}
		});

		//Ensures there is a name defined and that it is not empty
		it('does not have an empty name', function() {
			for (feed of allFeeds) {
				expect(feed.name.length).toBeGreaterThan(0); 
			}
		});
    });

	//test suite for the menu
	describe('The menu', function() {
		//ensures menu element is hidden by default
		it('should hide the menu element by default', function() {
			expect(bod.classList.contains('menu-hidden')).toBe(true); 
		});

		//ensures the menu open and closes when the hamburger icon is clicked
		//hint to use click method found in this gist https://gist.github.com/rmurphey/846908
		it('should change visibility when the menu icon is clicked', function() {
			var menuIcon = document.querySelector('.menu-icon-link'); 
			menuIcon.click(); 
			expect(bod.classList.contains('menu-hidden')).toBe(false); 
			menuIcon.click(); 
			expect(bod.classList.contains('menu-hidden')).toBe(true); 
		}); 

	});

	//test suite for initial loadFeed entries
	describe('Initial Entries', function() {
		beforeEach(function(done) {
			loadFeed(0, done); 
		}); 

		//ensures entries are loaded when a feed is loaded
		it('should have atleast one .entry element within the .feed container', function(done) {
			var feedContainer = document.querySelector('.feed'),
				entryElement = document.querySelector('.entry'); 
			expect(feedContainer.contains(entryElement)).toBe(true); 
			done(); 
		}); 
	});

	//test suite for when a new feed is selected from the menu 
	describe('New Feed Selection', function() {
		var oldFeed = '',
			newFeed = ''; 

		beforeEach(function(done) {
			loadFeed(0, function() {
				oldFeed = $('.feed').html(); 
				loadFeed(1, function() { //calling loadFeed 1 inside loadFeed 0 accounts for asynchronous behavior of the loadFeed function
					newFeed = $('.feed').html(); 
					done(); 
				});
			});
		});

		//ensures content changes when a new feed is loaded
		it('should change content', function(done) {
			expect(newFeed).not.toBe(oldFeed); 
			loadFeed(0); 
			done(); 
		}); 
	});
}());
