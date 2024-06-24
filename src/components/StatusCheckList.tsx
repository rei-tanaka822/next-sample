import React from "react";
import { BaseCheckBoxList } from "./BaseCheckBoxList";
import { useFetchOption } from "@/hooks/useFetchOption";

/**
 * Propsの型
 *
 * @property {string} itemName 項目名
 * @property {{(e: React.ChangeEvent<HTMLInputElement>) => void}} handleFunc ハンドラメソッド
 */
type Props = {
    handleFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * ステータスチェックボックス一覧表示用コンポーネント
 *
 * @param {Props} props セレクトボックスの情報
 * @returns {JSX.Element}
 */
export const StatusCheckList = (props: Props) => {
    const { handleFunc } = props;
    // ステータス一覧
    const statusMst = useFetchOption("api/selectStatusMst");

    return <BaseCheckBoxList className="status" itemName="ステータス" optionList={statusMst} handleFunc={handleFunc} />;
};
