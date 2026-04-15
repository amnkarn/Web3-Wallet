
interface PopupProps {
    mnemonic: string;
    onClose: () => void;
}

export default function Popup({ mnemonic, onClose }: PopupProps) {
    return (
        <div className='fixed inset-0 w-full h-screen flex justify-center items-center bg-black/50 backdrop-blur-sm z-50'>
            <div className='w-[90%] max-w-lg p-10 rounded-xl bg-gray-800 flex flex-col gap-5 shadow-2xl'>
                <h2 className="text-white text-xl font-bold">Your Recovery Phrase</h2>
                <p className="text-gray-400 text-sm">This is your secret phrase, keep it safe.</p>
                
                <textarea rows={4} value={mnemonic} readOnly className='bg-gray-700 text-white p-4 rounded-lg border border-gray-600 resize-none focus:outline-none'/>
                
                <button onClick={onClose} className="bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition" >
                    I've Saved It
                </button>
            </div>
        </div>
    );
}