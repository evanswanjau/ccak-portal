import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export const PostEditor = ({ data, updateData }) => {
    const editorRef = useRef(null);

    return (
        <>
            <Editor
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={data.content}
                onEditorChange={(content) => {
                    updateData({ ...data, content: content });
                }}
                init={{
                    auto_focus: "tiny_mce",
                    selector: "textarea#open-source-plugins",
                    plugins:
                        "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                    imagetools_cors_hosts: ["picsum.photos"],
                    menubar: "file edit view insert format tools table help",
                    toolbar:
                        "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                    toolbar_sticky: true,
                    autosave_ask_before_unload: true,
                    autosave_interval: "30s",
                    autosave_prefix: "{path}{query}-{id}-",
                    autosave_restore_when_empty: false,
                    autosave_retention: "2m",
                    image_advtab: true,
                    importcss_append: true,
                    file_picker_callback: function (callback, value, meta) {
                        /* Provide file and text for the link dialog */
                        if (meta.filetype === "file") {
                            callback(
                                "https://www.google.com/logos/google.jpg",
                                { text: "My text" }
                            );
                        }

                        /* Provide image and alt text for the image dialog */
                        if (meta.filetype === "image") {
                            callback(
                                "https://www.google.com/logos/google.jpg",
                                { alt: "My alt text" }
                            );
                        }

                        /* Provide alternative source and posted for the media dialog */
                        if (meta.filetype === "media") {
                            callback("movie.mp4", {
                                source2: "alt.ogg",
                                poster: "https://www.google.com/logos/google.jpg",
                            });
                        }
                    },
                    templates: [
                        {
                            title: "New Table",
                            description: "creates a new table",
                            content:
                                '<div className="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                        },
                        {
                            title: "Starting my story",
                            description: "A cure for writers block",
                            content: "Once upon a time...",
                        },
                        {
                            title: "New list with dates",
                            description: "New List with dates",
                            content:
                                '<div className="mceTmpl"><span className="cdate">cdate</span><br /><span className="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                        },
                    ],
                    template_cdate_format:
                        "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
                    template_mdate_format:
                        "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
                    height: 400,
                    image_caption: true,
                    quickbars_selection_toolbar:
                        "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                    noneditable_noneditable_class: "mceNonEditable",
                    toolbar_mode: "sliding",
                    contextmenu: "link image imagetools table",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
        </>
    );
};
