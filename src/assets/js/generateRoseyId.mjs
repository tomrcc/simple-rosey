import slugify from "slugify";

function formatAndSlugifyMarkdownText(markdownText) {
  if (!markdownText) {
    return "";
  }
  const lowerCaseText = markdownText.toLowerCase();
  // Remove links
  const formattedLinks = lowerCaseText.replaceAll(
    /(?:__[*#])|\[(.*?)\]\(.*?\)/gm,
    /$1/
  );
  return slugify(formattedLinks, { remove: /[.*,:\/]/g });
}

export function generateRoseyId(data) {
  let text = "";
  if (!data) {
    return "";
  }
  if (typeof data === "string") {
    text = data;
  }

  return formatAndSlugifyMarkdownText(text);
}
