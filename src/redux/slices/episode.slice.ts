import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface EpisodeState {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    character: Character;
}

export interface Character {
    name: string;
    url: string;
}

export interface EpisodeRemoveStat {
    id: string | number;
}

const initialState: EpisodeState[] = [];

export const episodeSlice = createSlice({
    name: "episode",
    initialState,
    reducers: {
        addEpisode: (state, action: PayloadAction<EpisodeState>) => {
            state.push(action.payload);
        },
        deleteEpisode: (state, action: PayloadAction<EpisodeRemoveStat>) => {
            const { id } = action.payload;
            if (state.some((item) => item.id === id)) {
                return (state = state.filter((item) => item.id !== id));
            }
        },
    },
});

export const { addEpisode, deleteEpisode } = episodeSlice.actions;
