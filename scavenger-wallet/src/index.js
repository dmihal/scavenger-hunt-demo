import React from 'react';
import ReactDOM from 'react-dom';
import BurnerCore from '@burner-wallet/core';
import { xdai, dai, eth, NativeAsset } from '@burner-wallet/assets';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway, HTTPGateway } from '@burner-wallet/core/gateways';
import Exchange from '@burner-wallet/exchange';
import { xdaiBridge, uniswapDai } from '@burner-wallet/exchange/pairs';
import BurnerUI from '@burner-wallet/ui';
import ScavengerPlugin from '../../scavenger-plugin/ScavengerPlugin';


const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new HTTPGateway('http://localhost:8545', '5777'),
    // new InjectedGateway(),
    // new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    // new XDaiGateway(),
  ],
});

const BurnerWallet = () =>
  <BurnerUI
    core={core}
    assets={[/*xdai, dai, eth,*/ new NativeAsset({ id: 'teth', name: 'Test Eth', network: '5777' })]}
    plugins={[new ScavengerPlugin('5777', '0x597370a072AAb1d7cb053aE13bB31bc2E70F6ce1')]}
  />



ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
