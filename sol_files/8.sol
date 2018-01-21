import 7.sol

contract EntityManager is ErrorCodes, Util, EntityType, FarmerType, GovtVerification {
  Entity[] Entities;
  /*
    note on mapping to array index:
    a non existing mapping will return 0, so 0 should not be a valid value in a map,
    otherwise exists() will not work
  */
  mapping (bytes32 => uint) entityToIdMap;

  /**
  * Constructor
  */
  function EntityManager() {
    Entities.length = 1; // see above note
  }

  function exists(string username) returns (bool) {
    return entityToIdMap[b32(username)] != 0;
  }

  function getEntity(string entityName) returns (address) {
    uint entityId = entityToIdMap[b32(entityName)];
    return Entities[entityId];
  }

  function setVerification(string entityName, GovtVerification govtVerification) returns (ErrorCodes) {
    //TODO Allow only for govt
    //TODO Should account address change now to government ?
    uint entityId = entityToIdMap[b32(entityName)];
    if (!exists(entityName)) return ErrorCodes.NOT_FOUND;
    Entities[entityId].setVerification(govtVerification);
    return ErrorCodes.SUCCESS;
  }

  function getVerification(string entityName) returns (GovtVerification) {
    uint entityId = entityToIdMap[b32(entityName)];
    return Entities[entityId].getVerification();
  }

  function createEntity(string entityName, bytes32 pwHash, EntityType entityType, FarmerType farmerType, bytes32 pubKey) returns (ErrorCodes) {
    // name must be < 32 bytes
    if (bytes(entityName).length > 32) return ErrorCodes.ERROR;
    // fail if entityName exists
    if (exists(entityName)) return ErrorCodes.EXISTS;
    // add user
    address account =  msg.sender;
    uint entityId = Entities.length;
    entityToIdMap[b32(entityName)] = entityId;
    GovtVerification verification = GovtVerification.UnVerified;
    Entities.push(new Entity(account, entityName, pwHash, entityId, entityType, farmerType, pubKey, verification));
    return ErrorCodes.SUCCESS;
  }

  function login(string entityName, bytes32 pwHash) returns (bool) {
    // fail if username doesnt exists
    if (!exists(entityName)) return false;
    // get the user
    address a = getEntity(entityName);
    Entity entity = Entity(a);
    return entity.authenticate(pwHash);
  }
}