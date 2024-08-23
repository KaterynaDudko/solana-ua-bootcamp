import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  console.error("❌ SECRET_KEY is not provided. ");
  process.exit(1);
}

const privateKeyAsUint8Array = Uint8Array.from(JSON.parse(secretKey));
const sender = Keypair.fromSecretKey(privateKeyAsUint8Array);

console.log("✅ Keypair loaded successfully");
console.log(`🔑 My public key is: ${sender.publicKey.toBase58()}`);

const connection = new Connection(clusterApiUrl("devnet"));

const tokenMint = await createMint(
  connection,
  sender,
  sender.publicKey,
  null,
  2
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Token Mint: ${link}`);
