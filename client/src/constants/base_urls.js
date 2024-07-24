let apiUrl;
let siteUrl;
let callback;

if (process.env.NODE_ENV === 'production')
{
  apiUrl = '';
  siteUrl = '';
  callback = ''
} else
{

  apiUrl = 'http://localhost:5000/api/v1/';
  siteUrl = 'http://localhost:5173';
  callback = 'http://localhost:8000/api/auth/callback/google'
}

export
{
  apiUrl,
  siteUrl,
  callback
}

export const headers = {
  headers: {
    'Content-Type': 'application/json',
  }
}

export const formHeaders = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
} 
