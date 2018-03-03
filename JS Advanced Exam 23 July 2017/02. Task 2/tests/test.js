let expect = require('chai').expect;
let Sumator = require('../createSummator').Sumator;

describe("Task 2 Tests", function () {
    let list = {};
    beforeEach(function () {
        list = new Sumator();
    });
    describe("Initial Tests", function () {
        it("should be an object", function () {
            expect(typeof list).to.equal('object');
        });

        it("should contain all properties", function () {
            expect(Sumator.prototype.hasOwnProperty('add')).to.equal(true);
            expect(Sumator.prototype.hasOwnProperty('sumNums')).to.equal(true);
            expect(Sumator.prototype.hasOwnProperty('removeByFilter')).to.equal(true);
            expect(Sumator.prototype.hasOwnProperty('toString')).to.equal(true);
        });

        it("should start empty", function () {
            expect(list.toString()).to.equal('(empty)');
        })
    });

    describe("Value Tests", function () {
        describe("add function tests", function () {
            it("should add a number", function () {
                list.add(1);
                expect(list.toString()).to.equal('1');
            });

            it("should add a float", function () {
                list.add(3.3);
                expect(list.toString()).to.equal('3.3');
            });

            it("should add negatives", function () {
                list.add(-5);
                expect(list.toString()).to.equal('-5');
            });

            it("should add strings", function () {
                list.add('pesho');
                expect(list.toString()).to.equal('pesho');
            });

            it("should add multiple items", function () {
                list.add('pesho');
                list.add(1);
                list.add(3.3);
                list.add('Ivan');
                expect(list.toString()).to.equal('pesho, 1, 3.3, Ivan');
            });
        });
        describe("sumNums function tests", function () {
            it("should return zero if there are no numbers added", function () {
                list.add('pesho');
                expect(list.sumNums()).to.equal(0);
            });

            it("should sum only the numbers", function () {
                list.add('ivan');
                list.add(1);
                list.add('pesho');
                list.add(4);
                list.add(11);
                expect(list.sumNums()).to.equal(16);
            });

            it("should work with negatives", function () {
                list.add('ivan');
                list.add(-1);
                list.add('pesho');
                list.add(-5);
                list.add(-9);
                expect(list.sumNums()).to.equal(-15);
            });

            it("should work with float point numbers", function () {
                list.add('ivan');
                list.add(1.1);
                list.add('pesho');
                list.add(2.2);
                list.add(3.3);
                expect(list.sumNums()).to.be.closeTo(6.6, 0.01);
            });
        });
        describe("removeByFilter function tests", function () {
            it('should remove only the numbers', function () {
                list.add('ivan');
                list.add(1);
                list.add('pesho');
                list.add(1.1);
                list.add(3.3);
                list.removeByFilter(x => typeof (x) === 'number');
                expect(list.toString()).to.equal('ivan, pesho');
            });

            it('should remove only the strings', function () {
                list.add('ivan');
                list.add(1);
                list.add('pesho');
                list.add(1.1);
                list.add(3.3);
                list.removeByFilter(x => typeof (x) !== 'number');
                expect(list.toString()).to.equal('1, 1.1, 3.3');
            });

            it('should remove only even numbers', function () {
                list.add('ivan');
                list.add(1);
                list.add('pesho');
                list.add(2);
                list.add(3);
                list.add(4);
                list.removeByFilter(x => typeof (x) === 'number' && x % 2 === 0);
                expect(list.toString()).to.equal('ivan, 1, pesho, 3');
            });
        });
    })
});