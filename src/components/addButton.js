import { HiPlus } from "react-icons/hi2";

export const AddButton = ({ setRevealForm }) => {
    return (
        <div className="fixed bottom-5 right-5">
            <button
                className="bg-[#ED7423] rounded-full p-3 shadow-lg"
                onClick={() => {
                    setRevealForm(true);
                }}
            >
                <HiPlus className="text-3xl text-white" />
            </button>
        </div>
    );
};
