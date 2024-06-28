import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { OwnerCounter } from '../wrappers/OwnerCounter';
import '@ton/test-utils';

describe('OwnerCounter', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ownerCounter: SandboxContract<OwnerCounter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ownerCounter = blockchain.openContract(await OwnerCounter.fromInit(0n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ownerCounter.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: ownerCounter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ownerCounter are ready to use
    });

    it('should address', async () => {
        console.log('own', await ownerCounter.getAddressOwner());
        const res = await ownerCounter.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'ChangeOwner',
                newOwner: deployer.address,
            },
        );

        console.log(res, res.events, res.result);
    });

    // it('should increase counter', async () => {
    //     const increaseTimes = 3;
    //     for (let i = 0; i < increaseTimes; i++) {
    //         console.log(`increase ${i + 1}/${increaseTimes}`);

    //         const increaser = await blockchain.treasury('increaser' + i);

    //         const counterBefore = await ownerCounter.getCounter();

    //         console.log('counter before increasing', counterBefore);

    //         const increaseBy = BigInt(Math.floor(Math.random() * 100));

    //         console.log('increasing by', increaseBy);

    //         const increaseResult = await ownerCounter.send(
    //             increaser.getSender(),
    //             {
    //                 value: toNano('0.05'),
    //             },
    //             {
    //                 $$type: 'Add',
    //                 queryId: 0n,
    //                 amount: increaseBy,
    //             }
    //         );

    //         expect(increaseResult.transactions).toHaveTransaction({
    //             from: increaser.address,
    //             to: ownerCounter.address,
    //             success: true,
    //         });

    //         const counterAfter = await ownerCounter.getCounter();

    //         console.log('counter after increasing', counterAfter);

    //         expect(counterAfter).toBe(counterBefore + increaseBy);
    //     }
    // });
});
