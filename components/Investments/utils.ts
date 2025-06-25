export const gradient =
  'bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500';

export const isNew = (createdAt: string) =>
  Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7; // 7 days
