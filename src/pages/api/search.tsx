import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { lead, client } = req.query;

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
       +' LEFT JOIN user_mst um'
       +'   ON l.person_in_charge = um.id'
       +' WHERE 1=1';

       const params: string[] = [];

        // 案件番号 or 案件名指定時
        if (lead && lead !== '') {
            params.push(`%${lead}%`);
            sql += ` AND (lead_number LIKE $${params.length} OR lead_name LIKE $${params.length})`;
        }
        // 顧客名指定時
        if (client && client !== '') {
            params.push(`%${client}%`);
            sql += ` AND client_name LIKE $${params.length}`;
        }

        const result = await query(sql, params);
        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}