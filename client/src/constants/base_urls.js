let apiUrl;
let siteUrl;

if (process.env.NODE_ENV === 'production')
{
  apiUrl = 'https://codingwithyonela.onrender.com/api/v1/';
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
    'Autherization': "Bearer "
  }
}

export const formHeaders = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Autherization': "Bearer "
  }
} 
