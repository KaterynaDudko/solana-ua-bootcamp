import { Keypair } from "@solana/web3.js";

let i = 0;

const checkIfMatch = (publicKey: string, prefix: string): boolean => {
  //   return publicKey.toLowerCase().startsWith(prefix.toLowerCase());
  return publicKey.startsWith(prefix);
};

const generateKeypair = function (prefix: string): Keypair {
  let keypair: Keypair;
  let publicKey: string;

  do {
    keypair = Keypair.generate();
    publicKey = keypair.publicKey.toBase58();
    // i++;
    // if (i % 1000 === 0) {
    //   console.log(`Tried ${i} attempts`);
    // }
  } while (!checkIfMatch(publicKey, prefix));

  return keypair;
};

const prefix = "Cat";
console.log(`Started Keypair Generator with prefix: ${prefix}`);
console.time("Generated in: ");
const keypair = generateKeypair(prefix);
console.timeEnd("Generated in: ");

console.log("Public Key:", keypair.publicKey.toBase58());
