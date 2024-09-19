export const getInitials = (name) => {
    if (!name) return ""
  
    const words = name.split(" ")
  
    let initials = ""
  
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0]
    }
  
    return initials.toUpperCase()
  }
  
  export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
    return regex.test(email)
  }
  
  export const inputClassName = (theme) =>
    `${theme == 'light' ? 'border-bg_lighter text-grey' : 'bg-bg_grey text-white border-none'} block py-1 px-2 lg:py-4 lg:px-6 w-full text-sm border  rounded`;

  export const labelClassName = (theme) =>
    `${theme == 'light' ? 'text-gray-900' : 'text-bg_lighter'} mb-2 lg:text-lg lgfont-medium `;
  