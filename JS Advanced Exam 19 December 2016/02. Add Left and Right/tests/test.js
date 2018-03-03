let makeList = require('../list');
let expect = require('chai').expect;

describe("List Unit Tests", () => {
    let list = {};
    beforeEach(() => {
        list = makeList();
    });

    it("list should be a function", () => {
       expect(typeof makeList).to.equal('function');
    });

    it("should start empty", () => {
        expect(list.toString()).to.equal('');
    });

    it("should contain all properties", () => {
        expect(list.addLeft).to.exist;
        expect(list.addRight).to.exist;
        expect(list.clear).to.exist;
        expect(list.toString).to.exist;
    });

    it("should add the item to the right", () => {
        list.addRight(1);
        list.addRight(4);
        list.addRight('right');
        expect(list.toString()).to.equal('1, 4, right');
    });

    it("should add the item to the left", () => {
        list.addRight(1);
        list.addRight(4);
        list.addLeft('right');
        expect(list.toString()).to.equal('right, 1, 4');
    });

    it("should clear the list", () => {
        list.addRight(1);
        list.addRight(4);
        list.addLeft('right');
        list.clear();
        expect(list.toString()).to.equal('');
    });

    it("should add multiple to the left", () => {
        list.addLeft(1);
        list.addLeft('hello');
        list.addLeft(4);
        list.addLeft('right');
        expect(list.toString()).to.equal('right, 4, hello, 1');
    });

    it("should add multiple to the right", () => {
        list.addRight(1);
        list.addRight('hello');
        list.addRight(4);
        list.addRight('right');
        expect(list.toString()).to.equal('1, hello, 4, right');
    });
});