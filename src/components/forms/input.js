const parseDate = (datetime) => {
    const date = new Date(
        new Date(datetime).getTime() -
            new Date(datetime).getTimezoneOffset() * 60000
    );

    if (isNaN(date.getTime())) {
        console.error("Invalid date");
        return new Date().toISOString().slice(0, -8);
    } else {
        return date.toISOString().slice(0, -8);
    }
};

export const Input = ({ item, label = null, type, data, updateData }) => {
    // parse date
    if (type === "datetime-local") data[item] = parseDate(data[item]);

    return (
        <div className="w-full mb-5">
            <label
                className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                htmlFor={item}
            >
                {label ? label : item.replace(/_/g, " ")}
            </label>
            <input
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                id={item}
                type={type}
                placeholder={`Enter ${item.replace(/_/g, " ")}`}
                value={data[item]}
                onChange={(event) => {
                    updateData({ ...data, [item]: event.target.value });
                }}
            />
        </div>
    );
};
