export const Input = ({ item, label = null, type, data, updateData }) => {
    return (
        <div className="w-full my-5">
            <label
                className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                for={item}
            >
                {label ? label : item.replace(/_/g, " ")}
            </label>
            <input
                className="appearance-none block w-full text-gray-700 border-2 border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
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
