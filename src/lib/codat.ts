"use server"

import { CodatLending } from "@codat/lending";

export const sdk = new CodatLending({
        security: {
            authHeader: 'Basic bmpaVXp1VHZKVGFkV0NxYnd5MDhOMUd3Y3JVd3NudmExeU1sUjJiUg==',
        },
    })