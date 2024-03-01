import { HiPlus } from "react-icons/hi2";

export const AddButton = ({ setRevealForm, setID }) => {
    return (
        <div className="fixed bottom-10 right-10 flex flex-col place-items-end">
            <button
                className="bg-[#ED7423] rounded-full p-3 shadow-lg"
                onClick={() => {
                    setRevealForm(true);
                    if (setID) setID(null);
                }}
            >
                <HiPlus className="text-3xl text-white" />
            </button>
        </div>
    );
};
