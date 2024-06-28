import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/owner_counter.tact',
    options: {
        debug: true,
    },
};
