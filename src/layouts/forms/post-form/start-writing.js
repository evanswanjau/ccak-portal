import { PostEditor } from "../../../components/editor";
import { BuilkImageUpload } from "../../../components/forms/bulkImageUpload";
import { Input } from "../../../components/forms/input";

export const StartWriting = ({ data, updateData }) => {
    return (
        <>
            <Input
                item="title"
                type="text"
                data={data}
                updateData={updateData}
            />
            {data.category === "photo-gallery" ||
            data.category === "publications" ||
            data.category === "newsletters" ? (
                <BuilkImageUpload data={data} updateData={updateData} />
            ) : (
                <PostEditor data={data} updateData={updateData} />
            )}
        </>
    );
};
