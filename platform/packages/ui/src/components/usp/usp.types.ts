export type UspVariant = 'default' | 'ssm' | 'bingo' | 'slots';

export interface UspProps {
    text: string;
    variant?: UspVariant;
    textClassName?: string;
}
