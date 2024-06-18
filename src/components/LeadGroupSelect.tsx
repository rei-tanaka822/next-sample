import React from 'react';
import { useState, useEffect } from 'react';
import { BaseSelect } from './BaseSelect';

/**
 * Propsの型
 *
 * @property {string} itemName 項目名
 * @property {{(e: React.ChangeEvent<HTMLSelectElement>) => void}} handleFunc ハンドラメソッド
 */
type Props = {
    itemName: string;
    handleFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * グループの型
 *
 * @property {string} id グループID
 * @property {string} value グループ名
 */
type GroupMst = {
    id: number;
    value: string;
}

/**
 * グループセレクトボックス表示用コンポーネント
 *
 * @param {Props} props セレクトボックスの情報
 * @returns {JSX.Element}
 */
export const LeadGroupSelect = (props: Props) => {
    const { itemName, handleFunc } = props;
    // 問合せ種別一覧管理用
    const [groupMst, setGroupMst] = useState<GroupMst[]>([]);

    // 問合せ種別一覧をマスタから取得
    const selectGroupMst = async () => {
		const res = await fetch('api/selectLeadGroupMst');
		const data = await (res.json());
		// 取得結果を更新
		setGroupMst(data);
	}

    useEffect(() => {
        selectGroupMst();
    }, []);

    return (
        <div>
        <p>{itemName}</p>
            <BaseSelect className="filter" optionList={groupMst} handleFunc={handleFunc} />
        </div>
    );
}