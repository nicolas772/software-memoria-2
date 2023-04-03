exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
exports.testingUserBoard = (req, res) => {
    res.status(200).send("Testing User Content.");
  };
  
exports.testerBoard = (req, res) => {
    res.status(200).send("Tester Content.");
  };