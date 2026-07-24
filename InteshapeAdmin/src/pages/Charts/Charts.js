import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Charts.css';

const lineData = [
  { month: 'Jan', sales: 400, revenue: 240 },
  { month: 'Feb', sales: 300, revenue: 139 },
  { month: 'Mar', sales: 600, revenue: 380 },
  { month: 'Apr', sales: 800, revenue: 430 },
  { month: 'May', sales: 500, revenue: 290 },
  { month: 'Jun', sales: 900, revenue: 540 },
  { month: 'Jul', sales: 750, revenue: 420 },
];

const barData = [
  { name: 'Mon', visitors: 120, pageviews: 340 },
  { name: 'Tue', visitors: 200, pageviews: 450 },
  { name: 'Wed', visitors: 180, pageviews: 400 },
  { name: 'Thu', visitors: 300, pageviews: 600 },
  { name: 'Fri', visitors: 250, pageviews: 520 },
  { name: 'Sat', visitors: 180, pageviews: 380 },
  { name: 'Sun', visitors: 100, pageviews: 280 },
];

const pieData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Email', value: 200 },
  { name: 'Other', value: 100 },
];

const areaData = [
  { month: 'Jan', users: 200 }, { month: 'Feb', users: 350 },
  { month: 'Mar', users: 280 }, { month: 'Apr', users: 500 },
  { month: 'May', users: 420 }, { month: 'Jun', users: 680 },
  { month: 'Jul', users: 750 },
];

const PIE_COLORS = ['#3498db', '#2ecc71', '#e67e22', '#e74c3c'];

const Charts = () => (
  <div className="charts-page">
    <div className="page-header">
      <h2>Charts</h2>
      <span className="breadcrumb">Home &rsaquo; Charts</span>
    </div>

    <div className="charts-grid">
      <div className="chart-card">
        <div className="chart-card-header">Line Chart — Sales vs Revenue</div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#3498db" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#2ecc71" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <div className="chart-card-header">Bar Chart — Weekly Visitors</div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitors" fill="#3498db" />
            <Bar dataKey="pageviews" fill="#e67e22" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <div className="chart-card-header">Pie Chart — Traffic Sources</div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <div className="chart-card-header">Area Chart — Monthly Users</div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="users" stroke="#9b59b6" fill="#d7bde2" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default Charts;
