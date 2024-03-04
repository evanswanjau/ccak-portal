import { HiPencil, HiTrash } from "react-icons/hi2";
import { useSnackbar } from "notistack";
import { apiRequest } from "../api/api-calls";

export const DataTable = ({
    titles,
    page,
    data,
    updateData,
    setRevealForm,
    setID,
}) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const deleteRequest = (id) => {
        apiRequest(
            "delete",
            page.substring(0, page.length - 1) + "/delete/" + id,
            {},
            updateData,
            enqueueSnackbar,
            "Item deleted successfully"
        ).then((snackbar) => {
            closeSnackbar(snackbar);
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
                </div>
            ),
            onClose: () => {
                deleteRequest(id);
            },
        });
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr className="border-b">
                        <th scope="col" className="px-2 py-2 border-r">
                            #
                        </th>
                        {titles.map((title, i) => {
                            return (
                                <th
                                    key={i}
                                    scope="col"
                                    className="px-2 py-2 border-r"
                                >
                                    {title.name}
                                </th>
                            );
                        })}
                        {page !== "invoices" && page !== "donations" && (
                            <th scope="col" className="px-2 py-2 border-r">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr key={item.id} className="bg-white border-b">
                                <td className="px-2 border-r">{i + 1}</td>
                                {titles.map((title, i) => {
                                    return (
                                        <td
                                            key={i}
                                            className="px-2 py-2 border-r"
                                        >
                                            {item[title.value]}
                                        </td>
                                    );
                                })}
                                {page !== "invoices" &&
                                    page !== "donations" && (
                                        <td className="flex justify-center">
                                            {page !== "subscribers" && (
                                                <HiPencil
                                                    className="text-xl my-2 mx-3 cursor-pointer"
                                                    title="Edit"
                                                    onClick={() => {
                                                        setID(item.id);
                                                        setRevealForm(true);
                                                    }}
                                                />
                                            )}

                                            <HiTrash
                                                className="text-xl my-2 mx-3 text-red-600 cursor-pointer"
                                                title="Delete"
                                                onClick={() => {
                                                    deleteItem(item.id, i);
                                                }}
                                            />
                                        </td>
                                    )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
