export type TypeEpisode = {
    id: number;
    name: string;
    air_date: Date;
    episode: string;
    characters: Character[];
};

export type Character = {
    name: string;
    url: string;
}