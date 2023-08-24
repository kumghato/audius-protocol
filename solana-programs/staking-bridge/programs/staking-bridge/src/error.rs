use anchor_lang::prelude::*;

#[error_code]
pub enum StakingBridgeErrorCode {
    #[msg("Not calling Raydium AMM program.")]
    NotCallingRaydiumAmmProgram,
    #[msg("Invalid serum DEX program.")]
    InvalidSerumDexProgram,
    #[msg("Not calling Wormhole Token Bridge program.")]
    NotCallingWormholeTokenBridgeProgram,
    #[msg("Invalid Wormhole Core Bridge program.")]
    InvalidWormholeCoreBridgeProgram,
}