import React from 'react';
import {
  MdHome, MdPerson, MdSettings, MdSearch, MdFavorite, MdStar,
  MdShare, MdDelete, MdEdit, MdAdd, MdRemove, MdCheck, MdClose,
  MdArrowForward, MdArrowBack, MdArrowUpward, MdArrowDownward,
  MdNotifications, MdEmail, MdPhone, MdLocationOn, MdWork,
  MdShoppingCart, MdPayment, MdLock, MdVisibility, MdDownload,
  MdUpload, MdRefresh, MdMenu, MdDashboard, MdBarChart, MdPieChart,
  MdTableChart, MdCalendarToday, MdCloud, MdFolder, MdInsertDriveFile,
  MdImage, MdVideoLibrary, MdMusicNote, MdCamera, MdMic, MdWifi,
  MdBluetooth, MdBattery80, MdPrint, MdSave
} from 'react-icons/md';
import './Icons.css';

const iconList = [
  { icon: <MdHome />, name: 'Home' }, { icon: <MdPerson />, name: 'Person' },
  { icon: <MdSettings />, name: 'Settings' }, { icon: <MdSearch />, name: 'Search' },
  { icon: <MdFavorite />, name: 'Favorite' }, { icon: <MdStar />, name: 'Star' },
  { icon: <MdShare />, name: 'Share' }, { icon: <MdDelete />, name: 'Delete' },
  { icon: <MdEdit />, name: 'Edit' }, { icon: <MdAdd />, name: 'Add' },
  { icon: <MdRemove />, name: 'Remove' }, { icon: <MdCheck />, name: 'Check' },
  { icon: <MdClose />, name: 'Close' }, { icon: <MdArrowForward />, name: 'Forward' },
  { icon: <MdArrowBack />, name: 'Back' }, { icon: <MdArrowUpward />, name: 'Up' },
  { icon: <MdArrowDownward />, name: 'Down' }, { icon: <MdNotifications />, name: 'Bell' },
  { icon: <MdEmail />, name: 'Email' }, { icon: <MdPhone />, name: 'Phone' },
  { icon: <MdLocationOn />, name: 'Location' }, { icon: <MdWork />, name: 'Work' },
  { icon: <MdShoppingCart />, name: 'Cart' }, { icon: <MdPayment />, name: 'Payment' },
  { icon: <MdLock />, name: 'Lock' }, { icon: <MdVisibility />, name: 'Visibility' },
  { icon: <MdDownload />, name: 'Download' }, { icon: <MdUpload />, name: 'Upload' },
  { icon: <MdRefresh />, name: 'Refresh' }, { icon: <MdMenu />, name: 'Menu' },
  { icon: <MdDashboard />, name: 'Dashboard' }, { icon: <MdBarChart />, name: 'BarChart' },
  { icon: <MdPieChart />, name: 'PieChart' }, { icon: <MdTableChart />, name: 'Table' },
  { icon: <MdCalendarToday />, name: 'Calendar' }, { icon: <MdCloud />, name: 'Cloud' },
  { icon: <MdFolder />, name: 'Folder' }, { icon: <MdInsertDriveFile />, name: 'File' },
  { icon: <MdImage />, name: 'Image' }, { icon: <MdVideoLibrary />, name: 'Video' },
  { icon: <MdMusicNote />, name: 'Music' }, { icon: <MdCamera />, name: 'Camera' },
  { icon: <MdMic />, name: 'Mic' }, { icon: <MdWifi />, name: 'Wifi' },
  { icon: <MdBluetooth />, name: 'Bluetooth' }, { icon: <MdBattery80 />, name: 'Battery' },
  { icon: <MdPrint />, name: 'Print' }, { icon: <MdSave />, name: 'Save' },
];

const Icons = () => (
  <div className="icons-page">
    <div className="page-header">
      <h2>Icons</h2>
      <span className="breadcrumb">Home &rsaquo; Icons</span>
    </div>
    <div className="icons-card">
      <div className="icons-card-header">Material Design Icons</div>
      <div className="icons-grid">
        {iconList.map(({ icon, name }) => (
          <div key={name} className="icon-item">
            <span className="icon-display">{icon}</span>
            <span className="icon-name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Icons;
