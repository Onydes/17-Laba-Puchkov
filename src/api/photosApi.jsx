export async function fetchPhotos(page = 1, limit = 4) {
  const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Не вдалося отримати фото");
  }
  return await response.json();
}
