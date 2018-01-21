import Lot.sol;
import Util.sol;
import LotEvent.sol;
import Bid.sol;

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


  function getLot(address owner) returns (address) {
    uint index = addressToIndexMap[owner];
    return lots[index];
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
    // addressToIndexMap[ownerAddress] = index;
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
    uint created,
    string location,
    uint numOfLots
  ) returns (uint[]) {
    //TODO Implement Multiple lots addition
    uint[] lotIDs;
    for(uint i = 0; i < numOfLots; i++)
    {
        lotIDs[i] = createLot(created, location);
    } 
    return lotIDs;
  }

  function createBid(address[] lotAddresses, uint amount) returns (ErrorCodes, uint) {
    // fail if project name not found
    address farmerAddress = msg.sender;
    if (!exists(farmerAddress)) return (ErrorCodes.NOT_FOUND, 0);
    // create bid
    bidId++; // increment the unique id
    Bid bid = new Bid(bidId, farmerAddress, lotAddresses, amount, BidState.OPEN);
    for(uint i = 0; i < lotAddresses.length; i++)
    {
        uint id = addressToIndexMap[lotAddresses[i]];
        lots[id].setState(LotState.ForSale);
    } 
    return (ErrorCodes.SUCCESS, bidId);
  }


  function settleBid(address farmerAddress, address bidAddress) returns (ErrorCodes) {
    // validity
    if (!exists(farmerAddress)) return (ErrorCodes.NOT_FOUND);
    // set lot state
    address lotAddress = getLot(farmerAddress);
    var (errorCode, state) = handleEvent(lotAddress, LotEvent.RECEIVE);
    if (errorCode != ErrorCodes.SUCCESS) return errorCode;
    // settle
    Bid bid = Bid(bidAddress);
    return bid.settle(farmerAddress);
  }

 
  function handleEvent(address lotAddress, LotEvent lotEvent) returns (ErrorCodes, LotState) {
    Lot lot = Lot(lotAddress);
    LotState state = lot.getState();
    // check transition
    var (errorCode, newState) = fsm(state, lotEvent);
    // event is not valid in current state
    if (errorCode != ErrorCodes.SUCCESS) {
      return (errorCode, state);
    }
    // use the new state
    lot.setState(newState);
    return (ErrorCodes.SUCCESS, newState);
  }

  function fsm(LotState state, LotEvent lotEvent) returns (ErrorCodes, LotState) {
    // NULL
    if (state == LotState.Created)
      return (ErrorCodes.ERROR, state);
    // OPEN
    if (state == LotState.Created) {
      if (lotEvent == LotEvent.ACCEPT)
        return (ErrorCodes.SUCCESS, LotState.BuyerFound);
    }
    if (state == LotState.BuyerFound) {
      if (lotEvent == LotEvent.DELIVER)
        return (ErrorCodes.SUCCESS, LotState.InTransit);
    }
    // INTRANSIT
    if (state == LotState.InTransit) {
      if (lotEvent == LotEvent.RECEIVE)
        return (ErrorCodes.SUCCESS, LotState.Received);
    }
    return (ErrorCodes.ERROR, state);
  }
  
}
