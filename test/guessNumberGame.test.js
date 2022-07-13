const { expect } = require("chai");

describe("GuessNumberGame", function() {


  let owner;
  let addr1;
  let addr2;
  let addrs;
  let GuessNumberGame;
  

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    GuessNumberGame = await ethers.getContractFactory('GuessNumberGame');
  });

  it("case1", async function() {

    const nonce = ethers.utils.formatBytes32String("HELLO");
    console.log(nonce)
    guessNumberGame = await GuessNumberGame.deploy(nonce,999,{value:ethers.utils.parseEther("1")});
    await guessNumberGame.deployed();

    expect(await guessNumberGame.depositValue()).to.equal(ethers.utils.parseEther("1"));
    console.log(' GuessNumberGame depositValue:',(await guessNumberGame.depositValue()).toString())
    console.log(' GuessNumberGame nonceHash:',await guessNumberGame.nonceHash())
    console.log(' GuessNumberGame nonceNumHash:',await guessNumberGame.nonceNumHash())

    //switch account
    let player1 = ethers.provider.getSigner(1);

    await guessNumberGame.connect(player1).guess(800,{ value: ethers.utils.parseEther("1") });
    console.log(' GuessNumberGame totalBet:',(await guessNumberGame.totalBet()).toString())
    console.log('player1 Account balance:', (await player1.getBalance()).toString());

    //switch account
    let player2 = ethers.provider.getSigner(2);

    await guessNumberGame.connect(player2).guess(900,{ value: ethers.utils.parseEther("1") });
    console.log(' GuessNumberGame totalBet:',(await guessNumberGame.totalBet()).toString())
    console.log('player2 Account balance:', (await player2.getBalance()).toString());

    //reward
    await guessNumberGame.reveal(nonce,999,{ value: ethers.utils.parseEther("1") });

    console.log('player2 Account balance:', (await player2.getBalance()).toString());

  });


  it("case2", async function() {

    const nonce = ethers.utils.formatBytes32String("HELLO");
    console.log(nonce)
    guessNumberGame = await GuessNumberGame.deploy(nonce,999,{value:ethers.utils.parseEther("1")});
    await guessNumberGame.deployed();

    expect(await guessNumberGame.depositValue()).to.equal(ethers.utils.parseEther("1"));
    console.log(' GuessNumberGame depositValue:',(await guessNumberGame.depositValue()).toString())
    console.log(' GuessNumberGame nonceHash:',await guessNumberGame.nonceHash())
    console.log(' GuessNumberGame nonceNumHash:',await guessNumberGame.nonceNumHash())

    //switch account
    let player1 = ethers.provider.getSigner(1);

    //await guessNumberGame.connect(player1).guess(800,{ value: ethers.utils.parseEther("2") });

    //await expect(guessNumberGame.connect(player1).guess(800,{ value: ethers.utils.parseEther("2") })).to.be.reverted;

    await expect(guessNumberGame.connect(player1).guess(800,{ value: ethers.utils.parseEther("2") })).to.be.revertedWith(
        "The bet amount must the same with depositValue"
      );

    console.log(' GuessNumberGame totalBet:',(await guessNumberGame.totalBet()).toString())
    console.log('player1 Account balance:', (await player1.getBalance()).toString());


    //switch account
    let player2 = ethers.provider.getSigner(2);

    await guessNumberGame.connect(player2).guess(900,{ value: ethers.utils.parseEther("1") });
    console.log(' GuessNumberGame totalBet:',(await guessNumberGame.totalBet()).toString())
    console.log('player2 Account balance:', (await player2.getBalance()).toString());



  });



  it("case3", async function() {

    const nonce = ethers.utils.formatBytes32String("HELLO");
    console.log(nonce)
    guessNumberGame = await GuessNumberGame.deploy(nonce,500,{value:ethers.utils.parseEther("1")});
    await guessNumberGame.deployed();

    expect(await guessNumberGame.depositValue()).to.equal(ethers.utils.parseEther("1"));
    console.log(' GuessNumberGame depositValue:',(await guessNumberGame.depositValue()).toString())
    console.log(' GuessNumberGame nonceHash:',await guessNumberGame.nonceHash())
    console.log(' GuessNumberGame nonceNumHash:',await guessNumberGame.nonceNumHash())

    //switch account
    let player1 = ethers.provider.getSigner(1);

    await guessNumberGame.connect(player1).guess(450,{ value: ethers.utils.parseEther("1") });
    console.log(' GuessNumberGame totalBet:',(await guessNumberGame.totalBet()).toString())
    console.log('player1 Account balance:', (await player1.getBalance()).toString());


    //switch account
    let player2 = ethers.provider.getSigner(2);

    await guessNumberGame.connect(player2).guess(550,{ value: ethers.utils.parseEther("1") });
    console.log(' GuessNumberGame totalBet:',(await guessNumberGame.totalBet()).toString())
    console.log('player2 Account balance:', (await player2.getBalance()).toString());


    //reward
    await guessNumberGame.reveal(nonce,500,{ value: ethers.utils.parseEther("1") });

    console.log('player1 Account balance:', (await player1.getBalance()).toString());
    console.log('player2 Account balance:', (await player2.getBalance()).toString());


  });




  it("case4", async function() {

    const nonce = ethers.utils.formatBytes32String("HELLO");
    console.log(nonce)
    guessNumberGame = await GuessNumberGame.deploy(nonce,1415,{value:ethers.utils.parseEther("1")});
    await guessNumberGame.deployed();

    expect(await guessNumberGame.depositValue()).to.equal(ethers.utils.parseEther("1"));
    console.log(' GuessNumberGame depositValue:',(await guessNumberGame.depositValue()).toString())
    console.log(' GuessNumberGame nonceHash:',await guessNumberGame.nonceHash())
    console.log(' GuessNumberGame nonceNumHash:',await guessNumberGame.nonceNumHash())

    //switch account
    let player1 = ethers.provider.getSigner(1);

    await guessNumberGame.connect(player1).guess(1,{ value: ethers.utils.parseEther("1") });
    console.log(' GuessNumberGame totalBet:',(await guessNumberGame.totalBet()).toString())
    console.log('player1 Account balance:', (await player1.getBalance()).toString());


    //switch account
    let player2 = ethers.provider.getSigner(2);

    await guessNumberGame.connect(player2).guess(2,{ value: ethers.utils.parseEther("1") });
    console.log(' GuessNumberGame totalBet:',(await guessNumberGame.totalBet()).toString())
    console.log('player2 Account balance:', (await player2.getBalance()).toString());


    //reward
    await guessNumberGame.reveal(nonce,1415,{ value: ethers.utils.parseEther("1") });

    console.log('player1 Account balance:', (await player1.getBalance()).toString());
    console.log('player2 Account balance:', (await player2.getBalance()).toString());


  });








});
