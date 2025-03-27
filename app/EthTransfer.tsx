import Web3 from "web3";

const sendETH = async (sender: string, receiver: string, amount: string = "20") => {
  console.log("sendETH function called with:", { sender, receiver, amount });

  if (!window.ethereum) {
    console.error("MetaMask is not installed!");
    throw new Error("MetaMask is not installed!");
  }

  try {
    console.log("Initializing Web3...");
    const web3 = new Web3(window.ethereum);
    console.log("Web3 initialized successfully");

    const value = web3.utils.toWei(amount, "ether");
    console.log("Converted amount to Wei:", value);

    console.log("Attempting to send transaction...");
    const transaction = await web3.eth.sendTransaction({
      from: sender,
      to: receiver,
      value: value,
      gas: 21000,
    });

    console.log("Transaction successful:", transaction);

    return {
      transactionId: transaction.transactionHash,
      from: transaction.from,
      to: transaction.to,
    };
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
};

export default sendETH;
