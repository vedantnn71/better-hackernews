import satori from "satori";
import dayjs from "dayjs";
import type { RequestHandler } from "./$types";
import type { User } from "$lib/types";
import { getUser } from "$lib/api";
import { Resvg } from "@resvg/resvg-js";
import { html as toReactElement } from "satori-html";

const fontFile = await fetch("http://hn.vedantnandwana.me/inter-medium.ttf");
const fontData: ArrayBuffer = await fontFile.arrayBuffer();

const height = 630;
const width = 1200;

export const GET: RequestHandler = async ({ params }) => {
  const story = (await getUser(params.userId)) || null;
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

function getHtml(user: User | null) {
  if (user === null) {
    return toReactElement(`
      <div tw="flex w-full h-full bg-gray-50 p-20 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="101" height="100" viewBox="0 0 101 100" fill="none">
          <rect x="0.5" width="100" height="100" rx="16.6667" fill="#F97316"/>
          <path d="M27.3731 26.0152H38.8551L49.911 46.8958H50.3845L61.4403 26.0152H72.9223L55.2377 57.3598V74.5H45.0578V57.3598L27.3731 26.0152Z" fill="#F9FAFB"/>
        </svg>
        <h1 tw="ml-6 text-7xl text-gray-900 font-bold mt-8">
          Hacker News
        </h1>
      </div>
    `);
  }

  const { id, created, karma } = user;

  return toReactElement(`
    <div tw="flex flex-col w-full h-full bg-gray-50 p-20">
    <svg xmlns="http://www.w3.org/2000/svg" width="101" height="100" viewBox="0 0 101 100" fill="none">
      <rect x="0.5" width="100" height="100" rx="16.6667" fill="#F97316"/>
      <path d="M27.3731 26.0152H38.8551L49.911 46.8958H50.3845L61.4403 26.0152H72.9223L55.2377 57.3598V74.5H45.0578V57.3598L27.3731 26.0152Z" fill="#F9FAFB"/>
    </svg>

      <h1 tw="text-5xl text-gray-900 mt-8">
        @${id}
      </h1>

      <div tw="flex text-3xl mt-4 font-normal text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#4b5563"
          tw="text-gray-600 h-8 w-8 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
        <span>Karma ${karma}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#4b5563"
          tw="text-gray-600 h-8 w-8 ml-6 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
        <span>Joined on ${dayjs(created * 1000).format("MMM DD, YYYY")}</span>
      </div>
    </div>
  `);
}
