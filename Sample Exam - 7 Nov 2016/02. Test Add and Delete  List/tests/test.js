let listMaker = require('../listMaker').list;
let expect = require('chai').expect;

describe("Add and Delete from List mocha tests", () => {
    let list;
    beforeEach(function() {
        list = listMaker;
    });

    it("should be an object", () => {
        expect(typeof list).to.equal('object');
    });

    it("should have all properties", () => {
        expect(list.hasOwnProperty('add')).to.equal(true);
        expect(list.hasOwnProperty('delete')).to.equal(true);
        expect(list.hasOwnProperty('toString')).to.equal(true);
    });

    it("should start empty", () => {
        expect(list.toString()).to.equal('');
    });

    it("delete shouldnt work on empty list", () => {
        expect(list.delete(0)).to.equal(undefined);
    });

    it("should add a single item", () => {
       list.add("ivan");
        expect(list.toString()).to.equal('ivan');
    });

    it("should add multiple items to the end of the list", () => {
        list.add(1);
        list.add(2);
        expect(list.toString()).to.equal('ivan, 1, 2');
    });

    it('should not remove with index bellow 0', () => {
        expect(list.delete(-1)).to.equal(undefined);
        expect(list.toString()).to.equal('ivan, 1, 2');
    });

    it('should not remove with index over the length', () => {
        expect(list.delete(list.length)).to.equal(undefined);
        expect(list.toString()).to.equal('ivan, 1, 2');
    });

    it('should remove with correct index', () => {
        expect(list.delete(1)).to.equal(1);
        expect(list.toString()).to.equal('ivan, 2');
    });

    it('should work with string and numbers', () => {
       list.add(1);
       list.add('pesho');
       list.add(12.5);
        expect(list.toString()).to.equal('ivan, 2, 1, pesho, 12.5');
    });

    it("delete should work only with numbers", () => {
        expect(list.delete('pesho')).to.throw(Error);
        expect(list.delete({})).to.throw(Error);
        expect(list.delete([])).to.throw(Error);
    });

});