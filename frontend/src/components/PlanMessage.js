// Renders a structured birthday plan with improved visual hierarchy.
import React from 'react';

function PlanMessage({ planData }) {
  // Handle cases where planData might be a string (JSON)
  let data = planData;
  if (typeof planData === 'string') {
    try {
      data = JSON.parse(planData);
    } catch (e) {
      console.error('Error parsing plan data:', e);
      return <div>Error displaying plan data</div>;
    }
  }

  return (
    <div style={{ 
      padding: '16px', 
      backgroundColor: '#e8f5e9', 
      margin: '8px 0', 
      borderRadius: '8px',
      border: '1px solid #c8e6c9',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        margin: '0 0 12px 0', 
        color: '#2e7d32',
        borderBottom: '1px solid #c8e6c9',
        paddingBottom: '8px'
      }}>
        {data.concept}
      </h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        <span style={{ 
          padding: '4px 10px', 
          backgroundColor: '#c8e6c9', 
          borderRadius: '16px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Theme: {data.theme}
        </span>
        
        <span style={{ 
          padding: '4px 10px', 
          backgroundColor: '#c8e6c9', 
          borderRadius: '16px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Budget: {data.budget}
        </span>
      </div>
      
      <p><strong>Venue:</strong> {data.venue}</p>
      
      <h4 style={{ marginBottom: '8px', marginTop: '16px' }}>Activity Schedule:</h4>
      <ul style={{ 
        listStyleType: 'none', 
        padding: '0',
        margin: '0 0 16px 0',
        borderLeft: '2px solid #a5d6a7',
        paddingLeft: '12px'
      }}>
        {data.activities && data.activities.map((act, idx) => (
          <li key={idx} style={{ 
            marginBottom: '8px',
            display: 'flex'
          }}>
            <span style={{ 
              minWidth: '60px', 
              fontWeight: 'bold',
              color: '#2e7d32'
            }}>{act.time}:</span>
            <span>{act.activity}</span>
          </li>
        ))}
      </ul>
      
      <p><strong>Catering:</strong> {data.catering}</p>
      <p><strong>Guest Experience:</strong> {data.guestExperience}</p>
    </div>
  );
}

export default PlanMessage;
