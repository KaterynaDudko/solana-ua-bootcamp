import "dotenv/config";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction,
  TransactionInstruction,
} from "@solana/web3.js";

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

const recipient = new PublicKey("B5LwhXgzRwzVsxa9rZ3wFGAh1koVj549ssFCwgeeD75d");
console.log(`💸 Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: 0.01 * LAMPORTS_PER_SOL,
});
transaction.add(sendSolInstruction);

// Get this address from https://spl.solana.com/memo
const memoProgram = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

const memoText = "Don't be afraid to break the rules /(>_<)/";

const addMemoInstruction = new TransactionInstruction({
  keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }],
  data: Buffer.from(memoText, "utf-8"),
  programId: memoProgram,
});

transaction.add(addMemoInstruction);

console.log(`📝 memo is: ${memoText}`);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`✅ Transaction confirmed, signature: ${signature}!`);
