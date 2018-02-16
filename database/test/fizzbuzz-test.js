const expect = require('chai').expect
const fb = require('../fizzbuzz')

describe('fizzbuzz', () => {
    it('should return number as string', () => {
        const r = fb.resolve(2)
        expect(r.name).to.be.equal("2")
        expect(r.id).to.be.equal(2)
    })

    it('should return multiples of 3 as fizz', () => {
        const r = fb.resolve(6)
        expect(r.name).to.be.equal("Fizz")
        expect(r.id).to.be.equal(6)
    })

    it('should return multiples of 5 as buzz', () => {
        const r = fb.resolve(20)
        expect(r.name).to.be.equal("Buzz")
        expect(r.id).to.be.equal(20)
    })

})

