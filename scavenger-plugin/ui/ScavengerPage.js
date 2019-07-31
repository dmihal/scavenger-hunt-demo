import React, { useState } from 'react';

const ScavengerPage = ({ accounts, plugin, history, burnerComponents, actions }) => {
  const [status, setStatus] = useState(null);

  if (!status) {
    if (accounts.length > 0) {
      plugin.getStatus(accounts[0]).then(status => setStatus(status));
    }
    return 'Loading';
  }

  const { Page } = burnerComponents;
  const scan = async e => {
    e.preventDefault();
    try {
      const result = await actions.scanQrCode();

      if (result.indexOf(location.origin) === 0) {
        history.push(result.substr(location.origin.length));
      }
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <Page title="Scavenger Hunt">
      <div>
        {status.stage === 0 && 'Find your first clue to start the scavenger hunt!'}
        {status.stage > 0 && status.stage < status.numClues
          && `You've found ${status.stage} out of ${status.numClues} clues!`}
        {status.stage === status.numClues && 'Congratulations! You found all the clues!'}
      </div>

      {status.stage !== status.numClues && (
        <div>Find clues and <a href="#" onClick={scan}>scan them</a> to unlock the next levels</div>
      )}
    </Page>
  );
};

export default ScavengerPage;
