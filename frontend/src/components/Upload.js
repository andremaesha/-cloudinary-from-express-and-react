import React, { Fragment, useState } from "react";

const Upload = () => {
    const [fileInputState, setFileInputState] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [previewSource, setPreviewSource] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        console.log(reader);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        console.log("Submit");
        e.preventDefault();
        if (!previewSource) return;

        const reader = new FileReader();
        uploadImage(previewSource);
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch("http://localhost:3001/api/upload", {
                method: "POST",
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: {
                    "Content-type": "application/json",
                },
            }).then((res) => {
                console.log(res);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <h1>Upload</h1>

            <form onSubmit={handleSubmitFile}>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="test"
                    style={{ height: "300px" }}
                />
            )}
        </Fragment>
    );
};

export default Upload;
