const LawIndexing = artifacts.require("LawIndexing");

module.exports = function (deployer) {
  deployer.deploy(LawIndexing);
};
