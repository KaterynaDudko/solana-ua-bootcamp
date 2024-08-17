import "dotenv/config";
import { Keypair } from "@solana/web3.js";

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  console.error("❌ SECRET_KEY is not provided. ");
  process.exit(1);
}

const privateKeyAsUint8Array = Uint8Array.from(JSON.parse(secretKey));
const keypair = Keypair.fromSecretKey(privateKeyAsUint8Array);

console.log("✅ Keypair loaded successfully");
console.log("🔑 Public Key: ", keypair.publicKey.toBase58());
