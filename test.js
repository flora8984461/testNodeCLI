const CliTest = require('command-line-test');
const assert = require('assert');

//test by order
describe('test by order', function() {
    it('exec method should be ok with callback', function(done) {
      const cliTest1 = new CliTest();
      cliTest1.exec('ksv get', function(err, res) {
        console.log(res.stdout)
        done();
      });
    });

    //Test add
    it('Should add KEY VALUE', async() => {
      const cliTest1 = new CliTest();
      await cliTest1.exec('ksv add Hello World').then(res => {
          result = res.stdout    //the result is a string
      })
      assert.equal(result.includes("Hello"), true)
      assert.equal(result.includes("World"), true)
    });

    //Test add another pair with the same KEY but different VALUE
    it('Test add another pair with the same KEY but different VALUE', async() => {
      const cliTest1 = new CliTest();
      await cliTest1.exec('ksv add Hello World2').then(res => {
          result = res.stdout    //the result is a string
      })
      assert.equal(result.includes("World2"), true)
    });

    //Test add already exists
    it('Should not add KEY VALUE that already exists', async() => {
      const cliTest1 = new CliTest();
      await cliTest1.exec('ksv add Hello World').then(res => {
          result = res.stdout    //the result is a string
      })
      assert.equal(result.includes("already exists"), true)
    });

    //Test get KEY
    it('test get KEY', async() => {
      const cliTest1 = new CliTest();
      await cliTest1.exec('ksv get Hello').then(res => {
          result = res.stdout    //the result is a string
      })
      assert.equal(result.includes("Hello"), true)
      assert.equal(result.includes("World2"), true)    //get the same Key will give all the pairs with the same key but different values
    });

    //Test remove
    it('Should remove KEY 1', async() => {
      const cliTest1 = new CliTest();
      await cliTest1.exec('ksv remove Hello').then(res => {
          result = res.stdout    //the result is a string
      })
      assert.equal(result.includes("World"), true)
      assert.equal(result.includes("World2"), false)    //my remove is to remove the last added element
    });

    //Test remove, my remove is removing one by one even have the same Key
    it('Should remove KEY 2', async() => {
      const cliTest1 = new CliTest();
      await cliTest1.exec('ksv remove Hello').then(res => {
          result = res.stdout    //the result is a string
      })
      assert.equal(result.includes("Hello"), false)
      assert.equal(result.includes("World"), false)
      assert.equal(result.includes("World2"), false)
    });

    //Test remove not existing
    it('Should not remove KEY that does not exist', async() => {
      const cliTest1 = new CliTest();
      await cliTest1.exec('ksv remove Hello').then(res => {
          result = res.stdout    //the result is a string
      })
      assert.equal(result.includes("does not exist"), true)
    });

  });