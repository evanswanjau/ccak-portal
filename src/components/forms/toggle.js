export const Toggle = ({ item, label = null, data, updateData }) => {
    return (
        <div className="w-full mb-5">
            <p
                className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                htmlFor={item}
            >
                {item.replace(/_/g, " ")}
            </p>
            <label class="relative inline-flex items-center  cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    checked={data[item] === "active"}
                    onChange={(event) => {
                        updateData({
                            ...data,
                            [item]: event.currentTarget.checked
                                ? "active"
                                : "inactive",
                        });
                    }}
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {label} is
                    {data[item] === "active" ? ` active` : ` inactive`}
                </span>
            </label>
        </div>
    );
};
