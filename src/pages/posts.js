import PageLayout from "../layouts/pageLayout";
import { DataTable } from "../components/dataTable";
import { getTitles } from "../helpers/titles";
import { parsePosts } from "../helpers/parses";

const Posts = () => {
    const pageContent = (data) => {
        return (
            <div>
                <h1 className="text-2xl font-semibold pb-7 text-gray-600">
                    Posts
                </h1>
                <DataTable
                    titles={getTitles("posts")}
                    data={parsePosts(data)}
                />
            </div>
        );
    };

    return (
        <PageLayout url="posts" pageContent={pageContent} addButton={true} />
    );
};

export default Posts;
