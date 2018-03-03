let expect = require('chai').expect;
let createList = require('../listMaker').createList;


describe("List Tests", function() {
    let list = {};
    beforeEach(function() {
        list = createList();
    });

    describe("initial tests", function() {
        it("list should be an object", function() {
            expect(typeof list).to.equal('object');
        });

        it("should contain all functions", function() {
            expect(list.add).to.exist;
            expect(list.shiftLeft).to.exist;
            expect(list.shiftRight).to.exist;
            expect(list.swap).to.exist;
        });

        it("should start empty", function() {
            expect(list.toString()).to.equal('');
        })
    });
    describe("add function tests", function() {
        describe("negative tests", function() {

        });
        describe("positive tests", function() {
            it("should work with a number", function() {
                list.add(1);
                expect(list.toString()).to.equal('1');
            });

            it("should work with a string", function() {
                list.add("pesho");
                expect(list.toString()).to.equal("pesho");
            });
            it("should work with multiple items", function() {
                list.add(1);
                list.add('pesho');
                list.add(5);
                expect(list.toString()).to.equal('1, pesho, 5');
            });
        })
    });
    describe("shift left function tests", function() {
        it("should shift left", function() {
            list.add(1);
            list.add("two");
            list.add(3);
            list.shiftLeft();
            expect(list.toString()).to.equal('two, 3, 1');
        });
    });
    describe("shift right function tests", function() {
        it("should shift right", function() {
            list.add("two");
            list.add(3);
            list.add(1);
            list.add(4);
            list.shiftRight();
            expect(list.toString()).to.equal('4, two, 3, 1');
        });
    });
    describe("swap function tests", function() {
        describe("correct values tests", function() {
            it("should swap positions with correct values", function() {
                list.add(1);
                list.add('ivan');
                list.add(5);
                expect(list.swap(0, 1)).to.equal(true);
                expect(list.toString()).to.equal('ivan, 1, 5');
            });
        });
        describe("incorrect values tests", function() {
            it("should not swap with empty list", function() {
                expect(list.swap(0, 0)).to.equal(false);
                expect(list.toString()).to.equal('');
            });

            it("should not swap positions with incorrect first index", function() {
                list.add(1);
                list.add('ivan');
                list.add(5);
                expect(list.swap(-1, 1)).to.equal(false);
                expect(list.toString()).to.equal('1, ivan, 5');
            });

            it("should not swap positions with incorrect first index", function() {
                list.add(1);
                list.add('ivan');
                list.add(5);
                expect(list.swap('pesho', 0)).to.equal(false);
                expect(list.toString()).to.equal('1, ivan, 5');
            });

            it("should not swap positions with incorrect first index", function() {
                list.add(1);
                list.add('ivan');
                list.add(5);
                expect(list.swap(3, 1)).to.equal(false);
                expect(list.toString()).to.equal('1, ivan, 5');
            });

            it("should not swap positions with incorrect second index", function() {
                list.add(1);
                list.add('ivan');
                list.add(5);
                expect(list.swap(0, -1)).to.equal(false);
                expect(list.toString()).to.equal('1, ivan, 5');
            });

            it("should not swap positions with incorrect second index", function() {
                list.add(1);
                list.add('ivan');
                list.add(5);
                expect(list.swap(0, 'pesho')).to.equal(false);
                expect(list.toString()).to.equal('1, ivan, 5');
            });

            it("should not swap positions with incorrect second index", function() {
                list.add(1);
                list.add('ivan');
                list.add(5);
                expect(list.swap(0, 3)).to.equal(false);
                expect(list.toString()).to.equal('1, ivan, 5');
            });
        });
    });
});