import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
      const sql =
          ' SELECT' +
          '   number,' +
          '   subject,' +
          '   client_name,' +
          '   status_name AS status,' +
          '   user_name AS person_in_charge' +
          ' FROM contact c' +
          ' LEFT JOIN status_mst sm' +
          '   ON c.status = sm.id' +
          ' LEFT JOIN user_mst um' +
          '   ON c.person_in_charge = um.id';

      const result = await query(sql);
      res.status(200).json(result.rows);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}