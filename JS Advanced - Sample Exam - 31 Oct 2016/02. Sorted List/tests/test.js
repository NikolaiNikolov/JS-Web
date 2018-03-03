describe("Sorted List Unit Tests",() => {
    let list;
    beforeEach(() => {
        list = new SortedList();
    });

    it("should be an object", () => {
        expect(typeof list).to.equal('object');
    });

    it("should have all propertis", () => {
        expect(list.add).to.exist;
        expect(list.remove).to.exist;
        expect(list.get).to.exist;
    });

    it("should start empty", () => {
        expect(list.size).to.equal(0);
    });

    it("should add elements", () => {
        list.add(1);
        expect(list.size).to.equal(1);
    });

    it("should maintain sorted while adding values", () => {
        list.add(1);
        list.add(2);
        list.add(567);
        list.add(67);
        list.add(11);
        list.add(-555);
        list.add(-22);
        expect(list.get(0)).to.equal(-555);
    });

    it("should return the correct size", () => {
        list.add(1);
        list.add(2);
        list.add(567);
        list.add(67);
        list.add(11);
        list.add(-555);
        list.add(-22);
        expect(list.size).to.equal(7);
    });

    it("should remove the correct element", () => {
        list.add(1);
        list.add(2);
        list.add(567);
        list.add(67);
        list.add(11);
        list.add(-555);
        list.add(-22);
        list.remove(5);
        expect(list.get(4)).to.equal(11);
    });

    describe("Tests for getIndex", () => {
        it("shouldn't work with invalid index", () => {
            list.add(1);
            list.add(1);
            expect(() => list.get(-1)).to.throw(Error);
        });
        it("shouldn't work with invalid index", () => {
            list.add(1);
            list.add(1);
            expect(() => list.get(list.size + 1)).to.throw(Error);
        });
        it("shouldn't work with an empty list", () => {
            expect(() => list.get(list.size + 1)).to.throw(Error);
        });
        it("should work with correct index", () => {
            list.add(1);
            list.add(3);
            list.add(2);
            expect(list.get(1)).to.equal(2);
        });
        it("should work with correct index", () => {
            list.add(1);
            list.add(2);
            list.add(3);
            list.add(567);
            list.add(67);
            list.add(11);
            expect(list.get(4)).to.equal(67);
        });

    });
});