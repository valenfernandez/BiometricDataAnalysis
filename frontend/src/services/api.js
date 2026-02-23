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