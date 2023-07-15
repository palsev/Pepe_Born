pragma solidity 0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenDistributor is onlyOwner {
    IERC20 token;
    event TransferredToken(address indexed to, uint256 value);
    address distTokens;

    constructor(address _contract) public {
        distTokens = _contract;
        token = IERC20(_contract);
    }

    function setTokenContract(address _contract) public isOwner {
        distTokens = _contract;
        token = IERC20(_contract);
    }

    function getTokenContract() public view returns (address) {
        return distTokens;
    }

    function sendAmount(
        address[] memory _user,
        uint256 value
    ) public isOwner returns (bool) {
        for (uint i = 0; i < _user.length; i++) token.transfer(_user[i], value);
        return true;
    }
}
