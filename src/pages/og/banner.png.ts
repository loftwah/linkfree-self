import { createCanvas, loadImage } from "canvas";
import type { UserProfile } from "types/user";
import type { APIRoute } from "astro";

const {
  name,
  bio,
  avatar
}: UserProfile = await (
  await fetch(
    `https://linkfree.eddiehub.io/api/users/${
      import.meta.env.LINKFREE_USERNAME
    }`
  )
).json();

const font = 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Android Emoji, EmojiSymbols, OpenMoji, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'

const canvas = createCanvas(1200, 630);

const ctx = canvas.getContext("2d");

ctx.fillStyle = "#0f172a";

ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "#ffffff";

ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.textDrawingMode = "glyph";

ctx.font = `bold 80px ${font}`;

ctx.fillText(name, canvas.width/2, canvas.height/1.4 - 80/2, canvas.width);

ctx.font = `24px ${font}`;

ctx.fillText(bio, canvas.width/2, canvas.height/1.275 - 24/2, canvas.width);

const buffer = Buffer.from(await (await fetch(avatar)).arrayBuffer())

const image = await loadImage(buffer)

ctx.save()
ctx.beginPath()
ctx.arc(canvas.width/2, canvas.height/3, 300/2, 0, Math.PI * 2, true)
ctx.closePath()
ctx.clip()
ctx.drawImage(image, canvas.width/2 - 300/2, canvas.height/3 - 300/2, 300, 300)
ctx.restore()

const banner = canvas.toBuffer("image/png");

export const get: APIRoute = async () => {
  return new Response(banner, {
    headers: {
      "Content-Type": "image/png",
    },
    status: 200,
  });
};
