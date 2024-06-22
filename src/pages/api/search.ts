import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { contact, client } = req.query;

    try {
        // prettier-ignore
        let sql =
             ' SELECT'
            +'   number,'
            +'   subject,'
            +'   client_name,'
            +'   status_name AS status,'
            +'   user_name AS person_in_charge'
            +' FROM contact c'
            +' LEFT JOIN status_mst sm'
            +'   ON c.status = sm.id'
            +' LEFT JOIN user_mst um'
            +'   ON c.person_in_charge = um.id'
            +' WHERE 1=1';

        const params: string[] = [];

        // 問合せ番号 or 件名指定時
        if (contact && contact !== "") {
            params.push(`%${contact}%`);
            sql += ` AND (number LIKE $${params.length} OR subject LIKE $${params.length})`;
        }
        // 顧客名指定時
        if (client && client !== "") {
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