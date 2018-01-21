import 1.sol
import 2.sol
import 3.sol
import 4.sol
import 5.sol
import 6.sol

contract Entity is ErrorCodes, EntityType, FarmerType, GovtVerification {
  EntityType public entityType;
  FarmerType public farmerType;
  address public account;
  string public entityName;
  bytes32 public pwHash;
  bytes32 public pubKey;  
  uint public id;
  GovtVerification public govtVerification;


  function Entity(address _account, string _entityName, bytes32 _pwHash, uint _id, EntityType _entityType, FarmerType _farmerType, bytes32 _pubKey, GovtVerification _govtVerification) {
    account = _account;
    entityName = _entityName;
    pwHash = _pwHash;
    entityType = _entityType;
    id = _id;
    farmerType = _farmerType;
    pubKey = _pubKey;
    govtVerification = _govtVerification;
  }

  function authenticate(bytes32 _pwHash) returns (bool) {
    return pwHash == _pwHash;
  }

  function setVerification(GovtVerification _govtVerification) {
    govtVerification = _govtVerification;
  }

  function getVerification() returns (GovtVerification) {
    return govtVerification;
  }
}
