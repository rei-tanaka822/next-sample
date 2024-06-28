import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { targetNumber } = req.query;

    try {
        // prettier-ignore
        const sql =
             ' DELETE FROM contact_favorite'
            +' WHERE number = $1'
            +' AND user_id = $2';

        // [メモ]現時点では、$2はユーザー1固定。（ログイン機能未実装のため）
        const result = await query(sql, [targetNumber, "1"]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
