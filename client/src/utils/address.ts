export const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const createAvatarFromAddress = (addr: string) => `https://avatars.dicebear.com/api/identicon/${addr}.svg?background=%23FFFFFF`;