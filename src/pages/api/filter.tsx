import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { leadStatuses, group, personInCharge } = req.query;
    // 検索処理用に配列へ変換
    const leadStatusesArray = Array.isArray(leadStatuses) ? leadStatuses : [leadStatuses];

    try {
        let sql =
        ' SELECT'
       +'   lead_number,'
       +'   lead_name,'
       +'   client_name,'
       +'   status_name AS lead_status,'
       +'   user_name AS person_in_charge'
       +' FROM lead l'
       +' LEFT JOIN lead_status_mst lsm'
       +'   ON l.lead_status = lsm.id'
       +' LEFT JOIN group_mst gm'
       +'   ON l.group_id = gm.id'
       +' LEFT JOIN user_mst um'
       +'   ON l.person_in_charge = um.id'
       +' WHERE 1=1';

        // [TODO]anyにするしかない？
        const params: any[] = [];

        // 案件ステータス指定時
        // [TODO]この条件もう少し綺麗にしたい
        if (leadStatusesArray && leadStatusesArray.length > 0 && !leadStatusesArray.some(v => v === undefined)) {
            const placeholders = leadStatusesArray.map((_, index) => `$${index + 1}`).join(', ');
            sql += ` AND lead_status IN (${placeholders})`;
            params.push(...leadStatusesArray);
        }
        // グループ指定時
        if (group && group !== '') {
            params.push(group);
            sql += ` AND group_id = $${params.length}`;
        }
        // 案件担当者指定時
        if (personInCharge && personInCharge !== '') {
            params.push(personInCharge);
            sql += ` AND person_in_charge = $${params.length}`;
        }

        // 絞り込み条件をもとに、データ取得
        const result = await query(sql, params);
        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}