import React from 'react';
import './Banners.css';

const BannerView = ({ banner, onEdit, onDelete, onClose }) => {
  if (!banner) return null;

  return (
    <div className="bn-detail-card">
      <div className="bn-detail-header">
        <h2 className="bn-detail-title">Banner Details:</h2>
        <div className="bn-detail-actions">
          <button className="bn-detail-btn bn-detail-btn--del" title="Delete" onClick={() => onDelete(banner.id)}>
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" fill='#9aa3b5'></path></svg>
          </button>
          <button className="bn-detail-btn bn-detail-btn--edit" title="Edit" onClick={() => onEdit(banner)}>
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="edit" role="presentation" class="fill-current"><path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z" fill='#fff'></path></svg>
          </button>
          <button className="bn-detail-btn bn-detail-btn--close" title="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bn-detail-body">
        <div className="bn-detail-row">
          <span className="bn-detail-label">ID</span>
          <span className="bn-detail-value">{banner.id}</span>
        </div>

        <div className="bn-detail-row">
          <span className="bn-detail-label">Title</span>
          <span className="bn-detail-value">{banner.title || <span className="bn-dash">—</span>}</span>
        </div>

        <div className="bn-detail-row">
          <span className="bn-detail-label">Short Description</span>
          <span className="bn-detail-value">{banner.desc || <span className="bn-dash">—</span>}</span>
        </div>

        <div className="bn-detail-row">
          <span className="bn-detail-label">Banner Image</span>
          <span className="bn-detail-value">
            {banner.image ? (
              <div className="bn-detail-img-wrap">
                <img src={banner.image} alt={banner.title || 'banner'} className="bn-detail-img" />
                <a
                  href={banner.image}
                  download={`banner-${banner.id}.jpg`}
                  className="bn-detail-download"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>
              </div>
            ) : <span className="bn-dash">—</span>}
          </span>
        </div>

        <div className="bn-detail-row">
          <span className="bn-detail-label">Status</span>
          <span className="bn-detail-value">
            <span className={`bn-status-dot ${banner.active ? 'bn-status-dot--on' : 'bn-status-dot--off'}`} />
          </span>
        </div>

        <div className="bn-detail-row">
          <span className="bn-detail-label">Show Button in Banner</span>
          <span className="bn-detail-value">
            <span className={`bn-status-dot ${banner.showButton ? 'bn-status-dot--on' : 'bn-status-dot--off'}`} />
          </span>
        </div>

        <div className="bn-detail-row">
          <span className="bn-detail-label">Button Text</span>
          <span className="bn-detail-value">{banner.cta || <span className="bn-dash">—</span>}</span>
        </div>

        <div className="bn-detail-row">
          <span className="bn-detail-label">Button Link</span>
          <span className="bn-detail-value">{banner.buttonLink || <span className="bn-dash">—</span>}</span>
        </div>
      </div>
    </div>
  );
};

export default BannerView;
