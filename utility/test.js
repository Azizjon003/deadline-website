function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

const test = parseJwt(
  "eyJpdiI6IjNQRmN2MHczbm9aaGo0M2RyeXByM2c9PSIsInZhbHVlIjoidGFZeEdrYy9oMndHaXVsZmxQUk1rQTc2UXFIWTZHOVpFM1Y5Q2NKMXJtOVRXblNRSTYrUTVWd2w0OWo4TGF4NHZzTVkrNHpBeHY3QXdHd0RPK2xxS1M3K1RYNldrWFZINE5VT0FyQmQxT2hHbW9NNXdEbjV1R3JyTnlZQStHK0UiLCJtYWMiOiI1NjAwMjcyOTBjOTA3MTYyOTJlNzQ5ZWFiNjRkODNiYWU4YjUzOTdiYTAwZGRlMzRmYzIxMTAwOTE5NjI2YTllIiwidGFnIjoiIn0%3D"
);
console.log(test);
