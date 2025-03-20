// Renders a structured birthday plan.
import React from 'react';

function PlanMessage({ planData }) {
  // planData is expected to be an object with details of the plan
  return (
    <div style={{ padding: '10px', backgroundColor: '#e8f5e9', margin: '4px 0', borderRadius: '4px' }}>
      <h3>{planData.concept}</h3>
      <p><strong>Theme:</strong> {planData.theme}</p>
      <p><strong>Venue:</strong> {planData.venue}</p>
      <h4>Activity Schedule:</h4>
      <ul>
        {planData.activities && planData.activities.map((act, idx) => (
          <li key={idx}>{act.time}: {act.activity}</li>
        ))}
      </ul>
      <p><strong>Catering:</strong> {planData.catering}</p>
      <p><strong>Guest Experience:</strong> {planData.guestExperience}</p>
      <p><strong>Budget:</strong> {planData.budget}</p>
    </div>
  );
}

export default PlanMessage;
