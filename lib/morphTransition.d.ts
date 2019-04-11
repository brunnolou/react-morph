import { SpringListenerFn } from 'wobble';
import { MorphOptions } from './types';
declare type Options = {
    from: HTMLElement;
    to: HTMLElement;
    rectFrom: CSSStyleDeclaration;
    rectTo: CSSStyleDeclaration;
    fromValue?: number;
    initialVelocity?: number;
    onUpdate?: SpringListenerFn;
    onStart?: SpringListenerFn;
    onStop?: SpringListenerFn;
    willBack?: boolean;
    options: MorphOptions;
};
export default function morphTransition({ from, to, rectFrom, rectTo, fromValue, initialVelocity, onUpdate, onStart, onStop, willBack, options, }: Options): {
    cleanup: () => void;
    setProgress: (progress: number) => void;
};
export {};
