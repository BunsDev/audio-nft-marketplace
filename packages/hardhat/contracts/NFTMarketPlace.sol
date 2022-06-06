// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarketPlace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    uint256 public listingPrice;
    uint256 public listingBalance;

    constructor(uint256 _listingPrice) {
        listingPrice = _listingPrice;
    }

    struct MarketItem {
        uint256 id;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed id,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    function withdrawListingBalance() external onlyOwner {
        owner().call{value: listingBalance}("");
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "msg.value must be equal to listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function buyMarketItem(address nftContract, uint256 itemId)
        external
        payable
        nonReentrant
    {
        require(itemId <= _itemIds.current(), "itemId is not valid");

        MarketItem storage marketItem = idToMarketItem[itemId];

        require(marketItem.owner == address(0), "item is already sold out");

        require(
            msg.value == marketItem.price,
            "Please submit the asking price in order to complete the purchase"
        );

        marketItem.seller.call{value: msg.value}("");
        IERC721(nftContract).transferFrom(
            address(this),
            msg.sender,
            marketItem.tokenId
        );

        marketItem.owner = payable(msg.sender);
        marketItem.sold = true;
        listingBalance += listingPrice;
        _itemsSold.increment();
    }

    function getMarketItems() external view returns (MarketItem[] memory) {
        uint256 itemsCount = _itemIds.current();
        uint256 unsoldItemsCount = itemsCount - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemsCount);
        for (uint256 i = 0; i < itemsCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint256 currentItemId = idToMarketItem[i + 1].id;
                MarketItem memory currentItem = idToMarketItem[currentItemId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }
}
