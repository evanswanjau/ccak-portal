import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { getListData, searchData } from "../api/api-calls";
import jwt_decode from "jwt-decode";
import * as jsonexport from "jsonexport/dist";
import SideNav from "../components/sideNav";
import { FilterForm } from "../components/forms/filter";
import { AddButton } from "../components/addButton";
import { Loader } from "../components/loader";
import { Empty } from "../components/empty";
import { parseData } from "../helpers/parses";
import { getForm } from "../helpers/forms";
import { DataTable } from "../components/dataTable";
import { getTitles } from "../helpers/titles";
import { AuthAdministrator } from "../helpers/auth";

export const PageLayout = ({ page, searchQuery, addButton }) => {
    const [loading, setLoading] = useState(true);
    const [data, updateData] = useState([]);
    const [revealForm, setRevealForm] = useState(false);
    const [id, setID] = useState(null);
    const [search, updateSearch] = useState(searchQuery);

    const { enqueueSnackbar } = useSnackbar();

    const handleExport = () => {
        // Convert data to CSV format
        jsonexport(data, (err, csv) => {
            if (err) {
                console.error("Error exporting data:", err);
                return;
            }

            // Create a Blob with the CSV data
            const blob = new Blob([csv], { type: "text/csv" });

            // Create a URL for the Blob and trigger download
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "data.csv";
            a.click();

            // Clean up after download
            URL.revokeObjectURL(url);
        });
    };

    const getData = () => {
        if (page === "invoices" || page === "payments" || page === "posts") {
            searchData(
                page,
                search,
                updateData,
                parseData,
                enqueueSnackbar
            ).finally(() => {
                setLoading(false);
            });
        } else {
            getListData(page, parseData, updateData, enqueueSnackbar).finally(
                () => {
                    setLoading(false);
                }
            );
        }
    };

    useEffect(() => {
        AuthAdministrator(jwt_decode);
        getData();
    }, [search]); // eslint-disable-line

    let content = <Loader />;

    if (revealForm) content = getForm(page, setRevealForm, id, getData, setID);

    if (!revealForm && loading) content = <Loader />;

    if (!revealForm && !loading && data.length < 1) content = <Empty />;

    if (!revealForm && !loading && data.length > 0)
        content = (
            <div>
                {page === "subscribers" && (
                    <button
                        type="button"
                        className="bg-teal-900 hover:bg-teal-950 text-white font-medium rounded-lg text-sm pt-3 px-4 pb-[0.8em] mb-4 transition duration-150 ease-in-out"
                        onClick={() => {
                            handleExport();
                        }}
                    >
                        EXPORT DATA
                    </button>
                )}
                <DataTable
                    titles={getTitles(page)}
                    page={page}
                    data={data}
                    updateData={updateData}
                    setRevealForm={setRevealForm}
                    setID={setID}
                />
                {/* <div className="my-5">
                    <Pagination search={search} count={data.length} />
                </div> */}
            </div>
        );

    return (
        <div className="flex">
            <div className="w-2/12">
                <SideNav />
            </div>
            <div className="w-10/12 p-10 pb-24 mt-8 h-[calc(100vh-2em)] overflow-y-auto">
                {!revealForm && (
                    <h1 className="text-2xl capitalize font-semibold text-gray-600 mb-5">
                        {page}
                    </h1>
                )}

                {!loading && !revealForm && (
                    <FilterForm
                        page={page}
                        search={search}
                        updateSearch={updateSearch}
                    />
                )}
                {content}
                {!loading && !revealForm && addButton && (
                    <AddButton setRevealForm={setRevealForm} setID={setID} />
                )}
            </div>
        </div>
    );
};
