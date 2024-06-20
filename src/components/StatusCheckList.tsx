import React from 'react';
import { useState, useEffect } from 'react';
import { BaseCheckBoxList } from './BaseCheckBoxList';
import { Option } from '@/types/option';

/**
 * Propsの型
 *
 * @property {string} itemName 項目名
 * @property {{(e: React.ChangeEvent<HTMLInputElement>) => void}} handleFunc ハンドラメソッド
 */
type Props = {
    handleFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * ステータスチェックボックス一覧表示用コンポーネント
 *
 * @param {Props} props セレクトボックスの情報
 * @returns {JSX.Element}
 */
export const StatusCheckList = (props: Props) => {
    const { handleFunc } = props;
    //ステータス一覧管理用
    const [statusMst, setStatusMst] = useState<Option[]>([]);

    // ステータス一覧をマスタから取得
    const selectStatusMst = async () => {
		const res = await fetch('api/selectStatusMst');
		const data = await (res.json());
		// 取得結果を更新
		setStatusMst(data);
	}

    useEffect(() => {
        selectStatusMst();
    }, []);

    return (
        <BaseCheckBoxList className="status" itemName="ステータス" optionList={statusMst} handleFunc={handleFunc} />
    );
}