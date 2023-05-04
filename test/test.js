const DigitalIdentityVerification = artifacts.require("DigitalIdentityVerification");

contract("DigitalIdentityVerification", (accounts) => {
  let identityVerification;

  beforeEach(async () => {
    identityVerification = await DigitalIdentityVerification.new();
  });

  it("should allow a user to verify their identity", async () => {
    const firstName = "John";
    const lastName = "Doe";
    const governmentID = 1234567890;

    const firstName1 = "David";
    const lastName1 = "Ded";
    const governmentID1 = 1234533450;

    await identityVerification.verifyIdentity(firstName, lastName, governmentID, { from: accounts[0] });
    const result = await identityVerification.getIdentity({ from: accounts[0] });
    await identityVerification.verifyIdentity(firstName1, lastName1, governmentID1, { from: accounts[1] });
    const result1 = await identityVerification.getIdentity({ from: accounts[1] });

    assert.equal(result[0], firstName, "First name is incorrect");
    assert.equal(result[1], lastName, "Last name is incorrect");
    assert.equal(result[2], governmentID, "Government ID is incorrect");
    assert.equal(result[3], true, "Identity was not verified");

    assert.equal(result1[0], firstName1, "First name is incorrect");
    assert.equal(result1[1], lastName1, "Last name is incorrect");
    assert.equal(result1[2], governmentID1, "Government ID is incorrect");
    assert.equal(result1[3], true, "Identity was not verified");
  });

  it("should not allow a user to verify their identity twice", async () => {
    const firstName = "Jane";
    const lastName = "Doe";
    const governmentID = 1234567890;

    const firstName1 = "David";
    const lastName1 = "Ded";
    const governmentID1 = 1234533450;

    await identityVerification.verifyIdentity(firstName, lastName, governmentID, { from: accounts[0] });
    await identityVerification.verifyIdentity(firstName1, lastName1, governmentID1, { from: accounts[1] });
    try {
      await identityVerification.verifyIdentity(firstName, lastName, governmentID, { from: accounts[0] });
      assert.fail("Expected an error but did not receive one");
      await identityVerification.verifyIdentity(firstName1, lastName1, governmentID1, { from: accounts[1] });
      assert.fail("Expected an error but did not receive one");
    } catch (error) {
      assert.include(error.message, "Identity already verified.", "Incorrect error message");
    }
  });
});