export const Select = ({ item, label = null, list, data, updateData }) => {
    return (
        <div>
            <label
                className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                for={item}
            >
                {label ? label : item.replace(/_/g, " ")}
            </label>
            <select
                className="appearance-none block w-full text-gray-700 bg-white border-2 border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                id={item}
                onChange={(event) => {
                    console.log(event.target.value);
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
