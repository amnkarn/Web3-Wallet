import { useState } from "react";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import { mnemonicToSeed } from "bip39";

interface SolanaWalletProps {
    mnemonic: string;
}

export function EthWallet({ mnemonic }: SolanaWalletProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState<string[]>([]); //store the wallet addresses

    async function addWallet() {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);

        setCurrentIndex(currentIndex + 1);
        setAddresses([...addresses, wallet.address]);
    }

    return (
        <div style={{ padding: "20px" }} className="flex items-center justify-center flex-col gap-5">
            <button onClick={addWallet} className="px-5 py-1.5 bg-green-400 rounded-md">
                Add ETH Wallet
            </button>

            {addresses.length > 0 &&
                <div style={{ marginTop: "10px" }} className="px-20 py-10 border-5 border-gray-200 rounded-md bg-gray-400" >
                    {addresses.map((p, index) => (
                        <div key={index} className="py-2 text-gray-100">
                            ETH - {p}
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}