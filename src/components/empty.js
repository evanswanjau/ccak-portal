import empty from "../assets/empty.svg";

export const Empty = () => {
    return (
        <div className="flex flex-col text-center h-full items-center justify-center">
            <h3 className="text-gray-600 text-2xl font-semibold">
                No data to display
            </h3>
            <img
                src={empty}
                alt="No data to display"
                className="w-1/6 mx-auto"
            />
        </div>
    );
};
