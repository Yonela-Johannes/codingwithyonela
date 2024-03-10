import BusinessInfo from './BusinessInfo';

function BusinessDetail() {
  const business = 
  {
    id:22,
    title: "Freelancer",
    category: {
        name: "Software Development"
    },
    image: "https://avatars.githubusercontent.com/u/69614136?s=400&u=f564717fd69b29a6fb03caa0f22a908f6578f193&v=4",
    email: "johannesyonela@gail.com",
    name: 'Coding W-Yongs',
    address: "24 Jmp street",
    contactPerson: "069 415 6546",
    about: "",
}

  return (
    <div className='py-8 md:py-20
    px-10 md:px-36'>
        <BusinessInfo business={business} />    
    </div>
  )
}

export default BusinessDetail