import { ContactDetail } from "@/types/contact";
import { ERROR_FETCH_CONTACT_LIST } from "@/message";

/**
 * 問合せ一覧取得
 *
 * @param {string} url APIのURL
 * @param {URLSearchParams} params パラメータ
 * @returns {Promise<ContactDetail[]>} 問合せ一覧
 */
// [メモ]asyncで、Promiseオブジェクトを返す関数にする
export async function fetchContactList(url: string, params: URLSearchParams = new URLSearchParams()): Promise<ContactDetail[]> {
    try {
        // 問合せ一覧を取得
        // [メモ]awaitで、Promiseがresolveするのを待つ
        const res = await fetch(`${url}?${params}`);
        if (!res.ok) {
            throw new Error(ERROR_FETCH_CONTACT_LIST);
        }
        let contactDetailList: ContactDetail[] = await res.json();
        // [メモ]awaitにより、必ずデータ取得後に実行される
        return contactDetailList;
    } catch (error) {
        throw error;
    }
}

/**
 * APIから取得した問合せデータのプロパティ名を型に合わせて変更する
 *
 * @param originalResult 変換前のデータを加工する
 * @return {ContactDetail[]} 変換後のデータ
 */
export function convertOriginalData(originalResult: any[]): ContactDetail[] {
    const convertedList = originalResult.map((row: any) => ({
        number: row["number"],
        subject: row["subject"],
        clientName: row["client_name"],
        status: row["status_name"],
        personInCharge: row["user_name"],
        isFavorite: row["is_favorite"],
    }));

    return convertedList;
}
