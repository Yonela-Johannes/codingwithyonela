let apiUrl;
let siteUrl;
let callback;

if (process.env.NODE_ENV === 'production') {
  apiUrl = '';
  siteUrl = '';
  callback = ''
} else {
  apiUrl = 'http://localhost:8000/api/auth/google';
  siteUrl = 'http://localhost:5173';
  callback = 'http://localhost:8000/api/auth/callback/google'
}

export {
    apiUrl,
    siteUrl,
    callback
}
