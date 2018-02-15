module.exports = {
  development: {
    // "mongodb+srv://tut:palindromehorse@uffetutorial-bckui.mongodb.net/test";
    // mongodb+srv://admin:<PASSWORD>@uffetutorial-bckui.mongodb.net/test
    // url: 'mongodb+srv://admin:de0dms1f@uffetutorial-bckui.mongodb.net/test'
    url: 'mongodb://tut:palindromehorse@uffetutorial-shard-00-00-bckui.mongodb.net:27017,uffetutorial-shard-00-01-bckui.mongodb.net:27017,uffetutorial-shard-00-02-bckui.mongodb.net:27017/test?ssl=true&replicaSet=uffetutorial-shard-0&authSource=admin'
    // url: 'mongodb+srv://tut:palindromehorse@uffetutorial-bckui.mongodb.net/test'
    //'mongodb://localhost:27017/contests'
  }
};
