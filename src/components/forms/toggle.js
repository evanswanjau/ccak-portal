const getValue = (item, checked) => {
    let value = "";

    if (item === "status") value = checked ? "active" : "inactive";

    if (item === "registration_status")
        value = checked ? "registered" : "unregistered";

    if (item === "subscription_status") value = checked ? "active" : "inactive";

    return value;
};

export const Toggle = ({ item, data, updateData }) => {
    return (
        <div className="w-full mb-5">
            <p
                className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                htmlFor={item}
            >
                {item.replace(/_/g, " ")}
            </p>
            <label className="relative inline-flex items-center  cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={data[item] === "active" || data[item] === "registered"}
                    onChange={(event) => {
                        updateData({
                            ...data,
                            [item]: getValue(item, event.currentTarget.checked),
                        });
                    }}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
        </div>
    );
};
