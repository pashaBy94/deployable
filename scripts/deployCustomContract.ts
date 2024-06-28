import { toNano } from '@ton/core';
import { CustomContract } from '../wrappers/CustomContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const customContract = provider.open(await CustomContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await customContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(customContract.address);

    console.log('ID', await customContract.getId());
}
