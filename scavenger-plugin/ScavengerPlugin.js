import DiscoverPage from './ui/DiscoverPage';
import ScavengerPage from './ui/ScavengerPage';
import ScavengerStatus from './ui/ScavengerStatus';
import abi from './abi/ScavengerHunt.json';

export default class ScavengerPlugin {
  constructor(network, gameAddress) {
    this._network = network;
    this._gameAddress = gameAddress;
  }

  initializePlugin(pluginContext) {
    this.pluginContext = pluginContext;

    pluginContext.addPage('/scavenger/discover/:pk', DiscoverPage);
    pluginContext.addPage('/scavenger', ScavengerPage);
    pluginContext.addElement('home-middle', ScavengerStatus);
  }

  getContract() {
    if (this.existingContract) {
      return this.existingContract;
    }
    const web3 = this.pluginContext.getWeb3(this._network);
    this.existingContract = new web3.eth.Contract(abi, this._gameAddress);
    return this.existingContract;
  }

  async discoverClue(account, pk) {
    const web3 = this.pluginContext.getWeb3(this._network);
    const { signature } = web3.eth.accounts.sign(web3.utils.keccak256(account), pk);
    const { receipt } = await this.getContract().methods.findClue(signature).send({ from: account });
    console.log(receipt);
  }

  async getStatus(account) {
    const contract = this.getContract();
    const [stage, numClues, didWin] = await Promise.all([
      contract.methods.stage(account).call(),
      contract.methods.numClues().call(),
      contract.methods.didWin(account).call(),
    ]);
    return { stage: stage.toNumber(), numClues: numClues.toNumber(), didWin };
  }
}
