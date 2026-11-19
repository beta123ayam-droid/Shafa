// Header Basic Auth untuk API ImageKit: kunci privat sebagai username, password kosong
export function basicAuth() {
  return 'Basic ' + Buffer.from((process.env.IMAGEKIT_PRIVATE_KEY || '') + ':').toString('base64');
}

export function configured() {
  return Boolean(process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY);
}
