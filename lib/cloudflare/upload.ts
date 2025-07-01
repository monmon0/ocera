export async function uploadToCloudflare(file: File): Promise<string | null> {
  const tokenRes = await fetch("/api/upload-image", { method: "POST" });
  const { uploadURL } = await tokenRes.json();

  const formData = new FormData();
  formData.append("file", file);

  const uploadRes = await fetch(uploadURL, {
    method: "POST",
    body: formData,
  });

  const result = await uploadRes.json();
  console.log("🟡 Cloudflare Upload Response:", result);

  if (!uploadRes.ok || !result.success) {
    console.error("❌ Upload failed:", result.errors);
    return null;
  }

  return result?.result?.variants?.[0] ?? null;
}
