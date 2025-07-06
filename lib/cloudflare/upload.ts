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


// Function to delete image from Cloudflare
export const deleteFromCloudflare = async (imageUrl: string): Promise<boolean> => {
  try {
    // Extract the image ID from the Cloudflare URL
    // Assuming URL format: https://imagedelivery.net/[account-hash]/[image-id]/[variant]
    const urlParts = imageUrl.split('/');
    const imageId = urlParts[urlParts.length - 2]; // Get the image ID part
    
    if (!imageId) {
      console.error('Could not extract image ID from URL:', imageUrl);
      return false;
    }

    const response = await fetch(`/api/cloudflare/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageId }),
    });

    if (!response.ok) {
      console.error('Failed to delete from Cloudflare:', response.statusText);
      return false;
    }

    console.log('Successfully deleted from Cloudflare:', imageId);
    return true;
  } catch (error) {
    console.error('Error deleting from Cloudflare:', error);
    return false;
  }
};
