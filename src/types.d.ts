export interface Painting {
  _id: string;
  name: string;
  year: string;
  source: string;
  description: string;
  images: {
    thumbnail: string;
    hero: {
      small: string;
      large: string;
    };
    gallery: string;
  };
  artist: {
    image: string;
    name: string;
  };
  [key: number]: any;
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
