/**
 * ヘッダー用コンポーネント
 *
 * @returns {JSX.Element}
 */
export const Header = () => {
    return (
        <header className="text-gray-600 body-font bg-gray-100">
        <div className="container flex p-5 md:flex-row items-center">
            <a className="flex title-font font-semibold items-center text-gray-900 mb-4 md:mb-0">
                <span className="text-3xl">問合せ管理</span>
            </a>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <a className="mr-5 hover:text-gray-900">請求・支払管理</a>
                <a className="mr-5 hover:text-gray-900">各種マスタ管理</a>
                <a className="mr-5 hover:text-gray-900">顧客管理</a>
                <a className="mr-5 hover:text-gray-900">アカウント管理</a>
            </nav>
        </div>
    </header>
    );
}