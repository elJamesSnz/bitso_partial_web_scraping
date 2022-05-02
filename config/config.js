const dbUrl =
  "mongodb+srv://webscraping:test123@cluster0.fd5eg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  dbUrl: dbUrl,
  connectionParams: connectionParams,
};
