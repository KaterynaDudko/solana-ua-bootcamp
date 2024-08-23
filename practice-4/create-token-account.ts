import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  console.error("❌ SECRET_KEY is not provided. ");
  process.exit(1);
}

const privateKeyAsUint8Array = Uint8Array.from(JSON.parse(secretKey));
const sender = Keypair.fromSecretKey(privateKeyAsUint8Array);

console.log("✅ Keypair loaded successfully");

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`🔑 My public key is: ${sender.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey(
  "CSaUp9MiYUzf421USo6YNkAUoU2wGa2C1fofjFLzsoTW"
);
const recipient = new PublicKey("B5LwhXgzRwzVsxa9rZ3wFGAh1koVj549ssFCwgeeD75d");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`✅ Created token account: ${link}`);
