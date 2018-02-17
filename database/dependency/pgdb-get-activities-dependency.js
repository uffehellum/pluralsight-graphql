const expect = require('chai').expect

describe('pgdb', () =>{
    const pgdb = require('./pgdb-factory')

    describe('getActivitiesForUserIds', function () {
        it('should have ids 1 and 2', function () {
            return pgdb.getActivitiesForUserIds([1, 2]).then(r => {
                // console.log(r)
                expect(r.length).to.be.equal(2)
            })
        })

        it('should have well known 1 id', function () {
            return pgdb.getActivitiesForUserIds([1]).then(rows => {
                expect(rows.length).to.be.equal(1)
                const r = rows[0]
                console.log(r)
                expect(r.length > 1)
            })
        })

    })   
})

