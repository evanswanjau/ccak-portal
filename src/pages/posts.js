import PageLayout from "../layouts/pageLayout";
import { DataTable } from "../components/dataTable";
import { getTitles } from "../helpers/titles";

const Posts = () => {
    const pageContent = (data, updateData, setRevealForm, setID) => {
        return (
            <div>
                <h1 className="text-2xl font-semibold pb-7 text-gray-600">
                    Posts
                </h1>
                <DataTable
                    titles={getTitles("posts")}
                    url="post"
                    data={data}
                    updateData={updateData}
                    setRevealForm={setRevealForm}
                    setID={setID}
                />
            </div>
        );
    };

    return (
        <PageLayout url="posts" pageContent={pageContent} addButton={true} />
    );
};

export default Posts;
