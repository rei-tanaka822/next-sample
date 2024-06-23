import { useState } from "react";
import { ContactDetail, SearchWords, FilterItems } from "@/types/contact";
import { ERROR_FETCH_CONTACT_LIST } from "@/message";

/**
 * 問合せ一覧管理フック
 *
 * @param {ContactDetail[]} initialValue 一覧の初期値
 * @returns {{contactDetailList, search, filter}} 問合せ一覧取得結果, 検索用関数, 絞り込み用関数
 */
export function useContactList(initialValue: ContactDetail[]) {
    const [contactDetailList, setContactDetailList] = useState<ContactDetail[]>(initialValue);
    const [, setState] = useState();

    // 検索
    const search = async (searchWords: SearchWords) => {
        try {
            const params = new URLSearchParams(searchWords);
            const res = await fetch(`api/search?${params}`);
            if (!res.ok) {
                setState(() => {
                    throw new Error(ERROR_FETCH_CONTACT_LIST);
                });
            }
            setContactDetailList(await res.json());
        } catch (error) {
            setState(() => {
                throw error;
            });
        }
    };

    // 絞り込み
    const filter = async (filterItems: FilterItems) => {
        try {
            const params = new URLSearchParams();
            // クエリパラメータの手動設定　※ステータス（配列）が配列のため、そのままだと渡せない
            filterItems.statuses.forEach((status) => params.append("statuses", status));
            if (filterItems.group) {
                params.append("group", filterItems.group);
            }
            if (filterItems.personInCharge) {
                params.append("personInCharge", filterItems.personInCharge);
            }
            const res = await fetch(`api/filter?${params}`);
            if (!res.ok) {
                setState(() => {
                    throw new Error(ERROR_FETCH_CONTACT_LIST);
                });
            }
            setContactDetailList(await res.json());
        } catch (error) {
            setState(() => {
                throw error;
            });
        }
    };

    return { contactDetailList, search, filter };
}
