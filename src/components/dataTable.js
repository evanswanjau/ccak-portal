export const DataTable = ({ titles, data }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="border-b">
                        <th scope="col" className="px-6 py-2 border-r">
                            #
                        </th>
                        {titles.map((title, i) => {
                            return (
                                <th
                                    key={i}
                                    scope="col"
                                    className="px-6 py-2 border-r"
                                >
                                    {title.name}
                                </th>
                            );
                        })}
                        <th scope="col" className="px-6 py-2 border-r">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr
                                key={item.id}
                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                            >
                                <td className="px-6 py-3 border-r">
                                    {(i += 1)}
                                </td>
                                {titles.map((title, i) => {
                                    return (
                                        <td
                                            key={i}
                                            className="px-6 py-2 border-r"
                                        >
                                            {item[title.value]}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
