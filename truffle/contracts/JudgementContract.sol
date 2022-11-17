// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract JudgementContract {
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
