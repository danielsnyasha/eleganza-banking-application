// components/chat/Avatar.tsx
import Image from "next/image";

export default function Avatar({
  src,
  size = 40,
}: { src?: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {src ? (
        <Image src={src} width={size} height={size} alt="avatar" />
      ) : (
        <div className="bg-gray-300 w-full h-full" />
      )}
    </div>
  );
}
