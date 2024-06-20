/**
 * 問合せ情報の型
 *
 * @property {string} number 問合せ番号
 * @property {string} subject 件名
 * @property {string} client_name 顧客名
 * @property {string} status ステータス
 * @property {string} person_in_charge 担当者
 */
export type ContactDetail = {
    number: string;
    subject: string;
    client_name: string;
    status: string;
    person_in_charge: string;
};