// components/chat/Avatar.tsx
"use client";
export default function Avatar({ src, size = 40 }: { src?: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden" }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} width={size} height={size} alt="avatar" />
      ) : (
        <div className="bg-gray-300 w-full h-full" />
      )}
    </div>
  );
}
