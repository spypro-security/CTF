import { useState } from 'react';

function Competitions() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const competitions = {
    upcoming: [
      {
        id: 1,
        title: 'Summer Coding Challenge 2025',
        date: 'January 15, 2025',
        participants: 245,
        prize: '$5,000',
        category: 'Web Development'
      },
      {
        id: 2,
        title: 'AI Innovation Hackathon',
        date: 'January 22, 2025',
        participants: 189,
        prize: '$10,000',
        category: 'Machine Learning'
      },
      {
        id: 3,
        title: 'Mobile App Design Contest',
        date: 'February 5, 2025',
        participants: 312,
        prize: '$3,000',
        category: 'UI/UX Design'
      }
    ],
    ongoing: [
      {
        id: 4,
        title: 'Data Science Sprint',
        date: 'Ends January 10, 2025',
        participants: 421,
        prize: '$7,500',
        category: 'Data Science'
      },
      {
        id: 5,
        title: 'Blockchain Developer Challenge',
        date: 'Ends January 12, 2025',
        participants: 167,
        prize: '$8,000',
        category: 'Blockchain'
      }
    ],
    past: [
      {
        id: 6,
        title: 'Winter Code Jam 2024',
        date: 'Completed December 20, 2024',
        participants: 534,
        prize: '$6,000',
        category: 'Full Stack',
        winner: 'Team Alpha'
      },
      {
        id: 7,
        title: 'Cybersecurity Challenge',
        date: 'Completed December 15, 2024',
        participants: 298,
        prize: '$4,500',
        category: 'Security',
        winner: 'CodeGuardians'
      }
    ]
  };

  return (
    <div className="competitions-container">
      <style>{`
        .competitions-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .header h1 {
          font-size: 42px;
          color: #1a1a1a;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .header p {
          font-size: 18px;
          color: #666;
        }

        .tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 40px;
          border-bottom: 2px solid #e0e0e0;
        }

        .tab-button {
          padding: 12px 30px;
          background: none;
          border: none;
          font-size: 16px;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease;
        }

        .tab-button:hover {
          color: #333;
        }

        .tab-button.active {
          color: #2563eb;
        }

        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #2563eb;
        }

        .competitions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }

        .competition-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .competition-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          margin-bottom: 15px;
        }

        .category-badge {
          display: inline-block;
          padding: 5px 12px;
          background: #eff6ff;
          color: #2563eb;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .competition-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .competition-date {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .card-details {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .detail-item {
          text-align: center;
        }

        .detail-label {
          font-size: 12px;
          color: #999;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .detail-value {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .prize-value {
          color: #10b981;
        }

        .winner-info {
          margin-top: 15px;
          padding: 10px;
          background: #f0fdf4;
          border-radius: 8px;
          text-align: center;
        }

        .winner-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 5px;
        }

        .winner-name {
          font-size: 16px;
          font-weight: 700;
          color: #10b981;
        }

        .action-button {
          width: 100%;
          padding: 12px;
          margin-top: 20px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .action-button:hover {
          background: #1d4ed8;
        }

        .action-button.secondary {
          background: #6b7280;
        }

        .action-button.secondary:hover {
          background: #4b5563;
        }

        @media (max-width: 768px) {
          .competitions-grid {
            grid-template-columns: 1fr;
          }

          .header h1 {
            font-size: 32px;
          }

          .tabs {
            flex-direction: column;
            align-items: center;
          }

          .tab-button {
            width: 200px;
          }
        }
      `}</style>

      <div className="header">
        <h1>Competitions</h1>
        <p>Join exciting challenges and showcase your skills</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`tab-button ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing
        </button>
        <button
          className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>

      <div className="competitions-grid">
        {competitions[activeTab].map((competition) => (
          <div key={competition.id} className="competition-card">
            <div className="card-header">
              <span className="category-badge">{competition.category}</span>
              <h3 className="competition-title">{competition.title}</h3>
              <p className="competition-date">{competition.date}</p>
            </div>

            <div className="card-details">
              <div className="detail-item">
                <div className="detail-label">Participants</div>
                <div className="detail-value">{competition.participants}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Prize</div>
                <div className="detail-value prize-value">{competition.prize}</div>
              </div>
            </div>

            {competition.winner && (
              <div className="winner-info">
                <div className="winner-label">Winner</div>
                <div className="winner-name">{competition.winner}</div>
              </div>
            )}

            <button className={`action-button ${activeTab === 'past' ? 'secondary' : ''}`}>
              {activeTab === 'upcoming' ? 'Register Now' : activeTab === 'ongoing' ? 'Join Now' : 'View Results'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Competitions;