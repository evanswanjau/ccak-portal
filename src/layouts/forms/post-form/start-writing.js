import { PostEditor } from "../../../components/editor";
import { Input } from "../../../components/forms/input";

export const StartWriting = ({ data, updateData }) => {
    return (
        <>
            <Input item="title" type="text" data={data} updateData={updateData} />
            <PostEditor data={data} updateData={updateData} />
        </>
    );
};
