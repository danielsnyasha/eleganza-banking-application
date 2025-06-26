export async function uploadToCloudinary(file: File): Promise<string> {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);
  
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD!}/upload`,
      { method: 'POST', body: form }
    );
    const json = await res.json();
    return json.secure_url as string;
  }
  