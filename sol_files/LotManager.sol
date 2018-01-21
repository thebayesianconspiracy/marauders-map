import Lot.sol;
import 3.sol;
import LotEvent.sol;
import BidState.sol;

/**
* Interface for Project data contracts
*/
contract LotManager is ErrorCodes, Util, LotState, LotType, LotEvent, BidState {

  Lot[] lots;
  uint bidId; // unique identifier for bids

  /*
    note on mapping to array index:
    a non existing mapping will return 0, so 0 should not be a valid value in a map,
    otherwise exists() will not work
  */
  mapping (address => uint) addressToIndexMap;

  /**
  * Constructor
  */
  function LotManager() {
    lots.length = 1; // see above note
    bidId = block.number;
  }

  function exists(address name) returns (bool) {
    return addressToIndexMap[name] != 0;
  }

  function getAllLots(address owner) returns (Lot[]) {
    //TODO How to get all lots of one address?
    Lot[] lots;
    return lots;
  }

  function createLot(
    uint created,
    string location
  ) returns (uint) {
    // name must be < 32 bytes
    // if (bytes(name).length > 32) return ErrorCodes.ERROR;
    // fail if username exists
    // if (exists(name)) return ErrorCodes.EXISTS;
    // add project
    uint index = lots.length;
    address ownerAddress = msg.sender;
    addressToIndexMap[ownerAddress] = index;
    LotState lotState = LotState.Created;
    LotType lotType = LotType.Organic;
    uint lotID = 1;
    //TODO Make lot ID unique
    //TODO Take lot type from farmer type
    lots.push(new Lot(
      lotID,
      created,
      ownerAddress,
      lotType,
      lotState,
      location
    ));
    return lotID;
  }

  function createMultipleLots(
  ) returns (ErrorCodes) {
    //TODO Implement Multiple lots addition
    return ErrorCodes.SUCCESS;
  }
/*
  function createBid(string name, string supplier, uint amount) returns (ErrorCodes, uint) {
    // fail if project name not found
    if (!exists(name)) return (ErrorCodes.NOT_FOUND, 0);
    // create bid
    bidId++; // increment the unique id
    Bid bid = new Bid(bidId, name, supplier, amount);
    return (ErrorCodes.SUCCESS, bidId);
  }

  function settleProject(string name, address supplierAddress, address bidAddress) returns (ErrorCodes) {
    // validity
    if (!exists(name)) return (ErrorCodes.NOT_FOUND);
    // set project state
    address projectAddress = getProject(name);
    var (errorCode, state) = handleEvent(projectAddress, ProjectEvent.RECEIVE);
    if (errorCode != ErrorCodes.SUCCESS) return errorCode;
    // settle
    Bid bid = Bid(bidAddress);
    return bid.settle(supplierAddress);
  }

 
  function handleEvent(address projectAddress, ProjectEvent projectEvent) returns (ErrorCodes, ProjectState) {
    Project project = Project(projectAddress);
    ProjectState state = project.getState();
    // check transition
    var (errorCode, newState) = fsm(state, projectEvent);
    // event is not valid in current state
    if (errorCode != ErrorCodes.SUCCESS) {
      return (errorCode, state);
    }
    // use the new state
    project.setState(newState);
    return (ErrorCodes.SUCCESS, newState);
  }

  function fsm(ProjectState state, ProjectEvent projectEvent) returns (ErrorCodes, ProjectState) {
    // NULL
    if (state == ProjectState.NULL)
      return (ErrorCodes.ERROR, state);
    // OPEN
    if (state == ProjectState.OPEN) {
      if (projectEvent == ProjectEvent.ACCEPT)
        return (ErrorCodes.SUCCESS, ProjectState.PRODUCTION);
    }
    // PRODUCTION
    if (state == ProjectState.PRODUCTION) {
      if (projectEvent == ProjectEvent.DELIVER)
        return (ErrorCodes.SUCCESS, ProjectState.INTRANSIT);
    }
    // INTRANSIT
    if (state == ProjectState.INTRANSIT) {
      if (projectEvent == ProjectEvent.RECEIVE)
        return (ErrorCodes.SUCCESS, ProjectState.RECEIVED);
    }
    return (ErrorCodes.ERROR, state);
  }
  */
}
