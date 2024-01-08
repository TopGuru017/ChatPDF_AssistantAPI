
import { ChangeEvent, useState } from "react";
import styles from "./FileUploader.module.scss";

const FileUploader = ({setFilepath}:{setFilepath: (string: string) => void}) => {
  const [imageUrl, setImageUrl] = useState("/images/placeholder-image.jpg");

  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {

    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const fileUrl = await res.json();

      setFilepath(fileUrl.fileUrl)

    } catch (error) {
      console.error("something went wrong, check your console.");
    }

    /** Reset file input */
    // e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <label
      className={styles["file-uploader"]}
    //   style={{ paddingTop: `calc(100% * (${446} / ${720}))` }}
    >
      <input
        type="file"
        onChange={onImageFileChange}
      />
    </label>
  );
}

export default FileUploader;