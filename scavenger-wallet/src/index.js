import React from 'react';
import ReactDOM from 'react-dom';
import BurnerCore from '@burner-wallet/core';
import { NativeAsset } from '@burner-wallet/assets';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway } from '@burner-wallet/core/gateways';
import BurnerUI from '@burner-wallet/ui';
import ScavengerPlugin from '../../scavenger-plugin/ScavengerPlugin';


const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
  ],
});

const BurnerWallet = () =>
  <BurnerUI
    core={core}
    assets={[new NativeAsset({ id: 'keth', name: 'Kovan ETH', network: '42' })]}
    plugins={[new ScavengerPlugin('42', '0xC5904deefcCeBA55F678728D3f595A4971978649')]}
  />

ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
