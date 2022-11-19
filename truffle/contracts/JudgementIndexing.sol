// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;


contract Ownable {
    address private owner;

    // modifier to check if caller is owner
    modifier onlyOwner() {
        require(msg.sender == owner, "unauthorized");
        _;
    }
    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}

contract Judgement {
    string cid;
    string[] sectionNumbers;
    
    constructor(string memory _cid, string[] memory _sectionNumbers) public {
        cid = _cid;
        for (uint i; i < _sectionNumbers.length; i++) {
            sectionNumbers.push( _sectionNumbers[i]);
        }
    }

    function getCID() public view returns (string memory) {
        return cid;
    }

    function getSectionNumbers() public view returns (string[] memory) {
        return sectionNumbers;
    }

}

contract JudgementIndexing is Ownable{
    mapping(string => address) public judgementIndex; 

    function addNewJudgement(string memory redCaseNum, string[] memory _section, string memory _cid) public onlyOwner {
        address _judgementAddress = address(new Judgement(_cid, _section));
        judgementIndex[redCaseNum] = _judgementAddress;
    }

    function getJudgement(string memory _redCaseName) public view returns (address) {
        return judgementIndex[_redCaseName];
    }

    function getCIDByRedCase(string memory _redCaseName) public view returns (string memory) {
        return Judgement(judgementIndex[_redCaseName]).getCID();
    }

    function getSectionNumbersByRedCase(string memory _redCaseName) public view returns (string[] memory) {
        return Judgement(judgementIndex[_redCaseName]).getSectionNumbers();
    }
}
