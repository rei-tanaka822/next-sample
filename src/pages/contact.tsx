import React from 'react';
import { GroupSelect } from "@/components/GroupSelect";
import { UserSelect } from "@/components/UserSelect";
import { StatusCheckList } from "@/components/StatusCheckList";
import { Header } from "@/components/Header";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from 'react';

/**
 * 問合せ情報の型
 *
 * @property {string} number 問合せ番号
 * @property {string} subject 件名
 * @property {string} client_name 顧客名
 * @property {string} status ステータス
 * @property {string} person_in_charge 担当者
 */
export type ContactInfo = {
	// [TODO]jsonに合わせた命名になっている
	number: string;
	subject: string;
	client_name: string;
	status: string;
	person_in_charge: string;
}

/**
 * Propsの型
 *
 * @property {ContactInfo[]} initialContactInfoList 問合せ一覧（初期表示）
 */
type ContactProps = {
	initialContactInfoList: ContactInfo[];
}

/**
 * 検索条件の型
 *
 * @property {string} contact 問合せ番号 or 件名
 * @property {string} client 顧客名
 */
type SearchWords = {
	contact: string;
	client: string;
}

/**
 * 絞り込み条件の型
 *
 * @property {string[]} statuses ステータス一覧
 * @property {string} group 問合せ種別
 * @property {string} personInCharge 担当者
 */
type FilterItems = {
	statuses: string[];
	group: string;
	personInCharge: string;
}

/**
 * 一覧ページ表示用コンポーネント
 *
 * @param {ContactProps} props 案件情報
 * @returns {JSX.Element}
 */
const ContactPage: NextPage<ContactProps> = (props: ContactProps) => {
	// 検索ワード状態管理用フック
	const [searchWordContact, setSearchWordContact] = useState('');
	const [searchWordClient, setSearchWordClient] = useState('');

	// 件名or問合せ番号が入力されたら値を更新
	// [TODO]テキストボックスの値が変わった時のみ実行する
	const searchWordContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchWordContact(e.target.value);
	}
	// 顧客名が入力されたら値を更新
	// [TODO]テキストボックスの値が変わった時のみ実行する
	const searchWordClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchWordClient(e.target.value);
	}

	// 検索ボタン押下時の処理
	const handleSearchButtonClick = () => {
		search({ contact: searchWordContact, client: searchWordClient});
	}

	// 検索結果状態管理用フック
	const [contactInfoList, setContactInfoList] = useState<ContactInfo[]>(props.initialContactInfoList);
	// 初期表示時の設定処理
	useEffect(() => {
		setContactInfoList(props.initialContactInfoList);
	}, []);

	// 初期表示後の検索処理
	const search = async (searchWords: SearchWords) => {
		const params = new URLSearchParams(searchWords);
		const res = await fetch(`api/search?${params}`);
		const data = await (res.json());
		// 検索結果を更新
		setContactInfoList(data);
	}

	// フィルター状態管理用フック
	const [checkedStatuses, setCheckedStatuses] = useState<string[]>([]);
	const [selectedGroup, setSelectedGroup] = useState('');
	const [selectedPersonInCharge, setSelectedPersonInCharge] = useState('');

	// ステータスのチェックが変更されたら状態を更新
	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCheckedStatuses(preStatuses =>
			e.target.checked
				// チェックされたらチェックリストに追加
				? [...preStatuses, value]
				// チェックが外れたらチェックリストから削除
				: preStatuses.filter(v => v !== value)
		);
	}

	// グループが変更されたら状態を更新
	const handleSelectedGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedGroup(e.target.value);
	}

	// 担当者が変更されたら状態を更新
	const handleSelectedPersonInChargeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPersonInCharge(e.target.value);
	}

	// 絞り込みボタン押下時の処理
	const handleFilterButtonClick = () => {
		filter({ statuses: checkedStatuses, group: selectedGroup, personInCharge: selectedPersonInCharge});
	}

	// 初期表示後のフィルター処理
	const filter = async (filterItems: FilterItems) => {
		const params = new URLSearchParams();
		// クエリパラメータの手動設定　※ステータス（配列）が配列のため、そのままだと渡せない
		filterItems.statuses.forEach(status => params.append('statuses', status));
		if (filterItems.group) {
			params.append('group', filterItems.group);
		}
		if (filterItems.personInCharge) {
			params.append('personInCharge', filterItems.personInCharge);
		}
		const res = await fetch(`api/filter?${params}`);
		const data = await (res.json());
		setContactInfoList(data);
	}

	return (
		<div>
			<Header />
			<title>問合せ一覧</title>
			<main>
				<div className="contents">
					<div className="sidebar">
						<button>+ 新規問合せ</button>
						<div className="filterBox">
							<StatusCheckList handleFunc={handleCheckboxChange} />
							{/* [TODO]handleFuncがバケツリレーになっている */}
							<GroupSelect itemName="問合せ種別" handleFunc={handleSelectedGroupChange} />
							<UserSelect itemName="担当者" handleFunc={handleSelectedPersonInChargeChange} />
							<button onClick={handleFilterButtonClick}>絞り込み</button>
						</div>
					</div>
					<div>
						<div className="flex justify-between">
							<h1>問合せ一覧</h1>
							<div className="searchBox">
								<input className="searchContact" type="text" placeholder="問合せ番号または件名（部分一致）" value={searchWordContact} onChange={searchWordContactChange}></input>
								<input className="searchClient" type="text" placeholder="顧客名（部分一致）" value={searchWordClient} onChange={searchWordClientChange}></input>
								<button className="searchButton" onClick={handleSearchButtonClick}>検索</button>
							</div>
						</div>
						<div className="searchList">
							<table>
								<thead>
									<tr>
										<th>問合せ番号</th>
										<th className="subject">件名</th>
										<th className="clientName">顧客名</th>
										<th>ステータス</th>
										<th className="personInCharge">担当者</th>
									</tr>
									{contactInfoList.map((contactInfo, index) => {
										return (
										<tr key={index}>
											<td>{contactInfo.number}</td>
											<td>{contactInfo.subject}</td>
											<td>{contactInfo.client_name}</td>
											<td>{contactInfo.status}</td>
											<td>{contactInfo.person_in_charge}</td>
										</tr>
										)
									})}
								</thead>
							</table>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

// [メモ]asyncで、Promiseオブジェクトを返す関数にする
export const getServerSideProps: GetServerSideProps<ContactProps> = async () => {

	let contactInfoList: ContactInfo[] = [];
	try {
		// [メモ]awaitで、Promiseがresolveするのを待つ
		const res = await fetch(`${process.env.BASE_URL}/api/contactList`);
		contactInfoList = await res.json();
	} catch (error) {
		console.error('Failed to fetch data', error);
	}

	// [メモ]awaitにより、必ずデータ取得後に実行される
	return {
		props: {
			initialContactInfoList: contactInfoList
		}
	};
}

export default ContactPage;
