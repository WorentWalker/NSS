/** Client-side image compress to JPEG data URL (max edge 1200px). */
export async function compressImageFile(file: File, maxEdge = 1200, quality = 0.82): Promise<{
  contentType: string;
  dataBase64: string;
  previewUrl: string;
  filename: string;
}> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Оберіть файл зображення");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas недоступний");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Не вдалося стиснути зображення"))),
      "image/jpeg",
      quality,
    );
  });

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Помилка читання файлу"));
    reader.readAsDataURL(blob);
  });

  const [, dataBase64 = ""] = dataUrl.split(",", 2);
  const baseName = file.name.replace(/\.[^.]+$/, "") || "product";

  return {
    contentType: "image/jpeg",
    dataBase64,
    previewUrl: dataUrl,
    filename: `${baseName}.jpg`,
  };
}
