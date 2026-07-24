import React from 'react';
import './Buttons.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
const variants = [
  { label: 'Primary', cls: 'btn-primary' },
  { label: 'Success', cls: 'btn-success' },
  { label: 'Warning', cls: 'btn-warning' },
  { label: 'Danger', cls: 'btn-danger' },
  { label: 'Info', cls: 'btn-info' },
  { label: 'Dark', cls: 'btn-dark' },
  { label: 'Light', cls: 'btn-light' },
];

const outlineVariants = [
  { label: 'Primary', cls: 'btn-outline-primary' },
  { label: 'Success', cls: 'btn-outline-success' },
  { label: 'Warning', cls: 'btn-outline-warning' },
  { label: 'Danger', cls: 'btn-outline-danger' },
  { label: 'Info', cls: 'btn-outline-info' },
  { label: 'Dark', cls: 'btn-outline-dark' },
];

const Buttons = () => (
  <div className="buttons-page">
    <div className="page-header">
      <h2>Buttons</h2>
      <span className="breadcrumb">Home &rsaquo; Buttons</span>
    </div>

    <div className="btn-section-grid">
      <div className="btn-card">
        <div className="btn-card-header">Solid Buttons</div>
        <div className="btn-card-body">
          <div className="btn-row">
            {variants.map(v => <button key={v.label} className={`btn ${v.cls}`}>{v.label}</button>)}
          </div>
        </div>
      </div>

      <div className="btn-card">
        <div className="btn-card-header">Outline Buttons</div>
        <div className="btn-card-body">
          <div className="btn-row">
            {outlineVariants.map(v => <button key={v.label} className={`btn ${v.cls}`}>{v.label}</button>)}
          </div>
        </div>
      </div>

      <div className="btn-card">
        <div className="btn-card-header">Button Sizes</div>
        <div className="btn-card-body">
          <div className="btn-row" style={{ alignItems: 'center' }}>
            {sizes.map(s => <button key={s} className={`btn btn-primary btn-${s}`}>{s.toUpperCase()}</button>)}
          </div>
        </div>
      </div>

      <div className="btn-card">
        <div className="btn-card-header">Rounded Buttons</div>
        <div className="btn-card-body">
          <div className="btn-row">
            {variants.slice(0,5).map(v => <button key={v.label} className={`btn ${v.cls} btn-rounded`}>{v.label}</button>)}
          </div>
        </div>
      </div>

      <div className="btn-card">
        <div className="btn-card-header">Icon Buttons</div>
        <div className="btn-card-body">
          <div className="btn-row">
            <button className="btn btn-primary">⬇ Download</button>
            <button className="btn btn-success">✓ Confirm</button>
            <button className="btn btn-danger">🗑 Delete</button>
            <button className="btn btn-info">✎ Edit</button>
            <button className="btn btn-warning">⚙ Settings</button>
          </div>
        </div>
      </div>

      <div className="btn-card">
        <div className="btn-card-header">States</div>
        <div className="btn-card-body">
          <div className="btn-row">
            <button className="btn btn-primary">Normal</button>
            <button className="btn btn-primary" disabled>Disabled</button>
            <button className="btn btn-primary btn-loading">Loading...</button>
            <button className="btn btn-success btn-block">Block Button</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Buttons;
