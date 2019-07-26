const ScavengerHunt = artifacts.require("ScavengerHunt");
const ECVerify = artifacts.require("ECVerify");

module.exports = function(deployer) {
  deployer.deploy(ECVerify);
  deployer.link(ECVerify, ScavengerHunt);
};
