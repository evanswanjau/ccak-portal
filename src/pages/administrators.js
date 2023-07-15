import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";
import { DataTable } from "../components/dataTable";
import { getTitles } from "../helpers/titles";
// import { Pagination } from "../components/forms/pagination";
import SideNav from "../components/sideNav";
import { FilterForm } from "../components/forms/filter";
import { searchPosts } from "../api/api-calls";
import { parseData } from "../helpers/parses";
import { Loader } from "../components/loader";
import { Empty } from "../components/empty";
import { AddButton } from "../components/addButton";
import { getForm } from "../helpers/forms";
// import { AuthAdministrator } from "../helpers/auth";

const demoData = [
    {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        status: "Active",
        created_by: 1,
    },
    {
        first_name: "Jane",
        last_name: "Smith",
        email: "janesmith@example.com",
        status: "Active",
        created_by: 1,
    },
    {
        first_name: "Michael",
        last_name: "Johnson",
        email: "michaeljohnson@example.com",
        status: "Inactive",
        created_by: 1,
    },
];

export const AdministratorsPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, updateData] = useState([]);
    const [revealForm, setRevealForm] = useState(false);
    const [id, setID] = useState(null);
    const [search, updateSearch] = useState({
        keyword: "",
        table: "posts",
        category: "",
        technology: "",
        project_status: "",
        access: "",
        status: "",
        page: 1,
        limit: 100,
        ip_address: "",
    });

    // const { enqueueSnackbar } = useSnackbar();

    const getData = () => {
        updateData(parseData("administrators", demoData));
        setLoading(false);
        // AuthAdministrator(jwt_decode);
        // searchPosts(search, updateData, parseData, enqueueSnackbar).finally(
        //     () => {
        //         setLoading(false);
        //     }
        // );
    };

    useEffect(() => {
        getData();
    }, []); // eslint-disable-line

    let content = <Loader />;

    if (revealForm)
        content = getForm("administrators", setRevealForm, id, getData);

    if (!revealForm && loading) content = <Loader />;

    if (!revealForm && !loading && data.length < 1) content = <Empty />;

    if (!revealForm && !loading && data.length > 0)
        content = (
            <div>
                <DataTable
                    titles={getTitles("administrators")}
                    url="post"
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
            <div className="w-10/12 p-10 pb-24 mt-8 h-[calc(100vh-3em)] overflow-scroll">
                <h1 className="text-2xl font-semibold text-gray-600 mb-5">
                    Administrators
                </h1>
                {!loading && !revealForm && (
                    <FilterForm
                        page="administrators"
                        search={search}
                        updateSearch={updateSearch}
                    />
                )}
                {content}
                {!loading && !revealForm && (
                    <AddButton setRevealForm={setRevealForm} />
                )}
            </div>
        </div>
    );
};
