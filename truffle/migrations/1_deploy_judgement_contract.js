const JudgementContract = artifacts.require("JudgementContract");

module.exports = function (deployer) {
  deployer.deploy(JudgementContract, "Heloo", ["q","qq"]);
};
