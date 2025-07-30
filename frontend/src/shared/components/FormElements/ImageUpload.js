import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [pickedFile, setPickedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filepickerRef = useRef();

  useEffect(() => {
    if (!pickedFile) {
      setPreviewUrl(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(pickedFile);
  }, [pickedFile]);

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const file = event.target.files[0];
      setPickedFile(file);
      props.onInput(props.id, file, true);
    }
  };

  const pickImageHandler = () => {
    filepickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filepickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center ? "center" : ""}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Please pick an image.</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
