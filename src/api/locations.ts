import { instance } from "./base.api";

const endpoint ="location";

export const locations = {
    fetchAll: function ({ page = 1 }: { page?: number }) {
        return instance.get(endpoint, {
            params: { page },
        });
    },

    fetchLocation: function ({ id }: { id: string | undefined }) {
        return instance.get(`${endpoint}/${id}`);
    },
};