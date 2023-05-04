const DigitalIdentityVerification = artifacts.require("DigitalIdentityVerification");

module.exports = function (deployer) {
  deployer.deploy(DigitalIdentityVerification);
};
