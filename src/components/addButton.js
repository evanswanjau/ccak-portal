import { HiPlus } from "react-icons/hi2";

export const AddButton = ({ action }) => {
    return (
        <div className="fixed bottom-5 right-5">
            <button
                className="bg-red-800 rounded-full p-3 shadow-lg"
                onClick={() => {
                    action();
                }}
            >
                <HiPlus className="text-3xl text-white" />
            </button>
        </div>
    );
};
