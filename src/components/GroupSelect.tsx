import React from 'react';
import { useState, useEffect } from 'react';
import { BaseSelect } from './BaseSelect';
import { Option, OptionProps } from '@/types/option';

/**
 * グループセレクトボックス表示用コンポーネント
 *
 * @param {Props} props セレクトボックスの情報
 * @returns {JSX.Element}
 */
export const GroupSelect = (props: OptionProps) => {
    const { itemName, handleFunc } = props;
    // 問合せ種別一覧管理用
    const [groupMst, setGroupMst] = useState<Option[]>([]);

    // 問合せ種別一覧をマスタから取得
    const selectGroupMst = async () => {
		const res = await fetch('api/selectGroupMst');
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