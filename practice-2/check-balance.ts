import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
console.log("Connection to devnet established 😺");

const publicKey = new PublicKey(process.env.PUBLIC_KEY);
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`Balance of ${publicKey} 👛 is ${balanceInSol} SOL`);
