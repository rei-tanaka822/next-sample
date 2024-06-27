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
    is_favorite: boolean;
};

/**
 * 検索条件の型
 *
 * @property {string} contact 問合せ番号 or 件名
 * @property {string} client 顧客名
 */
export type SearchWords = {
    contact: string;
    client: string;
};

/**
 * 絞り込み条件の型
 *
 * @property {string[]} statuses ステータス一覧
 * @property {string} group 問合せ種別
 * @property {string} personInCharge 担当者
 */
export type FilterItems = {
    statuses: string[];
    group: string;
    personInCharge: string;
};

/**
 * お気に入りの型
 *
 * @property {string} number 問合せ番号
 */
export type Favorite = {
    contactDetailList: ContactDetail[];
    targetNumber: string;
};