export const TextArea = ({ item, label = null, data, updateData }) => {
    return (
        <div className="w-full my-5">
            <label
                className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                htmlFor={item}
            >
                {label ? label : item}
            </label>
            <textarea
                id={item}
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-700 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-gray-500"
                placeholder={`Write ${item} here...`}
                value={data[item]}
                onChange={(event) => {
                    updateData({ ...data, [item]: event.target.value });
                }}
            ></textarea>
        </div>
    );
};
