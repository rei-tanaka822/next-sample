import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let sql =
            // prettier-ignore
            ' SELECT'
            +'   id,'
            +'   user_name AS value'
            +' FROM user_mst';

        const result = await query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
