import { Input } from "../../../components/forms/input";
import { TextArea } from "../../../components/forms/textarea";
import { ImageUpload } from "../../../components/forms/imageUpload";
import { Select } from "../../../components/forms/select";

export const StartPrepping = ({ data, updateData }) => {
    return (
        <div className="flex my-8">
            <div className="w-full">
                <TextArea item="excerpt" data={data} updateData={updateData} />
                <Input
                    item="published"
                    label="Publish Date"
                    type="datetime-local"
                    data={data}
                    updateData={updateData}
                />
                {data.category === "projects" && (
                    <Select
                        item="project_status"
                        list={[
                            { name: "Completed", value: "completed" },
                            { name: "Ongoing", value: "ongoing" },
                            { name: "Pendng", value: "pending" },
                        ]}
                        data={data}
                        updateData={updateData}
                    />
                )}
                {data.category === "events" && (
                    <>
                        <Input
                            item="event_date"
                            type="datetime-local"
                            data={data}
                            updateData={updateData}
                        />
                        <Input
                            item="venue"
                            type="text"
                            data={data}
                            updateData={updateData}
                        />
                        <Input
                            item="venue_link"
                            type="text"
                            data={data}
                            updateData={updateData}
                        />
                    </>
                )}
                <Select
                    item="access"
                    label="Access"
                    list={[
                        { name: "Public", value: "public" },
                        { name: "Private", value: "private" },
                        { name: "Hidden", value: "hidden" },
                    ]}
                    data={data}
                    updateData={updateData}
                />
            </div>
            <div className="w-full pl-16">
                <ImageUpload data={data} updateData={updateData} />
            </div>
        </div>
    );
};
