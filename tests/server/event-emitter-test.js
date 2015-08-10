var expect = require('chai').expect;
var sinon = require('sinon');

var EventEmitter = require('../../server/event-emitter');

/*
 IMPORTANT NOTE: please do not use require('events') to pass the following specs.
 You will receive no credit.
 */

describe('Event Emitter', function () {

    var emitter;

    beforeEach(function () {
        emitter = new EventEmitter();
    });

    describe('prototype', function () {

        xit('should include .emit', function () {
            expect(EventEmitter.prototype.emit).to.be.a('function');
        });

        xit('should include .on', function () {
            expect(EventEmitter.prototype.on).to.be.a('function');
        });

        xit('should include .removeListener', function () {
            expect(EventEmitter.prototype.on).to.be.a('function');
        });

    });

    xit('should be able to register a listener using .on ' +
        'and broadcast an event with .emit', function () {

        var spy = sinon.spy();

        var tweet = {
            username: '@jadensmith',
            text: 'I\'m Glad That Our Distance Makes Us Witness Ourselves From A Different Entrance.'
        };

        // This is a registration of a listener function on a specific event.
        emitter.on('jadenTweeted', function (jadensTweet) {
            spy(jadensTweet);
        });

        // This emission of the event with a payload should call the listener function.
        emitter.emit('jadenTweeted', tweet);

        expect(spy.called).to.be.equal(true);
        expect(spy.calledWith(tweet)).to.be.equal(true);

    });

    xit('should be able to call a registered listener multiple times', function () {

        var spy = sinon.spy();

        var tweet1 = {
            username: '@jadensmith',
            text: 'I\'m Glad That Our Distance Makes Us Witness Ourselves From A Different Entrance.'
        };

        var tweet2 = {
            username: '@jadensmith',
            text: 'I Build Pyramids Constantly'
        };

        // This is a registration of a listener function on a specific event.
        emitter.on('tweetFromJaden', function (jadensTweet) {
            spy(jadensTweet);
        });

        // This emission of the event with a payload should call the listener function.
        emitter.emit('tweetFromJaden', tweet1);
        emitter.emit('tweetFromJaden', tweet2);

        expect(spy.callCount).to.be.equal(2);
        expect(spy.calledWith(tweet1)).to.be.equal(true);
        expect(spy.calledWith(tweet2)).to.be.equal(true);

    });

    xit('should be able to call a register multiple listeners to the same event', function () {

        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        var spy3 = sinon.spy();

        var tweet = {
            username: '@jadensmith',
            text: 'Why Is It Always 3 WHY IS IT ALWAYS 3!!!!!'
        };

        // This is a registration of a listener function on a specific event.
        emitter.on('heyItsAJadenTweet', function (jadensTweet) {
            spy1(jadensTweet);
        });

        emitter.on('heyItsAJadenTweet', function (jadensTweet) {
            spy2(jadensTweet);
        });

        emitter.on('heyItsAJadenTweet', function (jadensTweet) {
            spy3(jadensTweet);
        });

        // This emission of the event with a payload should call the listener function.
        emitter.emit('heyItsAJadenTweet', tweet);

        expect(spy1.calledWith(tweet)).to.be.equal(true);
        expect(spy2.calledWith(tweet)).to.be.equal(true);
        expect(spy3.calledWith(tweet)).to.be.equal(true);

    });

    xit('should call listeners with all the arguments passed to emit except the event name', function () {

        var spy = sinon.spy();

        var tweets = [
            'The Great Gatsby Is One Of The Greatest Movies Of All Time, Coachella.',
            'How Can Mirrors Be Real If Our Eyes Aren\'t Real',
            'Most Trees Are Blue',
            'You Taught Me How To Play The Piano But Have Never Heard Me.'
        ];

        // This is a registration of a listener function on a specific event.
        emitter.on('lotsOfJadenTweets!', function (tweet1, tweet2, tweet3, tweet4) {
            spy(tweet1);
            spy(tweet2);
            spy(tweet3);
            spy(tweet4);
        });

        // This emission of the event with a payload should call the listener function.
        emitter.emit.apply(emitter, ['lotsOfJadenTweets!'].concat(tweets));

        expect(spy.getCall(0).args[0]).to.be.equal(tweets[0]);
        expect(spy.getCall(1).args[0]).to.be.equal(tweets[1]);
        expect(spy.getCall(2).args[0]).to.be.equal(tweets[2]);
        expect(spy.getCall(3).args[0]).to.be.equal(tweets[3]);

    });

    xit('should be able to remove listeners by using .removeListener', function () {

        var spy = sinon.spy();
        var spy2 = sinon.spy();

        var tweet = {
            username: '@jadensmith',
            text: 'I Just Scrolled Through My Tweets And "I" Started Laughing.'
        };

        var spy2Listener = function (jadenTweet) {
            spy2(jadenTweet);
        };

        emitter.on('yayJadenTweeted', function (jadenTweet) {
            spy(jadenTweet);
        });

        emitter.on('yayJadenTweeted', spy2Listener);

        emitter.emit('yayJadenTweeted', tweet);

        expect(spy.callCount).to.be.equal(1);
        expect(spy2.callCount).to.be.equal(1);

        emitter.removeListener('yayJadenTweeted', spy2Listener);

        emitter.emit('yayJadenTweeted', tweet);

        expect(spy.callCount).to.be.equal(2);
        expect(spy2.callCount).to.be.equal(1);


    });


});