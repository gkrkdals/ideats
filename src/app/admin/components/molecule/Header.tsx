import LoginChecker from "@/app/admin/components/atom/LoginChecker";
import Logout from "@/app/admin/components/atom/Logout";

export default function Header() {
  return (
    <nav className='navbar navbar-expand bg-body-tertiary'>
      <LoginChecker />
      <div className="container-fluid">
        <a className="navbar-brand" href="#">아이디어츠 관리자 페이지</a>
        <Logout />
      </div>
    </nav>
  );
}