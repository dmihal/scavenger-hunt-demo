pragma solidity >=0.4.21 <0.6.0;

import "./ECVerify.sol";

contract ScavengerHunt {
  mapping(address => uint) public stage;
  address[] public clues;

  event NextStage(address indexed user, uint stage);
  event Complete(address indexed user);

  constructor(address[] memory _clues) public {
    clues = _clues;
  }

  function numClues() public view returns (uint) {
    return clues.length;
  }

  function didWin(address user) public view returns (bool) {
    return stage[user] == clues.length + 1;
  }

  function addressHash(address user) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(user));
  }

  function recovered(bytes32 hash, bytes memory signature) public pure returns (address) {
    return ECVerify.ecrecovery(hash, signature);
  }

  function findClue(bytes memory signature) public {
    require(stage[msg.sender] < clues.length, 'User already won');
    require(ECVerify.ecverify(addressHash(msg.sender), signature, clues[stage[msg.sender]]), 'Invalid signature');

    stage[msg.sender] += 1;
    if (stage[msg.sender] < clues.length) {
      emit NextStage(msg.sender, stage[msg.sender]);
    } else {
      emit Complete(msg.sender);
    }
  }
}
