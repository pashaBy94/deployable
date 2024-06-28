import { toNano } from '@ton/core';
import { DeployableContract } from '../wrappers/DeployableContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const deployableContract = provider.open(await DeployableContract.fromInit());

    await deployableContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(deployableContract.address);

    // run methods on `deployableContract`
}
