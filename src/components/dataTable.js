const titles = [
    { name: "Transaction ID", value: "trans_id" },
    { name: "Method", value: "method" },
    { name: "Type", value: "type" },
    { name: "Amount", value: "amount" },
    { name: "Customer ID", value: "customer_id" },
    { name: "Timestamp", value: "timestamp" },
];

const data = [
    {
        trans_id: "NCWI12343",
        method: "MPESA",
        type: "donation",
        amount: 10000,
        customer_id: "254707837313",
        timestamp: "2023-07-10 08:00AM",
    },
    {
        trans_id: "NCWI12343",
        method: "MPESA",
        type: "donation",
        amount: 10000,
        customer_id: "254707837313",
        timestamp: "2023-07-10 08:00AM",
    },
    {
        trans_id: "NCWI12343",
        method: "MPESA",
        type: "donation",
        amount: 10000,
        customer_id: "254707837313",
        timestamp: "2023-07-10 08:00AM",
    },
    {
        trans_id: "NCWI12343",
        method: "MPESA",
        type: "donation",
        amount: 10000,
        customer_id: "254707837313",
        timestamp: "2023-07-10 08:00AM",
    },
];

export const DataTable = () => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-2">
                            #
                        </th>
                        {titles.map((title) => {
                            return (
                                <>
                                    <th scope="col" className="px-6 py-2">
                                        {title.name}
                                    </th>
                                </>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-6 py-3">{(i += 1)}</td>
                                {titles.map((title, i) => {
                                    return (
                                        <>
                                            <td className="px-6 py-2 capitalize">
                                                {item[title.value]}
                                            </td>
                                        </>
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
