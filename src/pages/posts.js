import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
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

const Posts = () => {
    const [loading, setLoading] = useState(true);
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

    const { enqueueSnackbar } = useSnackbar();

    const getData = () => {
        searchPosts(search, updateData, parseData, enqueueSnackbar).finally(
            () => {
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        getData();
    }, [search]); // eslint-disable-line

    let content = <Loader />;

    if (revealForm) content = getForm("posts", setRevealForm, id, getData);

    if (!revealForm && loading) content = <Loader />;

    if (!revealForm && !loading && data.length < 0) content = <Empty />;

    if (!revealForm && !loading && data.length > 0)
        content = (
            <div>
                <DataTable
                    titles={getTitles("posts")}
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
                    Posts
                </h1>
                {!loading && !revealForm && (
                    <FilterForm
                        page="posts"
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

export default Posts;
