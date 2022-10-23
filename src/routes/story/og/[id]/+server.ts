import satori from "satori";
import dayjs from "dayjs";
import type { RequestHandler } from "./$types";
import { getStory } from "$lib/api";
import { Resvg } from "@resvg/resvg-js";
import { html as toReactElement } from "satori-html";
import type { Story } from "$lib/types";

const fontFile = await fetch("http://localhost:5173/inter-medium.ttf");
const fontData: ArrayBuffer = await fontFile.arrayBuffer();

const height = 630;
const width = 1200;

export const GET: RequestHandler = async ({ params }) => {
  const story = await getStory(+params.id);
  const html = getHtml(story);

  const svg = await satori(html, {
    fonts: [
      {
        name: "Inter Latin",
        data: fontData,
        style: "normal"
      }
    ],
    height,
    width
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width
    }
  });

  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: {
      "content-type": "image/png"
    }
  });
};

function getHtml(story: Story) {
  const { title, by, time, score, descendants } = story;

  return toReactElement(`
    <div tw="flex flex-col w-full h-full bg-gray-50 p-20">
    <svg xmlns="http://www.w3.org/2000/svg" width="101" height="100" viewBox="0 0 101 100" fill="none">
    <rect x="0.5" width="100" height="100" rx="16.6667" fill="#F97316"/>
    <path d="M27.3731 26.0152H38.8551L49.911 46.8958H50.3845L61.4403 26.0152H72.9223L55.2377 57.3598V74.5H45.0578V57.3598L27.3731 26.0152Z" fill="#F9FAFB"/>
    </svg>

      <h1 tw="text-5xl text-gray-900 mt-8">
        ${title}
      </h1>

      <div tw="flex text-3xl mt-4 font-normal text-gray-600">
        <span>By @${by}</span>
        <span tw="mx-3">•</span>

        <span>On ${dayjs(time * 1000).format("MMM DD, YYYY")}</span>
        <span tw="mx-3">•</span>

        <span>${score} Points</span>
        <span tw="mx-3">•</span>

        <span>${descendants} Comments</span>
      </div>
    </div>
  `);
}
