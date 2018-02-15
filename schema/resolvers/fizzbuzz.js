module.exports = {
    resolve(num) {
        return {
            id: num,
            name: 
            num % 15 == 0 ? 'Fizzbuzz' : 
            num % 3 == 0 ? 'Fizz' : 
            num % 5 == 0 ? 'Buzz'
                : `${num}`
        }
    }
}