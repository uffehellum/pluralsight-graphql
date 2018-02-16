const expect = require('chai').expect

describe('pgdb', () =>{
    const pgdb = require('./pgdb-factory')

    describe('getUsersByApiKeys', function () {
        it('should have keys 0000 and 4242', function () {
            return pgdb.getUsersByApiKeys(["0000", "4242"]).then(r => {
                // console.log(r)
                expect(r.length).to.be.equal(2)
            })
        })

        it('should have well known 4242 key', function () {
            return pgdb.getUsersByApiKeys(["4242"]).then(rows => {
                expect(rows.length).to.be.equal(1)
                const r = rows[0]
                //console.log(r)
                expect(r.id).to.be.equal(1)
                expect(r.firstName).to.be.equal('Samer')
                expect(r.lastName).to.be.equal('Buna')
                expect(r.apiKey).to.be.equal('4242')
            })
        })

        it('should have well known 0000 key', function () {
            return pgdb.getUsersByApiKeys(["0000"]).then(rows => {
                expect(rows.length).to.be.equal(1)
                const r = rows[0]
                //console.log(r)
                expect(r.id).to.be.equal(2)
                expect(r.firstName).to.be.equal('Creative')
                expect(r.lastName).to.be.equal('Mind')
                expect(r.apiKey).to.be.equal('0000')
            })
        })
    })

    describe('getUsersByIds', function () {
        it('should have keys 1 and 2', function () {
            return pgdb.getUsersByIds([1, 2]).then(r => {
                // console.log(r)
                expect(r.length).to.be.equal(2)
            })
        })

        it('should have well known 1 id', function () {
            return pgdb.getUsersByIds([1]).then(rows => {
                expect(rows.length).to.be.equal(1)
                const r = rows[0]
                //console.log(r)
                expect(r.id).to.be.equal(1)
                expect(r.firstName).to.be.equal('Samer')
                expect(r.lastName).to.be.equal('Buna')
                expect(r.apiKey).to.be.equal('4242')
            })
        })

        it('should have well known 2 id', function () {
            return pgdb.getUsersByIds([2]).then(rows => {
                expect(rows.length).to.be.equal(1)
                const r = rows[0]
                //console.log(r)
                expect(r.id).to.be.equal(2)
                expect(r.firstName).to.be.equal('Creative')
                expect(r.lastName).to.be.equal('Mind')
                expect(r.apiKey).to.be.equal('0000')
            })
        })
    })   
})

