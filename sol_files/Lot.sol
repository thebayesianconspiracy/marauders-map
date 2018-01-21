import LotState.sol
import LotType.sol

contract Lot is LotType, LotState { 
  LotType public lotType;
  uint public lotID;
  uint public created;
  address public ownerAddress;
  string public location;

  LotState public state;

  function Lot(uint _lotID, uint _created, address _ownerAddress, LotType _lotType, LotState _lotState, string _location) {
    lotID = _lotID;
    created = _created;
    ownerAddress = _ownerAddress;
    lotType = _lotType;
    state = _lotState;
    location = _location;
  }

  function setLocation(string _location) {
    location = _location;
  }

  function getState() returns (LotState) {
    return state;
  }

  function setState(LotState _state) {
    state = _state;
  }
}