import React, { useContext, useEffect, useState } from "react";

const ImageContext = React.createContext();

export function useImage() {
  return useContext(ImageContext);
}

export function ImageProvider({ children }) {
  const imageUploadAPI =
    "https://api.cloudinary.com/v1_1/volunteer-ccsgp-job-board/image/upload";

  async function uploadImage(files) {
    try {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "volunteer-ccsgp-images");
      const res = await fetch(`${imageUploadAPI}`, {
        method: "POST",
        body: data,
      });
      const file = await res.json();
      const imageNewUrl = file.secure_url;
      return imageNewUrl;
    } catch (err) {
      console.log(err);
    }
  }

  const value = { uploadImage };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
}
