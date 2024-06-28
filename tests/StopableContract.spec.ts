import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { StopableContract } from '../wrappers/StopableContract';
import '@ton/test-utils';

describe('StopableContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let stopableContract: SandboxContract<StopableContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        stopableContract = blockchain.openContract(await StopableContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await stopableContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: stopableContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and stopableContract are ready to use
    });
});
