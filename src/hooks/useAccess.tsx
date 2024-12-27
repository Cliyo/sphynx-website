import { useState } from "react";

import { app } from "services/axios";

import { AccessTableData } from "dtos/AccessDTO";

export const useAccess = () => {
    const [ accessTableData, setAccessTableData ] = useState<AccessTableData[]>([]);

    const fetchGetAllAccess = async () => {
        const data = await app.get('/access');
        setAccessTableData(data.data);
    }

    return {
        fetchGetAllAccess,
        accessTableData
    }
}

