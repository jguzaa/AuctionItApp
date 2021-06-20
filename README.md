# AuctionItApp

Simple React-native cross platform application development.
- User can set up the auction by take a picture, set up price, set the end date, and write the details of product then post.
- Another user can do the auction by offer the price.
- More information can be read in AuctionIt.pdf

Installation
- require nodejs https://nodejs.org/en/
- require mongodb local https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
- run command 'npm install' to initialize project and install other required mudules
- install react-native via command 'npm install -g react-native-cli' 
- Android environment setup might be required via 'nano ~/.zshrc'
  - https://stackoverflow.com/questions/28296237/set-android-home-environment-variable-in-mac
- start server from the project 'https://github.com/jguzaa/AuctionItServer/'
- set ip to match with the server ip in file 'Auction.js, Login.js, Main.js, and Register.js'
  - change at line "const IP = 'http://192.168.5.80:3000'"
- run with android emulator for demonstration via command 'react-native run-android'

Note
- the project use the cloudinary api for picture uploading, you can config it at line 303 in 'Main.js'

Things have to be implements
- Make the auction finish automatically when the end date is reached
- User registration page simplified
- Local storage implementation in case offine working
- Delete Auction
- Seller-Buyer chat
