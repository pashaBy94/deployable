import { toNano } from '@ton/core';
import { OwnerCounter } from '../wrappers/OwnerCounter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ownerCounter = provider.open(await OwnerCounter.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await ownerCounter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(ownerCounter.address);

    console.log('ID', await ownerCounter.getId());
}
