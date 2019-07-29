import React, { useState } from 'react';

const DiscoverPage = ({ match, actions, accounts, plugin, burnerComponents }) => {
  const { Page } = burnerComponents;
  const [status, setStatus] = useState('started');

  const makePage = content => <Page title="Discovering Clue...">{content}</Page>;

  if (status === 'started') {
    if (accounts.length > 0) {
      setStatus('loading');
      plugin.discoverClue(accounts[0], match.params.pk)
        .then(() => setStatus('success'))
        .catch(e => {
          console.error(e);
          setStatus('error');
        });
    }
    return makePage(null);
  }

  if (status === 'loading') {
    return makePage('Discovering...');
  }
  if (status === 'success') {
    const content = (
      <div>
        <h3>You discovered a clue!</h3>
        <button onClick={() => actions.navigateTo('/scavenger')}>Continue</button>
      </div>
    );
    return makePage(content);
  }
  if (status === 'error') {
    const content = (
      <div>
        <h3>There was an error with your clue...</h3>
        <button onClick={() => actions.navigateTo('/scavenger')}>Back</button>
      </div>
    );
    return makePage(content);
  }
};

export default DiscoverPage;
