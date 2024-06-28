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

        // 元配列から、お気に入り操作対象の問い合せを取得
        const targetContactDetail: ContactDetail | undefined = contactDetailList.filter((contactDetail) => contactDetail.number === targetNumber).shift();
        // 元配列から、お気に入り操作対象の問い合せのインデックスを取得
        const index = contactDetailList.findIndex((contactDetail) => contactDetail.number === targetNumber);

        if (targetContactDetail) {
            // 星の色の切り替え
            targetContactDetail.isFavorite = !targetContactDetail.isFavorite;
            // DB登録
            try {
                const params = new URLSearchParams({ targetNumber: targetNumber });
                let res = new Response();
                if (targetContactDetail.isFavorite === true) {
                    // お気に入り登録API呼び出し
                    res = await fetch(`api/contact/addFavorite?${params}`);
                } else {
                    // お気に入り解除API呼び出し
                    res = await fetch(`api/contact/cancelFavorite?${params}`);
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
        } else {
            throw new Error(ERROR_HANDLE_FAVORITE);
        }

        // 更新した問い合わせを上書き
        contactDetailList[index] = targetContactDetail;

        // 再レンダリングさせるために、新しい配列として返却
        return [...contactDetailList];
    };

    return favorite;
}
