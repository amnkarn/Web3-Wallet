import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

interface SolanaWalletProps {
    mnemonic: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

    function addWallet(): void {
        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);

        setCurrentIndex(prev => prev + 1);
        setPublicKeys(prevKeys => [...prevKeys, keypair.publicKey]);
    }

    return (
        <div style={{ padding: "20px" }} className="flex items-center justify-center flex-col gap-5">
            <button onClick={addWallet} className="px-5 py-1.5 bg-green-400 rounded-md">
                Add Wallet
            </button>

            {publicKeys.length > 0 &&
                <div style={{ marginTop: "10px" }} className="px-20 py-10 border-5 border-gray-200 rounded-md bg-gray-400" >
                    {publicKeys.map((p, index) => (
                        <div key={index} className="py-2 text-gray-100">
                            {p.toBase58()}
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}