import Header from "../components/blog/Header";
import TestimonialCard from "../components/testimonials/TesitmonialCard";

const Testimonials = () => {

    const testimonials = [
      {
        _id: "655b3f037a397a2c8546c2f5",
        title: "markdown-to-jsx v6 is now available",
        slug: "markdown-to-jsx-v6-is-now-available",
        img: "https://firebasestorage.googleapis.com/v0/b/blogwave-4bb76.appspot.com/o/1700478543134original-ce6c979e9348162086c30c51d36d6890.png?alt=media&token=7d40d0f2-dcf6-48d2-acbe-f88484557681",
        cat: "CODING",
        createdAt: "2023-11-20T11:12:03.368Z",
        views: 50,
        author: 'Yonela Johannes',
        post: "",
        authorImg: 'https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1714608000&v=beta&t=jBQ3AzNBVNokv7cGkBKgyNYzwMK1wzQmrUHSswS2U2c',
        likes: 50,
      },
      {
        _id: "655ad816d148ee58ab8d58a1",
        title: "Fullstack Social Media App - Full Code",
        slug: "fullstack-social-media-app-full-code",
        img: "https://firebasestorage.googleapis.com/v0/b/blogwave-4bb76.appspot.com/o/1700452314589Codewave%20(1).png?alt=media&token=ee4b428f-0df4-47ec-af24-51ca1282f1a5",
        cat: "CODING",
        createdAt: "2023-11-20T03:52:54.673Z",
        views: 29,
        author: 'Yonela Johannes',
        post: "",
        authorImg: 'https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1714608000&v=beta&t=jBQ3AzNBVNokv7cGkBKgyNYzwMK1wzQmrUHSswS2U2c',
        likes: 50,
      },
      {
        _id: "655b21192255c0b35d4ab60b",
        title: "Fullstack Social Media App - Frontend",
        slug: "fullstack-social-media-app-frontend",
        img: "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874453/samples/bike.jpg",
        cat: "FASHION",
        createdAt: "2023-11-20T09:04:26.018Z",
        views: 23,
        author: 'Yonela Johannes',
        post: "",
        authorImg: 'https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1714608000&v=beta&t=jBQ3AzNBVNokv7cGkBKgyNYzwMK1wzQmrUHSswS2U2c',
        likes: 50,
      },
      {
        _id: "655b21192255c0b35d4ab60bdfd",
        title: "Fullstack Social Media App - Frontend",
        slug: "fullstack-social-media-app-frontend",
        img: "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874453/samples/bike.jpg",
        cat: "FASHION",
        createdAt: "2023-11-20T09:04:26.018Z",
        views: 23,
        authorImg: 'https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1714608000&v=beta&t=jBQ3AzNBVNokv7cGkBKgyNYzwMK1wzQmrUHSswS2U2c',
        author: 'Hlomla Tapuko',
        post: "",
        likes: 50,
      },
      {
        _id: "655b3f037a397a2c8546c2f5",
        title: "markdown-to-jsx v6 is now available",
        slug: "markdown-to-jsx-v6-is-now-available",
        img: "https://firebasestorage.googleapis.com/v0/b/blogwave-4bb76.appspot.com/o/1700478543134original-ce6c979e9348162086c30c51d36d6890.png?alt=media&token=7d40d0f2-dcf6-48d2-acbe-f88484557681",
        cat: "CODING",
        createdAt: "2023-11-20T11:12:03.368Z",
        views: 50,
        author: 'Yonela Johannes',
        post: "",
        authorImg: 'https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1714608000&v=beta&t=jBQ3AzNBVNokv7cGkBKgyNYzwMK1wzQmrUHSswS2U2c',
        likes: 50,
      },
      {
        _id: "655ad816d148ee58ab8d58a1",
        title: "Fullstack Social Media App - Full Code",
        slug: "fullstack-social-media-app-full-code",
        img: "https://firebasestorage.googleapis.com/v0/b/blogwave-4bb76.appspot.com/o/1700452314589Codewave%20(1).png?alt=media&token=ee4b428f-0df4-47ec-af24-51ca1282f1a5",
        cat: "CODING",
        createdAt: "2023-11-20T03:52:54.673Z",
        views: 29,
        author: 'Yonela Johannes',
        post: "",
        authorImg: 'https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1714608000&v=beta&t=jBQ3AzNBVNokv7cGkBKgyNYzwMK1wzQmrUHSswS2U2c',
        likes: 50,
        category:"Fashion"
      },
      {
        _id: "655b21192255c0b35d4ab60b",
        title: "Fullstack Social Media App - Frontend",
        slug: "fullstack-social-media-app-frontend",
        img: "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874453/samples/bike.jpg",
        cat: "FASHION",
        createdAt: "2023-11-20T09:04:26.018Z",
        views: 23,
        author: 'Yonela Johannes',
        post: "",
        authorImg: 'https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1714608000&v=beta&t=jBQ3AzNBVNokv7cGkBKgyNYzwMK1wzQmrUHSswS2U2c',
        likes: 50,
        category:"Fashion"
      },
      {
        _id: "655b21192255c0b35d4ab60bdfd",
        title: "Fullstack Social Media App - Frontend",
        slug: "fullstack-social-media-app-frontend",
        img: "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874453/samples/bike.jpg",
        cat: "FASHION",
        createdAt: "2023-11-20T09:04:26.018Z",
        views: 23,
        authorImg: 'https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1714608000&v=beta&t=jBQ3AzNBVNokv7cGkBKgyNYzwMK1wzQmrUHSswS2U2c',
        author: 'Hlomla Tapuko',
        post: "",
        likes: 50,
        category:"Fashion"
      },
    ]
  
  return (
    <div className="flex flex-col gap-8 h-full">
        <Header />
        <div className="grid grid-cols-4 gap-6 h-full">
          {testimonials.map((testimonial) => <TestimonialCard testimonial={testimonial} key={testimonial._id} />)}
        </div>
    </div>
  );
};

export default Testimonials;
