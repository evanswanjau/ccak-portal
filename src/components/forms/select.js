export const Select = ({ item, label = null, list, data, updateData }) => {
    return (
        <div>
            <label
                className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                htmlFor={item}
            >
                {label ? label : item.replace(/_/g, " ")}
            </label>
            <select
                className="appearance-none block w-full text-gray-700 bg-white border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                id={item}
                onChange={(event) => {
                    updateData({
                        ...data,
                        [item]: event.target.value,
                    });
                }}
            >
                <option value={""}>Choose {item.replace(/_/g, " ")}</option>
                {list.map((option) => {
                    return (
                        <option
                            key={option.value}
                            value={option.value}
                            selected={data[item] === option.value}
                        >
                            {option.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
