import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type MocaUser = {
    handle: string;
    walletAddress: string;
    token: string;
};
declare function useMocaIdentity(): {
    airService: any;
    user: MocaUser | null;
    loading: boolean;
    initialized: boolean;
    error: string | null;
    login: () => Promise<MocaUser>;
    logout: () => void;
};

type MocaLoginButtonProps = {
    label?: string;
    onLoginSuccess?: (user: any) => void;
    CustomButton?: React.ComponentType<{
        onClick?: () => void;
        disabled?: boolean;
        children?: React.ReactNode;
    }>;
};
declare function MocaLoginButton({ label, onLoginSuccess, CustomButton, }: MocaLoginButtonProps): react_jsx_runtime.JSX.Element | null;

type MocaUserPanelProps = {
    showUserInfo?: boolean;
    CustomButton?: React.ComponentType<{
        onClick?: () => void;
        disabled?: boolean;
        children?: React.ReactNode;
    }>;
};
declare function MocaUserPanel({ showUserInfo, CustomButton, }: MocaUserPanelProps): react_jsx_runtime.JSX.Element | null;

declare const GAME_RANKS: {
    readonly valo: readonly ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant"];
    readonly cs2: readonly ["Silver", "Gold Nova", "Master Guardian", "Legendary Eagle", "Supreme", "Global Elite"];
};
type GameKey = keyof typeof GAME_RANKS;
interface MocaConnectWidgetForm {
    game: GameKey | "";
    rank: string;
    name: string;
    age: string | number;
    country: string;
}
interface MocaConnectWidgetProps {
    defaultCountry?: string;
    connected?: string[];
    onConnect?: (platformId: string) => Promise<void> | void;
    onIssue?: (data: {
        connected: string[];
    } & MocaConnectWidgetForm) => Promise<void> | void;
}
declare function MocaConnectWidget({ defaultCountry, onConnect, onIssue, connected: initialConnected, }: MocaConnectWidgetProps): react_jsx_runtime.JSX.Element;

interface IssuedCredential {
    connected: string[];
    game: string;
    rank: string;
    name: string;
    age: string | number;
    country: string;
    xp?: string;
}
interface MocaGamingPassportProps {
    issuedCredential?: IssuedCredential;
}
declare function MocaGamingPassport({ issuedCredential, }: MocaGamingPassportProps): react_jsx_runtime.JSX.Element;

declare function MocaTournamentVerifier(): react_jsx_runtime.JSX.Element;

interface VerificationRecord {
    connected: string[];
    game: string;
    rank: string;
    name: string;
    age: number | string;
    country: string;
    xp: string;
    verified?: boolean;
}
interface MocaVerificationDashboardProps {
    records?: VerificationRecord[];
    onVerify?: (record: VerificationRecord) => Promise<void> | void;
    onRevoke?: (record: VerificationRecord) => Promise<void> | void;
}
declare function MocaVerificationDashboard({ records, onVerify, onRevoke, }: MocaVerificationDashboardProps): react_jsx_runtime.JSX.Element;

export { type IssuedCredential, MocaConnectWidget, type MocaConnectWidgetForm, type MocaConnectWidgetProps, MocaGamingPassport, MocaLoginButton, type MocaLoginButtonProps, MocaTournamentVerifier, type MocaUser, MocaUserPanel, type MocaUserPanelProps, MocaVerificationDashboard, type VerificationRecord, useMocaIdentity };
