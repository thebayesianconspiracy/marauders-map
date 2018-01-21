import ErrorCodes.sol
import Version.sol
import Util.sol
import EntityType.sol
import FarmerType.sol
import GovtVerification.sol

contract Entity2 is ErrorCodes,  Util, EntityType, FarmerType, GovtVerification {
  EntityType public entityType;
  FarmerType public farmerType;
  address public account;
  string public entityName;
  string public pwHash;
  uint public id;
  GovtVerification public govtVerification;


  function Entity2 (address _account, string _entityName, string _pwHash, uint _id, EntityType _entityType, FarmerType _farmerType, GovtVerification _govtVerification) {
    account = _account;
    entityName = _entityName;
    pwHash = _pwHash;
    entityType = _entityType;
    id = _id;
    farmerType = _farmerType;
    govtVerification = _govtVerification;
  }

  function authenticate(string _pwHash) returns (bool) {
    return b32(pwHash) == b32(_pwHash);
  }

  function setVerification(GovtVerification _govtVerification) {
    govtVerification = _govtVerification;
  }

  function getVerification() returns (GovtVerification) {
    return govtVerification;
  }
}
