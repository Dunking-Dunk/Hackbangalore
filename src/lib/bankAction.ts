"use server"

import { CodatLending } from "@codat/lending";

export const createCompany = async (name:string) => {
    
    const sdk = new CodatLending({
      security: {
          authHeader: 'Basic bmpaVXp1VHZKVGFkV0NxYnd5MDhOMUd3Y3JVd3NudmExeU1sUjJiUg==',
      }})
      const res = await sdk.companies.create({
        description: "Requested early access to the new financing scheme.",
        name
      });

      const data = JSON.stringify(res?.company)

        return data
  }
