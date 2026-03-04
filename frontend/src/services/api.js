import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // your FastAPI server
});

export const compareFaces = async (image1, image2) => {
  const formData = new FormData();
  formData.append("image1", image1);
  formData.append("image2", image2);

  const response = await api.post("/compare/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const getLandmarks = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await api.post("/landmarks/", formData);
  return response.data;
};

export const clusterFaces = async (images) => {
  const formData = new FormData();

  images.forEach((img) => {
    formData.append("images", img);
  });

  const response = await api.post("/cluster/", formData);

  console.log("RAW RESPONSE:", response);
  console.log("RESPONSE DATA:", response.data);
  
  return response.data;
};