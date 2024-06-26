import { JsonRpcProvider } from '@ethersproject/providers';
import { useMemo } from 'react';
import { useEthers } from "@usedapp/core"
import { Game__factory, Token__factory } from '../typechain';


export const useContracts = () => {
    const { library } = useEthers();
    
    const GameContract = useMemo(() => {
        if (library) {
            return Game__factory.connect(process.env.REACT_APP_GAME_CONTRACT!, (library as JsonRpcProvider)?.getSigner());
        }
    }, [library]);

    const TokenContract = (address: string) => {
        return Token__factory.connect(address, (library as JsonRpcProvider)?.getSigner());
    }

    return {
        GameContract,
        TokenContract
    }
}