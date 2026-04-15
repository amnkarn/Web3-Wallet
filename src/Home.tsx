import { SolanaWallet } from "./SolanaWallet";
import { generateMnemonic } from 'bip39';
import { useState } from 'react';
import Popup from "./Popup";
import { EthWallet } from "./EthWallet";

export default function Home() {
    const [mnemonic, setMnemonic] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);

    async function createPhrase() {
        const mn = await generateMnemonic();
        setMnemonic(mn);
        setShowPopup(true);
    }

    return (
        <div className="w-full flex flex-col items-center p-10">
            <div className="mb-6">
                <button onClick={createPhrase} className='px-4 py-1.5 bg-gray-300 rounded-lg text-black hover:bg-gray-400'
                >
                    Create Seed Phrase
                </button>
            </div>

            { showPopup && <Popup mnemonic={mnemonic} onClose={() => setShowPopup(false)} /> }

            {/*generate wallet only if phrase available*/}
            <div className="flex gap-10 border min-w-[90%] items-center justify-center">
                { mnemonic && <SolanaWallet mnemonic={mnemonic} /> }

                { mnemonic && <EthWallet mnemonic={mnemonic} /> }
            </div>
        </div>
    );
}