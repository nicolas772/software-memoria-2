import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
  FaHome,
  FaSignOutAlt,
  FaBell,
} from 'react-icons/fa';
import AuthService from '../services/auth.service';
import sidebarBg from '../assets/bg1.jpg';
import '../css/styles.scss'

const Sidebar = ({ collapsed, toggled, handleToggleSidebar, handleCollapsedChange, user }) => {
  const [showTesterBoard, setShowTesterBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  let navigate = useNavigate()
  let username = user.username

  const logOut = () => {
    AuthService.logout();
    navigate("/login")
  };

  useEffect(() => {
    setShowUserBoard(user.roles.includes("ROLE_USER"));
    setShowTesterBoard(user.roles.includes("ROLE_TESTER"));
  }, []);

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
      >
        {/* Header */}
        <SidebarHeader>
          <Menu iconShape="circle">
            {collapsed ? (
              <MenuItem
                icon={<FaAngleDoubleRight />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <MenuItem
                suffix={<FaAngleDoubleLeft />}
                onClick={handleCollapsedChange}
              >
                <div
                  style={{
                    padding: '9px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 15,
                    letterSpacing: '1px'
                  }}
                >
                  Feel UX
                </div>
              </MenuItem>
            )}
          </Menu>
        </SidebarHeader>
        {/* Content */}
        <SidebarContent>
          {showTesterBoard && (
            <Menu iconShape="circle">
              <MenuItem icon={<FaHome />}>
                Home <Link to="/homeTester" />
              </MenuItem>
              <MenuItem
                icon={<FaTachometerAlt />}
              >
                Dashboard
                <NavLink to="/boardTester" />
              </MenuItem>
              {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
              <MenuItem icon={<FaList />}>
                Mis Estudios <Link to="/studies" />
              </MenuItem>
              <MenuItem icon={<FaSignOutAlt />} onClick={logOut}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          )}
          {showUserBoard && (
            <Menu iconShape="circle">
              <MenuItem icon={<FaHome />}>
                Home User <Link to="/homeUser" />
              </MenuItem>
              <SubMenu
                title={'Estudios'}
                icon={<FaList />}
              >
                <MenuItem>Activos</MenuItem>
                <MenuItem>Finalizados</MenuItem>
              </SubMenu>
              <MenuItem
                icon={<FaBell />}
                prefix={<span className="badge yellow">3</span>}
              >
                Invitaciones
                <NavLink to="/boardUser" />
              </MenuItem>
              <MenuItem icon={<FaSignOutAlt />} onClick={logOut}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          )}
        </SidebarContent>
        {/* Footer */}
        <SidebarFooter style={{ textAlign: 'center' }}>
          <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
            <Link
              className="sidebar-btn"
              style={{ cursor: 'pointer' }}
              to="/profile"
            >
              <FaUser />
              <span>@{username}</span>
            </Link>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
