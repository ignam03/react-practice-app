export type TypeCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episodes: string[];
  url: string;
  created: Date;
};

export type Location = {
  name: string;
  url: string;
};
