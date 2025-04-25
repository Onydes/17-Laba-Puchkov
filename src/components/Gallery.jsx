import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../api/photosApi";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(() => +localStorage.getItem("page") || 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("page", page);
    setLoading(true);
    fetchPhotos(page, 4)
      .then((data) => setPhotos(data))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Галерея</h2>
      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          {photos.map((photo) => (
            <div key={photo.id} style={{ width: 200 }}>
              <img src={photo.download_url} alt={photo.author} style={{ width: "100%", borderRadius: 8 }} />
              <p>{photo.author}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ marginRight: 10 }}>
          Попередні
        </button>
        <button onClick={() => setPage((p) => p + 1)}>Наступні</button>
      </div>
    </div>
  );
};

export default Gallery;
