// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

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

contract JudgementIndexing {
    mapping(string => address) public judgementIndex;
    address[] authorizedUsers = new address[](0);
    string private _secret = "SECRETS";

    function addAuthorizedUser(address user, string memory secret) public payable {
        require(keccak256(abi.encode(secret)) == keccak256(abi.encode(_secret)),"Invalid secret");
        require(auth(user) == false, "This user is already added");
        authorizedUsers.push(user);
    }

    function viewAuthorizedUsers() public view returns (address[] memory) {
        return authorizedUsers;
    }

    function auth(address user) private view returns (bool){
        for (uint i = 0; i < authorizedUsers.length; i++) {
            if (authorizedUsers[i] == user) {
                return true;
            }
        }
        return false;
    }

    function addNewJudgement(string memory redCaseNum, string[] memory _section, string memory _cid) public {
        require(auth(msg.sender),"Unauthorized");
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
