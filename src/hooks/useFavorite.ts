import { useState } from "react";
import { ContactDetail, Favorite } from "@/types/contact";
import { ERROR_HANDLE_FAVORITE } from "@/message";

/**
 * お気に入り登録/解除用フック
 *
 * @param {Favorite} favorite 現在の問合せ一覧と、お気に入り対象の問合せ番号
 * @returns {(SearchWords) => Promise<ContactDetail[]>} favorite お気に入り処理用関数
 */
export function useFavorite() {
    const [, setState] = useState();

    // お気に入り登録/解除
    const favorite = async (favorite: Favorite): Promise<ContactDetail[]> => {
        const { contactDetailList, targetNumber } = favorite;

        // [メモ]同期処理の中でawaitは使えないため、Promise.allによって全ての非同期処理の完了まで待機
        await Promise.all(
            contactDetailList.map(async (contactDetail) => {
                if (contactDetail.number === targetNumber) {
                    // 星の色の切り替え
                    contactDetail.is_favorite = !contactDetail.is_favorite;
                    // DB登録
                    try {
                        const params = new URLSearchParams({ targetNumber: targetNumber });
                        let res = new Response();
                        if (contactDetail.is_favorite === true) {
                            // お気に入り登録API呼び出し
                            res = await fetch(`api/addFavorite?${params}`);
                        } else {
                            // お気に入り解除API呼び出し
                            res = await fetch(`api/cancelFavorite?${params}`);
                        }
                        if (!res.ok) {
                            setState(() => {
                                throw new Error(ERROR_HANDLE_FAVORITE);
                            });
                        }
                    } catch (error) {
                        setState(() => {
                            throw error;
                        });
                    }
                }
                return contactDetail;
            })
        );
        // 再レンダリングさせるために、新しい配列を作成
        const resultContactDetailList: ContactDetail[] = [...contactDetailList];
        return resultContactDetailList;
    };

    return favorite;
}
