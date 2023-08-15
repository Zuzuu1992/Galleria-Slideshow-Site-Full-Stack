export interface Painting {
  name: string;
  year: string;
  description: string;
  images: {
    thumbnail: string;
    hero: {
      small: string;
      large: string;
      gallery: string;
    };
  };
  artist: {
    image: string;
    name: string;
  };
}

// interface Gallery {
//   name: string;
//   images: {
//     thumbnail: string;
//   };
//   artist: {
//     name: string;
//   };
// }
