import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { DeployableContract } from '../wrappers/DeployableContract';
import '@ton/test-utils';

describe('DeployableContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let deployableContract: SandboxContract<DeployableContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployableContract = blockchain.openContract(await DeployableContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await deployableContract.send(
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
            to: deployableContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and deployableContract are ready to use
    });
});
