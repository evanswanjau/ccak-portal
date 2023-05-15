import { HiPencil, HiTrash } from "react-icons/hi2";
import { useSnackbar } from "notistack";
import { apiRequest } from "../api/api-calls";

export const DataTable = ({
    titles,
    url,
    data,
    updateData,
    setRevealForm,
    setID,
}) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const deleteRequest = (id) => {
        apiRequest(
            "delete",
            url + "/" + id,
            {},
            updateData,
            enqueueSnackbar,
            "Item deleted successfully"
        ).then(() => {
            closeSnackbar();
        });
    };

    const deleteItem = (id, index) => {
        let newArray = [...data];
        let oldArray = [...data];

        newArray.splice(index, 1);

        updateData(newArray);

        enqueueSnackbar("Item deleted successfully", {
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            },
            autoHideDuration: 5000,
            action: (
                <div>
                    <button
                        className="py-1.5 px-4 mx-1 bg-red-600 rounded hover:bg-stone-900 transition-all ease-in-out"
                        onClick={() => {
                            updateData(oldArray);
                            closeSnackbar();
                        }}
                    >
                        Undo
                    </button>
                    <button
                        className="pt-2 pb-2 mx-1 text-sky-400 font-semibold rounded px-5 hover:bg-stone-900 transition-all ease-in-out"
                        onClick={() => {
                            deleteRequest(id);
                        }}
                    >
                        Dismiss
                    </button>
                </div>
            ),
            onClose: () => {
                deleteRequest(id);
            },
        });
    };

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
                                <td className="px-6 py-3 border-r">{i + 1}</td>
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
                                <td className="flex justify-center">
                                    <HiPencil
                                        className="text-xl my-2 mx-3 cursor-pointer"
                                        title="Edit"
                                        onClick={() => {
                                            setID(item.id);
                                            setRevealForm(true);
                                        }}
                                    />
                                    <HiTrash
                                        className="text-xl my-2 mx-3 text-red-600 cursor-pointer"
                                        title="Delete"
                                        onClick={() => {
                                            deleteItem(item.id, i);
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
