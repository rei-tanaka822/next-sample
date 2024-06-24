import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { statuses, group, personInCharge } = req.query;
    // 検索処理用に配列へ変換
    const statusArray = Array.isArray(statuses) ? statuses : [statuses];

    try {
        // prettier-ignore
        let sql =
             ' SELECT'
            +'   c.number,'
            +'   subject,'
            +'   client_name,'
            +'   status_name AS status,'
            +'   user_name AS person_in_charge,'
            +' CASE'
            +'   WHEN cf.number IS NULL THEN false'
            +'   ELSE true'
            +' END AS is_favorite'
            +' FROM contact c'
            +' LEFT JOIN status_mst sm'
            +'   ON c.status = sm.id'
            +' LEFT JOIN group_mst gm'
            +'   ON c.group_id = gm.id'
            +' LEFT JOIN user_mst um'
            +'   ON c.person_in_charge = um.id'
            +' LEFT JOIN contact_favorite cf'
            +'   ON c.number = cf.number'
            +' WHERE 1=1';

        const params: any[] = [];

        // 案件ステータス指定時
        if (statusArray && statusArray.length > 0 && !statusArray.some((v) => v === undefined)) {
            const placeholders = statusArray.map((_, index) => `$${index + 1}`).join(", ");
            sql += ` AND status IN (${placeholders})`;
            params.push(...statusArray);
        }
        // 種別指定時
        if (group && group !== "") {
            params.push(group);
            sql += ` AND group_id = $${params.length}`;
        }
        // 案件担当者指定時
        if (personInCharge && personInCharge !== "") {
            params.push(personInCharge);
            sql += ` AND person_in_charge = $${params.length}`;
        }

        // ソート処理
        sql += ' ORDER BY cf.number, c.number';

        // 絞り込み条件をもとに、データ取得
        const result = await query(sql, params);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}