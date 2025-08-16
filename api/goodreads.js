export default async function handler(req, res) {
  const url = "https://www.goodreads.com/review/list_rss/77630212?key=VrQUrTqou_mPhJkiV49YdjR-2qqGNxKaYthYOkUxptIpklb3&shelf=currently-reading";
  const response = await fetch(url);
  const xml = await response.text();

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(xml);
}