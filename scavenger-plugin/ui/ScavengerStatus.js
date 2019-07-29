import React, { useState } from 'react';

const ScavengerStatus = ({ accounts, plugin, actions, burnerComponents }) => {
  const [status, setStatus] = useState(null);

  if (!status) {
    if (accounts.length > 0) {
      plugin.getStatus(accounts[0]).then(status => setStatus(status));
    }
    return 'Loading';
  }

  const { AccountBalance } = burnerComponents;

  return (
    <div
      style={{ padding: '4px', margin: '4px 0', border: 'solid 1px #999' }}
      onClick={() => actions.navigateTo('/scavenger')}
    >
      {status.stage === 0 && 'Find your first clue to start the scavenger hunt!'}
      {status.stage > 0 && status.stage < status.numClues
        && `You've found ${status.stage} out of ${status.numClues} clues!`}
      {status.stage === status.numClues && 'Congratulations! You found all the clues!'}
    </div>
  );
};

export default ScavengerStatus;
