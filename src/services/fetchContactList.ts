import { ContactDetail } from "@/types/contact";

/**
 * 問合せ一覧取得
 *
 * @param {string} url APIのURL
 * @param {URLSearchParams} params パラメータ
 * @returns {Promise<ContactDetail[]>} 問合せ一覧
 */
// [メモ]asyncで、Promiseオブジェクトを返す関数にする
export async function fetchContactList(url: string, params: URLSearchParams = new URLSearchParams()): Promise<ContactDetail[]> {
    // 問合せ一覧を取得
    // [メモ]awaitで、Promiseがresolveするのを待つ
    const res = await fetch(`${url}?${params}`);
    let contactDetailList: ContactDetail[] = await res.json();

    // [メモ]awaitにより、必ずデータ取得後に実行される
    return contactDetailList;
}
