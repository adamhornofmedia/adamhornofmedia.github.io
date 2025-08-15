export default async function handler(req, res) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  // 1. Get new access token
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: client_id,
      client_secret: client_secret,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    return res.status(500).json({ error: "Could not get access token", details: tokenData });
  }

  // 2. Get currently playing
  const nowPlayingResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  if (nowPlayingResponse.status === 204) {
    return res.json({ playing: false });
  }

  const nowPlayingData = await nowPlayingResponse.json();
  res.setHeader("Access-Control-Allow-Origin", "*"); // povolíme pro tvůj web
  res.json(nowPlayingData);
}