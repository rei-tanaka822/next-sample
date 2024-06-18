import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sql =
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
      +'   ON l.person_in_charge = um.id';

    const result = await query(sql);
    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}