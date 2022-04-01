import { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Form, CloseButton, Button } from "react-bootstrap";
import * as R from "ramda";
import axios from "axios";
import Main from "../../templates/Main";
import "./style.scss";

const revokeUrls = (files) => {
  files.forEach((file) => URL.revokeObjectURL(file.preview));
};

const Upload = () => {
  const formRef = useRef();
  const [files, setFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles((prev) =>
        R.uniqBy(
          R.prop("name"),
          R.concat(
            prev,
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          )
        )
      );
    }
  });

  const removeFileHandler = (fileName) => () =>
    setFiles((prev) => R.filter((file) => file.name !== fileName, prev));

  useEffect(() => {
    return () => revokeUrls(files);
  }, [files]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    files.forEach((file) => {
      formData.append("photos", file, file.name);
    });

    axios.post("http://localhost:8080/api/gallery", formData).then(console.log);
  };

  const nameHandler = (e) => setCollectionName(e.target.value);

  const disabledButton = !files.length || isLoading || !collectionName;

  return (
    <Main pageTitle="Choose files for uploading" docTitle="Uploader">
      <Form ref={formRef} className="upload-form" onSubmit={submitHandler}>
        <Form.Label htmlFor="collectionName">Collection Name</Form.Label>
        <Form.Control
          required
          onInput={nameHandler}
          type="text"
          name="galleryName"
          value={collectionName}
        />
        <section className="dragzone-container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className="dropzone__placeholder">
              Drag 'n' drop some files here, or click to select files
            </div>
          </div>
        </section>
        <div
          className={`thumb-container thumb-container${
            files.length ? "--non-empty" : ""
          }`}
        >
          {files.map((file) => (
            <div key={file.name} className="thumb-container__image">
              <CloseButton onClick={removeFileHandler(file.name)} />
              <img src={file.preview} />
            </div>
          ))}
        </div>

        <Button type="submit" variant="primary" disabled={disabledButton}>
          Upload
        </Button>
      </Form>
    </Main>
  );
};

export default Upload;
