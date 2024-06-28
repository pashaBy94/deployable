import { toNano } from '@ton/core';
import { StopableContract } from '../wrappers/StopableContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const stopableContract = provider.open(await StopableContract.fromInit());

    await stopableContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(stopableContract.address);

    // run methods on `stopableContract`
}
