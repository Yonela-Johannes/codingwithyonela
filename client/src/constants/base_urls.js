let apiUrl;
let siteUrl;

const getToken = () => localStorage.getItem('persist:user') ? JSON.parse(localStorage.getItem('persist:user'))['token'] : '';

if (process.env.NODE_ENV === 'production')
{
  apiUrl = 'https://server-codingwithyonela.vercel.app/api/v1/';
  siteUrl = 'https://codingwithyonela.vercel.app/'
} else
{

  apiUrl = 'http://localhost:5000/api/v1/';
  siteUrl = 'http://localhost:5173';
}

export
{
  apiUrl,
  siteUrl,
}

export const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Autherization': `Bearer ${getToken() ? getToken().replaceAll('"', "") : ""}`
  }
}

export const formHeaders = {
  'Content-Type': 'multipart/form-data',
  'Autherization': `Bearer ${getToken() ? getToken().replaceAll('"', "") : ""}`
} 
