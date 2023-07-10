import { instance } from "./base.api";

const endpoint = "episode";

export const episodes = {
    fetchAll: function ({ page = 1 }: { page?: number }) {
        return instance.get(endpoint, {
            params: { page },
        });
    },

    fetchEpisode: function ({ id }: { id: string | undefined }) {
        return instance.get(`${endpoint}/${id}`);
    }
}