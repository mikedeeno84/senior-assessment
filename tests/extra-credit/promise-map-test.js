var expect = require('chai').expect;
var sinon = require('sinon');

var path = require('path');
var fs = require('fs');
var Promise = require('es6-promise').Promise;

var readFile = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, contents) {
            if (err) return reject(err);
            resolve(contents);
        });
    });
};

// The following line should add a .map function on the es6-promise Promise object
// ... which will be the system under test.
// Notice that we are not using the exported value.
require('../../extra-credit/promise-map');

describe('Promise.map', function () {

    xit('should be a function', function () {
        expect(Promise.map).to.be.a('function');
    });

    xit('should return a promise', function () {
        var returnValue = Promise.map(['./package.json'], function () {
            return true;
        });
        expect(returnValue).to.be.an.instanceof(Promise);
    });

    describe('returned promise', function () {

        xit('should resolve to elements of the input array transformed by given iterator', function (done) {

            var returnedPromise = Promise.map(
                ['./package.json', './README.md'],
                function (fileName) {
                    return fileName.toUpperCase();
                }
            );

            returnedPromise.then(function (fileNamesInCaps) {
                expect(fileNamesInCaps.length).to.be.equal(2);
                expect(fileNamesInCaps[0]).to.be.equal('./PACKAGE.JSON');
                expect(fileNamesInCaps[1]).to.be.equal('./README.MD');
                done();
            }).catch(done);

        });

        xit('should reject with the error thrown by the first iterator to throw an error', function (done) {

            var returnedPromise = Promise.map(
                ['./package.json', './README.md', './.gitignore'],
                function (fileName) {

                    if (fileName === './README.md') {
                        throw new Error('World exploded!!!');
                    }

                    return fileName.toUpperCase();

                }
            );

            returnedPromise.then(function () {
                done(new Error('This should have errored!'));
            }, function (err) {
                expect(err.message).to.be.equal('World exploded!!!');
                done();
            }).catch(done);

        });

    });

    describe('returning a promise from the iterator', function () {

        var filePaths;

        beforeEach(function () {

            filePaths = ['1.txt', '2.txt', '3.txt'].map(function (filePath) {
                return path.join(__dirname, filePath);
            });

        });

        xit('should have the transformed value be the resolved value of the promise', function (done) {

            var mapPromise = Promise.map(filePaths, function (filePath) {
                return readFile(filePath).then(function (fileContents) {
                    return fileContents.toString();
                });
            });

            mapPromise.then(function (files) {
                expect(files).to.include('one');
                expect(files).to.include('two');
                expect(files).to.include('three');
                done();
            }).catch(done);

        });

        xit('should maintain the order of the input array', function (done) {

            var mapPromise = Promise.map(filePaths, function (filePath) {
                return readFile(filePath).then(function (fileContents) {
                    return fileContents.toString();
                });
            });

            mapPromise.then(function (files) {
                expect(files[0]).to.be.equal('one');
                expect(files[1]).to.be.equal('two');
                expect(files[2]).to.be.equal('three');
                done();
            }).catch(done);

        });

        xit('should reject the map promise if iterator returns a promise that rejects', function (done) {

            filePaths.push('LOLTOTALLYNOTAFILE!!.txt');

            var mapPromise = Promise.map(filePaths, function (filePath) {
                return readFile(filePath).then(function (fileContents) {
                    return fileContents.toString();
                });
            });

            mapPromise.then(function () {
                done(new Error('This should have errored!'));
            }, function (err) {
                expect(err).to.be.an.instanceof(Error);
                expect(err.code).to.be.equal('ENOENT');
                expect(err.path).to.be.equal('LOLTOTALLYNOTAFILE!!.txt');
                done();
            }).catch(done);

        });

    });

    describe('promises in input array', function () {

        var filePaths;

        beforeEach(function () {

            filePaths = [];

            // A promise for a read of 1.txt as a string
            filePaths.push(
                readFile(path.join(__dirname, './1.txt')).then(function (fileContents) {
                    return fileContents.toString();
                })
            );

            // A string that is the path of 2.txt
            filePaths.push(path.join(__dirname, './2.txt'));

            // A promise for a read of 3.txt as a string
            filePaths.push(
                readFile(path.join(__dirname, './3.txt')).then(function (fileContents) {
                    return fileContents.toString();
                })
            );

        });

        xit('should call iterator function with the resolved value of the promise', function (done) {

            var spy = sinon.spy();

            var mapPromise = Promise.map(filePaths, function (file) {

                spy(file);

                if (file.search('.txt') !== -1) {
                    return readFile(file).then(function (fileContents) {
                        return fileContents.toString().toUpperCase();
                    })
                } else {
                    return file.toUpperCase();
                }

            });

            mapPromise.then(function (files) {

                expect(spy.calledWith('one')).to.be.equal(true);
                expect(spy.calledWith(path.join(__dirname, './2.txt'))).to.be.equal(true);
                expect(spy.calledWith('three')).to.be.equal(true);

                expect(files).to.be.deep.equal(['ONE', 'TWO', 'THREE']);

                done();

            }).catch(done);

        });

        xit('should reject the map promise if a promise in the input array rejects', function (done) {

            var rejectError = new Error('World exploded!!!');

            filePaths.push(Promise.reject(rejectError));

            var mapPromise = Promise.map(filePaths, function (file) {
                return true;
            });

            mapPromise.then(function () {
                done(new Error('This should have errored!'));
            }, function (err) {
                expect(err).to.be.equal(rejectError);
                done();
            }).catch(done);

        });

    });

});