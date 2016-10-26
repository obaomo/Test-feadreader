$(function () {


            // This make sure  that RSS feeds are defined.
            describe('RSS Feeds', function () {

                //Make sure allFeeds are defined and not empty.
                it('should be defined', function () {
                    expect(allFeeds)
                        .toBeDefined();
                    expect(allFeeds.length)
                        .not.toBe(0);
                });

                //Make sure that the url is defined.
                it('should have non-empty URLs', function () {
                    allFeeds.forEach(function (feed) {
                        expect(feed.url)
                            .toBeTruthy();
                    });
                });

                //Make sure no empty name and defined each name.
                it('should have non-empty names', function () {
                    allFeeds.forEach(function (feed) {
                        expect(feed.name)
                            .toBeTruthy();
                    });
                });

            });

            // Show that the menu suite is running.
            describe('The Menu', function () {

                it('should be hidden by default', function () {
                    expect($('body')
                            .hasClass('menu-hidden'))
                        .toBeTruthy();
                });

                var menuHiddenBefore,
                    menuHiddenAfter;

                // Confirm that menu state changes on click
                it('should be able to change visibility when the menu icon is clicked', function () {

                    menuHiddenBefore = $('body')
                        .hasClass('menu-hidden');
                    $('.menu-icon-link')
                        .trigger("click");
                    menuHiddenAfter = $('body')
                        .hasClass('menu-hidden');

                    expect(menuHiddenBefore)
                        .not.toEqual(menuHiddenAfter);

                    menuHiddenBefore = $('body')
                        .hasClass('menu-hidden');
                    $('.menu-icon-link')
                        .trigger("click");
                    menuHiddenAfter = $('body')
                        .hasClass('menu-hidden');

                    expect(menuHiddenBefore)
                        .not.toEqual(menuHiddenAfter);

                });


            });

            // Showing that initial entry is loaded in the .feed container.
            describe('Initial Entries', function () {

                beforeEach(function (done) {
                    $('.feed')
                        .empty();
                    loadFeed(0, done);
                });

                it('should be at least a single entry element', function () {
                    expect($('.feed')
                            .html()
                            .length)
                        .toBeGreaterThan(0);

                });

            });


            // Describing the first entry element is not empty
            describe('First Entry Element', function () {


                beforeEach(function (done) {
                    $('.feed')
                        .empty();
                    loadFeed(0, done);
                });

                it('should have a defined non-empty entry heading and url', function () {

                    expect($('.entry h2')
                            .first()
                            .text())
                        .toBeTruthy();
                    expect($('.entry-link')
                            .first()
                            .attr('href'))
                        .toBeTruthy();

                });
            });

            // Show when the content changes in the new feed loads.
            describe('New Feed Selection', function () {

                var titleBefore, titleAfter,  htmlBefore, htmlAfter;
                    
                beforeEach(function (done) {

                    $('.feed')
                        .empty();

                    loadFeed(0, function () {
                        titleBefore = $('.header-title')
                            .text();
                        htmlBefore = $('.feed')
                            .html();
                        done();
                    });
                });

                it('should be able to change the content', function (done) {
                    loadFeed(1, function () {

                        titleAfter = $('.header-title')
                            .text();
                        htmlAfter = $('.feed')
                            .html();

                        expect(titleAfter)
                            .not.toEqual(titleBefore);
                        expect(htmlAfter)
                            .not.toEqual(htmlBefore);
                        done();
                    });
         
                });

                afterAll(function (done) {
                    loadFeed(0, done);
                });
             });
}());