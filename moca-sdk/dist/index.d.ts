import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1, { ReactNode } from 'react';

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
    CustomButton?: React$1.ComponentType<{
        onClick?: () => void;
        disabled?: boolean;
        children?: React$1.ReactNode;
    }>;
};
declare function MocaLoginButton({ label, onLoginSuccess, CustomButton, }: MocaLoginButtonProps): react_jsx_runtime.JSX.Element | null;

type MocaUserPanelProps = {
    showUserInfo?: boolean;
    CustomButton?: React$1.ComponentType<{
        onClick?: () => void;
        disabled?: boolean;
        children?: React$1.ReactNode;
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

type PlatformCardProps = {
    name: string;
    icon?: React.ReactNode;
    connected?: boolean;
    onConnect?: () => void;
    className?: string;
    variant?: "default" | "outline";
};
declare function PlatformCard({ name, icon, connected, onConnect, className, variant, }: PlatformCardProps): react_jsx_runtime.JSX.Element;

type PlatformItem = {
    name: string;
    icon?: React.ReactNode;
    connected?: boolean;
    onConnect?: () => void;
    variant?: "default" | "outline";
};
type PlatformConnectListProps = {
    platforms: PlatformItem[];
    columns?: number | "auto";
    className?: string;
};
declare function PlatformConnectList({ platforms, columns, className, }: PlatformConnectListProps): react_jsx_runtime.JSX.Element;

type Platform = {
    id: string;
    name: string;
    icon?: string;
};
type PlatformSelectorProps = {
    platforms: Platform[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    className?: string;
};
declare function PlatformSelector({ platforms, selectedId, onSelect, className, }: PlatformSelectorProps): react_jsx_runtime.JSX.Element;

type PlatformStatus = {
    id: string;
    name: string;
    connected: boolean;
    icon?: string | React.ReactNode;
};
type PlatformConnectionStatusProps = {
    platforms: PlatformStatus[];
    /**
     * Optional render prop to override default UI
     * (connectedCount, total, platforms)
     */
    children?: (info: {
        connectedCount: number;
        total: number;
        platforms: PlatformStatus[];
    }) => React.ReactNode;
    className?: string;
};
declare function PlatformConnectionStatus({ platforms, children, className, }: PlatformConnectionStatusProps): react_jsx_runtime.JSX.Element;

type PlatformConnectButtonProps = {
    platformName: string;
    icon?: React.ReactNode;
    connected?: boolean;
    className?: string;
    onClick?: () => void;
};
declare function PlatformConnectButton({ platformName, icon, connected, className, onClick, }: PlatformConnectButtonProps): react_jsx_runtime.JSX.Element;

type Game = {
    id: string;
    name: string;
    icon?: string;
};
type GameSelectorProps = {
    games: Game[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    layout?: "grid" | "dropdown";
    className?: string;
};
declare function GameSelector({ games, selectedId, onSelect, layout, className, }: GameSelectorProps): react_jsx_runtime.JSX.Element;

type Rank = {
    id: string;
    name: string;
    icon?: string;
};
type RankSelectorProps = {
    ranks: Rank[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    layout?: "grid" | "dropdown";
    className?: string;
};
declare function RankSelector({ ranks, selectedId, onSelect, layout, className, }: RankSelectorProps): react_jsx_runtime.JSX.Element;

type CredentialPreviewProps = {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    data?: Record<string, any>;
    groups?: {
        label: string;
        data: Record<string, any>;
    }[];
    labelMap?: Record<string, string>;
    exclude?: string[];
    className?: string;
};
declare function CredentialPreview({ title, description, icon, data, groups, labelMap, exclude, className, }: CredentialPreviewProps): react_jsx_runtime.JSX.Element;

type IssueCredentialButtonProps = {
    label?: string;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
};
declare function IssueCredentialButton({ label, loading, disabled, className, onClick, }: IssueCredentialButtonProps): react_jsx_runtime.JSX.Element;

type UserIdentityBadgeProps = {
    className?: string;
    avatar?: string;
    username?: string;
    verified?: boolean;
    showBadge?: boolean;
    onClick?: () => void;
};
declare function UserIdentityBadge({ className, avatar, username, verified, showBadge, onClick, }: UserIdentityBadgeProps): react_jsx_runtime.JSX.Element;

type LogoutButtonProps = {
    className?: string;
    label?: string;
    onClick?: () => void;
};
declare function LogoutButton({ className, label, onClick, }: LogoutButtonProps): react_jsx_runtime.JSX.Element;

type MocaThemeProviderProps = {
    children: ReactNode;
    theme?: "dark" | "light" | "system";
    colors?: Partial<{
        accent: string;
        accentFg: string;
        accentHover: string;
        surface: string;
        surfaceMuted: string;
        border: string;
        muted: string;
        text: string;
    }>;
};
declare function MocaThemeProvider({ children, theme, colors, }: MocaThemeProviderProps): react_jsx_runtime.JSX.Element;

export { CredentialPreview, type CredentialPreviewProps, type Game, GameSelector, IssueCredentialButton, type IssuedCredential, LogoutButton, MocaConnectWidget, type MocaConnectWidgetForm, type MocaConnectWidgetProps, MocaGamingPassport, MocaLoginButton, type MocaLoginButtonProps, MocaThemeProvider, type MocaThemeProviderProps, MocaTournamentVerifier, type MocaUser, MocaUserPanel, type MocaUserPanelProps, MocaVerificationDashboard, type Platform, PlatformCard, type PlatformCardProps, PlatformConnectButton, PlatformConnectList, PlatformConnectionStatus, type PlatformItem, PlatformSelector, type PlatformStatus, type Rank, RankSelector, UserIdentityBadge, type VerificationRecord, useMocaIdentity };
